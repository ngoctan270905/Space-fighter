import { ComponentX } from '@safe-engine/webgl'

export default class ParallaxScroller extends ComponentX {
  speed = -200
  height = 2340
  count = 3

  update(dt: Float) {
    let y = this.node.position.y
    y += this.speed * dt

    // khi tâm background đi quá dưới màn hình
    if (y <= -1170) {
      y += this.height * this.count
    }

    this.node.posY = y
  }
}