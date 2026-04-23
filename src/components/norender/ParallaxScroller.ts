import { ComponentX } from '@safe-engine/webgl'

export default class ParallaxScroller extends ComponentX {
  resetY = 20.0
  speed = 20.0

  // onLoad () {}

  update(dt: Float) {
    let y = this.node.position.y
    y += this.speed * dt
    if (y <= this.resetY * this.node.scaleY) {
      y -= this.resetY * this.node.scaleY
    }
    this.node.posY =(y)
  }
}
