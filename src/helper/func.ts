import { NodeComp, Size, Vec2 } from '@safe-engine/webgl'

export function getStars(life: Integer): Integer {
  if (life >= 10) return 3
  if (life >= 5) return 2
  return 1
}

export function calculateAngelInRadian(from: Vec2, to: Vec2): Float {
  const deltaX = to.x - from.x
  const deltaY = to.y - from.y
  const angle = Math.atan2(deltaY, deltaX)
  return angle
}

export function getWorldPosition(node: NodeComp): Vec2 {
  return node.convertToWorldSpaceAR(Vec2(node.position))
}

// Thêm hàm tính điểm trên đường cong Bezier bậc 2 của cocos2d-x
export function bezierAt(a: Float, b: Float, c: Float, t: Float): Float {
  return Math.pow(1 - t, 2) * a + 2 * t * (1 - t) * b + Math.pow(t, 2) * c
}

export function validNode(node: NodeComp): boolean {
  if (node && node.active) return true
  return false
}

export function SizeToVec2(winSize: Size): Vec2 {
  return Vec2(winSize.width, winSize.height)
}
