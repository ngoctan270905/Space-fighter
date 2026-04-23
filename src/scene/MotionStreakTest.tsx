import { SceneComponent } from '@safe-engine/webgl'
import { MotionStreakComp } from '@safe-engine/webgl/dist/render/MotionStreakComp'
import { sf_streak } from '../assets'
import { BackButton } from '../components/BackButton'

export default class MotionStreakTest extends SceneComponent {
  streak: MotionStreakComp
  streak2: MotionStreakComp

  update() {
    this.streak.node.posY += 10
    if (this.streak.node.posY > 1800) {
      this.streak.node.posY = 0
      this.streak.getRenderNode().reset()
    }
    this.streak2.node.posY += 4
    if (this.streak2.node.posY > 1800) {
      this.streak2.node.posY = 0
    }
  }

  render() {
    <SceneComponent>
      <MotionStreakComp $ref={this.streak} spriteFrame={sf_streak} node={{ posX: 540 }} />
      <MotionStreakComp $ref={this.streak2} spriteFrame={sf_streak} node={{ posX: 340 }} />
      <BackButton />
    </SceneComponent>
  }
}
