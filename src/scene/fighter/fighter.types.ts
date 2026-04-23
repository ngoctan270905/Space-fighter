import { SpriteRender } from '@safe-engine/webgl'

/**
 * Kiểu dữ liệu cho một viên đạn trong kho lưu trữ (Bullet Pool)
 */
export type BulletItem = {
  sprite: SpriteRender      // Đổi từ streak sang sprite
  active: boolean            // Trạng thái đạn: true (đang bay), false (đang trong kho)
  offsetX: number            // Độ lệch vị trí X so với máy bay
}

/**
 * Kiểu dữ liệu cho một quái vật đang rơi trong kho lưu trữ (Quai Pool)
 */
export type FallingQuaiItem = {
  sprite: SpriteRender       // Component hiển thị hình ảnh quái vật
  active: boolean            // Trạng thái quái: true (đang xuất hiện), false (đang ẩn)
}

/**
 * Kiểu dữ liệu cho hiệu ứng nổ (Crash)
 */
export type CrashItem = {
  sprite: SpriteRender       // Component hiển thị ảnh nổ
  active: boolean            // Trạng thái: true (đang hiện), false (đang ẩn)
  timer: number              // Thời gian còn lại trước khi biến mất
}
