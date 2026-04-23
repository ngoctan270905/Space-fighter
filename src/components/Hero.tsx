import { BaseComponentProps, ComponentX, NodeComp, SpriteRender, Vec2 } from '@safe-engine/webgl'

import { sf_progress_bg } from '../assets/TextureAssets'

interface HeroProps extends BaseComponentProps<Hero> {
  gameNode?: NodeComp
}
export class Hero extends ComponentX<HeroProps> {
  hp = 100
  sprite: SpriteRender

  start() {
    console.log('hero is bar', this.hp)
  }

  render() {
    <SpriteRender node={{ position: Vec2(500, 240) }} $ref={this.sprite} spriteFrame={sf_progress_bg}></SpriteRender>
  }
}
