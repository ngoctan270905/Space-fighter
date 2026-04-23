import {
  NodeComp,
  SceneComponent,
  Size,
  SpriteRender,
  Vec2,
  TouchEventRegister,
  LabelComp,
  BoxCollider,
  Collider,
} from '@safe-engine/webgl'
import { BackButton } from '../components/BackButton'
import {
  sf_back_ground_game,
  sf_chien_co_1,
  sf_health,
  sf_icon_speed,
  sf_quai_1,
  sf_streak, // Hình ảnh vệt sáng dùng làm đạn
  sf_game_over,
  sf_crash,
} from '../assets'

import { BulletItem, FallingQuaiItem, CrashItem } from './fighter/fighter.types'
import {
  fighterConfig,
  bulletConfig,
  bulletPoolSizePerLane,
  quaiConfig,
  speedIconConfig,
  livesDisplayConfig,
  scoreDisplayConfig,
} from './fighter/fighter.config'
import { randomBetween, formatScore, getFireInterval } from './fighter/fighter.helpers'


export class FighterScene extends SceneComponent {
  // ===== Refs: Tham chiếu đến các đối tượng trong game =====
  fighterNode!: NodeComp // Node của máy bay người chơi
  speedIcon!: SpriteRender // Item tăng tốc độ bắn
  quaiRefs: SpriteRender[] = [] // Danh sách quái vật
  heartRefs: SpriteRender[] = [] // Danh sách icon máu
  crashRefs: SpriteRender[] = [] // Danh sách hiệu ứng nổ
  gameOverSprite!: SpriteRender // Ảnh thông báo kết thúc game
  scoreLabel!: LabelComp // Label hiển thị điểm số

  // ===== Bullet refs: Tham chiếu đến danh sách Sprite của đạn =====
  leftBulletRefs: SpriteRender[] = [] // Tham chiếu các Sprite đạn nòng trái
  rightBulletRefs: SpriteRender[] = [] // Tham chiếu các Sprite đạn nòng phải

  // ===== Components =====
  touchRegister?: TouchEventRegister // Xử lý sự kiện chạm/di chuyển

  // ===== Config aliases: Bí danh cấu hình để sử dụng nhanh =====
  private readonly fighterConfig = fighterConfig
  private readonly bulletConfig = bulletConfig
  private readonly quaiConfig = quaiConfig
  private readonly speedIconConfig = speedIconConfig
  private readonly livesDisplayConfig = livesDisplayConfig
  private readonly scoreDisplayConfig = scoreDisplayConfig

  // ===== Runtime state: Trạng thái trò chơi đang chạy =====
  bulletPool: BulletItem[] = [] // Kho chứa đạn để tái sử dụng
  quaiPool: FallingQuaiItem[] = [] // Kho chứa quái vật để tái sử dụng
  crashPool: CrashItem[] = [] // Kho chứa hiệu ứng nổ để tái sử dụng

  maxLives = 5 // Số mạng tối đa
  currentLives = 5 // Số mạng hiện tại

  fireCooldown = 0 // Thời gian chờ giữa các lần bắn
  shotsPerSecond = 1 // Tốc độ bắn cơ bản
  currentShotsPerSecond = 1 // Tốc độ bắn hiện tại (sau khi đã buff)

  speedIconActive = false // Item tăng tốc có đang xuất hiện không
  speedIconCooldown = 0 // Thời gian chờ spawn item tiếp theo
  quaiSpawnCooldown = 0 // Thời gian chờ spawn quái tiếp theo

  score = 0 // Điểm số

  bulletPoolInitialized = false // Đã khởi tạo kho đạn chưa
  initFrameDelay = 3 // Delay khởi tạo để tránh lỗi mount

  isGameOver = false // Trạng thái kết thúc game


  /**
   * Khởi tạo ban đầu khi Scene bắt đầu
   */
  start() {
    if (!this.fighterNode) {
      console.error('fighterNode not ready')
      return
    }

    this.initTouch() // Khởi tạo điều khiển cảm ứng

    this.speedIcon.node.active = false
    this.scheduleSpeedIconSpawn() // Đặt lịch spawn item
    this.scheduleQuaiSpawn() // Đặt lịch spawn quái

    this.fireCooldown = 0
    this.currentShotsPerSecond = this.shotsPerSecond
    this.currentLives = this.maxLives
    this.isGameOver = false
    this.gameOverSprite.node.active = false
    this.refreshLivesDisplay() // Cập nhật hiển thị số mạng

    // Đợi 1 frame để đảm bảo các SpriteRender đã được mount vào DOM/Engine
    setTimeout(() => {
      this.initBulletPool()
      this.initQuaiPool()
      this.initCrashPool()
      this.bulletPoolInitialized = true
    }, 0)
  }

  addScore(amount: number) {
    this.score += amount
    // Cập nhật trực tiếp nội dung chữ hiển thị trên màn hình
    if (this.scoreLabel) {
      this.scoreLabel.string = formatScore(this.score)
    }
  }

  /**
   * Xử lý khi người chơi mất mạng
   */
  loseLife(amount = 1) {
    if (this.isGameOver) return

    this.currentLives = this.currentLives - amount

    if (this.currentLives <= 0) {
      this.currentLives = 0
      this.triggerGameOver() // Kích hoạt kết thúc game
    }

    this.refreshLivesDisplay()
  }

  /**
   * Kích hoạt trạng thái Game Over
   */
  triggerGameOver() {
    this.isGameOver = true
    this.gameOverSprite.node.active = true // Hiện ảnh Game Over
    this.touchRegister?.setEnabled(false) // Vô hiệu hóa điều khiển máy bay
  }

  /**
   * Cập nhật hiển thị các icon mạng (trái tim)
   */
  refreshLivesDisplay() {
    for (let i = 0; i < this.heartRefs.length; i++) {
      const heart = this.heartRefs[i]
      if (!heart) continue

      heart.node.active = i < this.currentLives // Chỉ hiện icon nếu chỉ số i nhỏ hơn số mạng hiện tại
    }
  }


  // ===== Xử lý va chạm =====
  
  /**
   * Xử lý khi máy bay ăn được item tăng tốc
   */
  onSpeedIconCollision = (other: Collider) => {
    if (this.isGameOver) return
    if (other.node !== this.fighterNode) return
    this.applySpeedBuff()
  }

  /**
   * Áp dụng hiệu ứng tăng tốc độ bắn
   */
  applySpeedBuff() {
    this.currentShotsPerSecond = this.currentShotsPerSecond + 1
    this.hideSpeedIcon()
  }


  // ===== Logic Touch: Điều khiển máy bay =====
  initTouch() {
    if (this.touchRegister) {
      this.touchRegister.setEnabled(true)
      return
    }
    
    // Đăng ký sự kiện di chuyển ngón tay
    this.touchRegister = new TouchEventRegister({
      onTouchMove: (touch) => {
        if (this.isGameOver || !touch || !this.fighterNode) return

        const loc = touch.getLocation()
        // Giới hạn máy bay không bay ra ngoài màn hình dựa trên config
        const x = Math.max(this.fighterConfig.minX, Math.min(this.fighterConfig.maxX, loc.x))
        const y = Math.max(this.fighterConfig.minY, Math.min(this.fighterConfig.maxY, loc.y))

        this.fighterNode.position = Vec2(x, y) // Cập nhật vị trí máy bay
      },
    })
    this.node.addComponent(this.touchRegister) // Gắn vào node
  }

  /**
   * Tính toán thời gian ngẫu nhiên cho lần spawn Item tiếp theo
   */
  scheduleSpeedIconSpawn() {
    this.speedIconCooldown = randomBetween(
      this.speedIconConfig.spawnMinDelay,
      this.speedIconConfig.spawnMaxDelay)
  }

  /**
   * Xuất hiện Item tăng tốc tại vị trí ngẫu nhiên trên đỉnh màn hình
   */
  spawnSpeedIcon() {
    this.speedIconActive = true
    this.speedIcon.node.active = true
    this.speedIcon.node.position = Vec2(
      randomBetween(this.speedIconConfig.minX, this.speedIconConfig.maxX),
      this.speedIconConfig.spawnY)
  }

  /**
   * Ẩn Item sau khi ăn được hoặc bay mất
   */
  hideSpeedIcon() {
    this.speedIconActive = false
    this.speedIcon.node.active = false
    this.scheduleSpeedIconSpawn()
  }

  // ===== Quai rơi: Quản lý quái vật =====

  /**
   * Tính toán thời gian ngẫu nhiên cho lần spawn quái tiếp theo
   */
  scheduleQuaiSpawn() {
    this.quaiSpawnCooldown = randomBetween(
      this.quaiConfig.spawnMinDelay,
      this.quaiConfig.spawnMaxDelay,
    )
  }

  /**
   * Khởi tạo pool quái vật để tối ưu hiệu năng (Object Pooling)
   */
  initQuaiPool() {
    if (this.quaiPool.length > 0) return

    for (const sprite of this.quaiRefs) {
      if (!sprite) continue

      sprite.node.active = false
      this.quaiPool.push({
        sprite,
        active: false,
      })
    }
  }

  /**
   * Lấy một quái vật từ pool và cho nó rơi từ trên xuống
   */
  spawnQuai() {
    const quai = this.quaiPool.find((item) => !item.active)
    if (!quai) return

    quai.active = true
    quai.sprite.node.active = true
    quai.sprite.node.position = Vec2(
      randomBetween(this.quaiConfig.minX, this.quaiConfig.maxX),
      this.quaiConfig.spawnY,
    )
    this.scheduleQuaiSpawn()
  }

  /**
   * Ẩn quái vật và đưa nó về "vùng chờ" để tái sử dụng
   */
  hideQuai(quai: FallingQuaiItem) {
    quai.active = false
    quai.sprite.node.active = false
    quai.sprite.node.position = Vec2(-9999, -9999)
  }

  /**
   * Kiểm tra va chạm giữa quái và máy bay (đơn giản bằng khoảng cách)
   */
  isQuaiHitFighter(quai: FallingQuaiItem) {
    const dx = Math.abs(quai.sprite.node.posX - this.fighterNode.posX)
    const dy = Math.abs(quai.sprite.node.posY - this.fighterNode.posY)

    return dx < 100 && dy < 100 // Nếu khoảng cách < 100 thì coi là va chạm
  }

  /**
   * Cập nhật vị trí rơi của tất cả quái vật đang hoạt động
   */
  updateQuai(dt: number) {
    for (const quai of this.quaiPool) {
      if (!quai.active) continue

      // Rơi xuống dựa trên tốc độ và thời gian delta
      quai.sprite.node.posY = quai.sprite.node.posY - this.quaiConfig.fallSpeed * dt

      // Kiểm tra nếu đâm vào máy bay
      if (this.isQuaiHitFighter(quai)) {
        this.loseLife(1)
        this.hideQuai(quai)
        continue
      }

      // Nếu bay quá cuối màn hình (người chơi bỏ lỡ) thì bị trừ mạng và ẩn đi
      if (quai.sprite.node.posY < this.quaiConfig.despawnY) {
        this.loseLife(1) // Trừ 1 mạng vì để quái thoát
        this.hideQuai(quai)
      }
    }
  }


  // ===== Bullets: Quản lý đạn bắn =====

  /**
   * Khởi tạo pool đạn bằng SpriteRender để tối ưu việc tái sử dụng hình ảnh
   */
  initBulletPool() {
    if (this.bulletPool.length > 0) return

    for (const sprite of this.leftBulletRefs) { // Chuẩn bị kho đạn cho nòng trái
      if (!sprite) continue

      sprite.node.active = false

      this.bulletPool.push({
        sprite,
        active: false,
        offsetX: this.bulletConfig.leftOffsetX,
      })
    }

    for (const sprite of this.rightBulletRefs) { // Chuẩn bị kho đạn cho nòng phải
      if (!sprite) continue

      sprite.node.active = false

      this.bulletPool.push({
        sprite,
        active: false,
        offsetX: this.bulletConfig.rightOffsetX,
      })
    }
  }

  /**
   * Đưa viên đạn trở về trạng thái ẩn để chờ lượt bắn tiếp theo
   */
  resetBulletItem(bullet: BulletItem) {
    bullet.active = false
    bullet.sprite.node.active = false
  }

  /**
   * Kích hoạt đạn tại vị trí họng súng tương ứng của máy bay
   */
  spawnBullet(offsetX: number) {
    // Tìm một viên đạn rảnh rỗi trong Pool đúng nòng (trái/phải)
    const bullet = this.bulletPool.find((b) => !b.active && b.offsetX === offsetX)
    if (!bullet) return

    bullet.active = true // Đánh dấu đạn đang bay
    bullet.sprite.node.position = Vec2( // Đặt vị trí đạn theo máy bay
      this.fighterNode.posX + offsetX,
      this.fighterNode.posY + this.bulletConfig.offsetY,
    )

    bullet.sprite.node.active = true // Hiển thị đạn để bắt đầu bay
  }

  /**
   * Lệnh bắn đồng thời cả 2 viên đạn từ 2 nòng súng
   */
  fireBullets() {
    this.spawnBullet(this.bulletConfig.leftOffsetX)
    this.spawnBullet(this.bulletConfig.rightOffsetX)
  }

  /**
   * Di chuyển tất cả các viên đạn đang bay lên phía trên
   */
  updateBullets(dt: number) {
    for (const bullet of this.bulletPool) {
      if (!bullet.active) continue

      bullet.sprite.node.posY += this.bulletConfig.speed * dt // Đạn bay lên theo tốc độ cấu hình

      // Nếu đạn bay ra khỏi phạm vi màn hình thì thu hồi về Pool
      if (bullet.sprite.node.posY > this.bulletConfig.despawnY) {
        this.resetBulletItem(bullet)
      }
    }
  }

  // ===== Crash: Hiệu ứng nổ =====

  /**
   * Khởi tạo pool hiệu ứng nổ
   */
  initCrashPool() {
    if (this.crashPool.length > 0) return

    for (const sprite of this.crashRefs) {
      if (!sprite) continue

      sprite.node.active = false
      this.crashPool.push({
        sprite,
        active: false,
        timer: 0,
      })
    }
  }

  /**
   * Hiển thị vụ nổ tại vị trí nhất định
   */
  spawnCrash(x: number, y: number) {
    const crash = this.crashPool.find((item) => !item.active)
    if (!crash) return

    crash.active = true
    crash.sprite.node.active = true
    crash.sprite.node.position = Vec2(x, y)
    crash.timer = 0.2 // Hiện nổ trong 0.2 giây
  }

  /**
   * Cập nhật thời gian biến mất cho hiệu ứng nổ
   */
  updateCrash(dt: number) {
    for (const crash of this.crashPool) {
      if (!crash.active) continue

      crash.timer -= dt
      if (crash.timer <= 0) {
        crash.active = false
        crash.sprite.node.active = false
      }
    }
  }

  // ===== Logic Va Chạm Đạn và Quái =====

  /**
   * Kiểm tra va chạm giữa đạn và quái vật đang xuất hiện
   */
  checkBulletQuaiCollision() {
    for (const bullet of this.bulletPool) {
      if (!bullet.active) continue

      for (const quai of this.quaiPool) {
        if (!quai.active) continue

        const dx = Math.abs(bullet.sprite.node.posX - quai.sprite.node.posX)
        const dy = Math.abs(bullet.sprite.node.posY - quai.sprite.node.posY)

        // Nếu đạn và quái chạm nhau (khoảng cách nhỏ hơn 80px)
        if (dx < 80 && dy < 80) {
          this.spawnCrash(quai.sprite.node.posX, quai.sprite.node.posY) // Hiển thị hiệu ứng nổ
          this.hideQuai(quai) // Thu hồi quái vật
          this.resetBulletItem(bullet) // Thu hồi viên đạn
          this.addScore(10) // Tăng điểm thưởng
          break // Viên đạn này đã nổ, không cần xét va chạm với quái khác
        }
      }
    }
  }


  /**
   * Vòng lặp cập nhật trò chơi (chạy mỗi frame)
   */
  update(dt: number) {
    if (this.isGameOver) return // Nếu game over thì không cập nhật gì thêm
    if (!this.fighterNode) return

    // Xử lý khởi tạo pool đạn sau vài frame đầu để đảm bảo refs đã sẵn sàng
    if (!this.bulletPoolInitialized) {
      if (this.initFrameDelay > 0) {
        this.initFrameDelay--
        return
      }

      this.initBulletPool() // khởi tạo kho đạn
      this.initQuaiPool()
      this.initCrashPool()
      this.bulletPoolInitialized = true
      return
    }

    // Giảm thời gian chờ spawn/bắn
    this.fireCooldown = this.fireCooldown - dt // bắn
    this.speedIconCooldown = this.speedIconCooldown - dt // item speed
    this.quaiSpawnCooldown = this.quaiSpawnCooldown - dt // quai rơi

    // Xử lý Logic Item tăng tốc
    if (!this.speedIconActive && this.speedIconCooldown <= 0) {
      this.spawnSpeedIcon()
    } else if (this.speedIconActive) { // nếu item đang active thì cho rơi xuống

      // Mỗi frame giảm posY để icon rơi xuống theo tốc độ (fallSpeed) và thời gian (dt)
      this.speedIcon.node.posY = this.speedIcon.node.posY - this.speedIconConfig.fallSpeed * dt

      if (this.speedIcon.node.posY < this.speedIconConfig.despawnY) { // ngoài màn -> ẩn item
        this.hideSpeedIcon()
      }
    }

    // Xử lý Logic Spawn Quái vật
    while (this.quaiSpawnCooldown <= 0) {
      this.spawnQuai()
      if (this.quaiSpawnCooldown <= 0) {
        this.scheduleQuaiSpawn()
      }
    }

    // Xử lý Logic Tự động bắn
    while (this.fireCooldown <= 0) { // Hết cooldown thì bắn
      this.fireBullets()
      this.fireCooldown = this.fireCooldown + getFireInterval(this.currentShotsPerSecond) // reset cooldown theo tốc độ bắn (đã buff)
    }

    // Cập nhật vị trí các đối tượng động
    this.updateBullets(dt)
    this.updateQuai(dt)
    this.updateCrash(dt)
    this.checkBulletQuaiCollision() // Kiểm tra va chạm đạn - quái
  }

  /**
   * Phương thức vẽ giao diện (JSX-like)
   */
  render() {
    <SceneComponent>
      {/* Hình nền trò chơi */}
      <SpriteRender node={{ xy: [540, 940], scale: 2 }} spriteFrame={sf_back_ground_game} tiledSize={Size(1080, 1900)} />

      {/* Biểu tượng tăng tốc độ bắn */}
      <SpriteRender
        $ref={this.speedIcon}
        spriteFrame={sf_icon_speed}
        node={{ xy: [540, 2060], scale: 0.8 }}
      >
        {/* Vùng va chạm cho Item Speed */}
        <BoxCollider width={100} height={100} onCollisionEnter={this.onSpeedIconCollision} />
      </SpriteRender>

      {/* Danh sách quái vật đang rơi (Object Pooling) */}
      {Array(6).map((_, i) => (
        <SpriteRender
          $push={this.quaiRefs}
          spriteFrame={sf_quai_1}
          node={{ xy: [-9999, -9999], active: false, scale: this.quaiConfig.scale }}
        >
          <BoxCollider width={120} height={120} />
        </SpriteRender>
      ))}

      {/* Danh sách đạn nòng súng bên trái (Object Pooling) */}
      {Array(30).map((_, i) => (
        <SpriteRender
          $push={this.leftBulletRefs}
          spriteFrame={sf_streak}
          node={{ xy: [-9999, -9999], active: false, scale: 0.1 }}
        />
      ))}

      {/* Danh sách đạn nòng súng bên phải (Object Pooling) */}
      {Array(30).map((_, i) => (
        <SpriteRender
          $push={this.rightBulletRefs}
          spriteFrame={sf_streak}
          node={{ xy: [-9999, -9999], active: false, scale: 0.1 }}
        />
      ))}

      {/* Máy bay của người chơi */}
      <SpriteRender
        $refNode={this.fighterNode}
        node={{ position: Vec2(540, 960), scale: 0.8, anchorX: 0.5, anchorY: 0.5 }}
        spriteFrame={sf_chien_co_1}
      >
        {/* Vùng va chạm của Máy bay */}
        <BoxCollider width={160} height={140} />
      </SpriteRender>

      {/* Hiển thị số mạng hiện có (Icon tim) */}
      {Array(5).map((_, i) => (
        <SpriteRender
          $push={this.heartRefs}
          node={{
            xy: [
              this.livesDisplayConfig.startX + this.livesDisplayConfig.gap * i,
              this.livesDisplayConfig.y,
            ],
            scale: this.livesDisplayConfig.scale,
            anchorX: 0,
            anchorY: 1,
            active: true,
          }}
          spriteFrame={sf_health}
        />
      ))}

      {/* Nhãn hiển thị điểm số */}
      <LabelComp
        $ref={this.scoreLabel}
        node={{ xy: [this.scoreDisplayConfig.x, this.scoreDisplayConfig.y], anchorX: 1, anchorY: 1 }}
        string={formatScore(this.score)}
        size={42}
      />

      {/* Danh sách các vụ nổ đang chờ kích hoạt (Object Pooling) */}
      {Array(10).map((_, i) => (
        <SpriteRender
          $push={this.crashRefs}
          spriteFrame={sf_crash}
          node={{ xy: [-9999, -9999], active: false, scale: 0.5 }}
        />
      ))}

      {/* Màn hình kết thúc trò chơi */}
      <SpriteRender
        $ref={this.gameOverSprite}
        spriteFrame={sf_game_over}
        node={{ xy: [540, 960], active: false, zIndex: 100 }}
      />

      {/* Nút quay lại */}
      <BackButton />
    </SceneComponent>
  }
}
