import { LabelComp, SceneComponent, SpriteRender } from '@safe-engine/webgl'

import { TiledMapComp } from '@safe-engine/webgl/dist/fasttiled/TiledMapComp'
import { map_1_json, sf_crash, sf_dialog_name } from '../assets'
import { BackButton } from '../components/BackButton'

export class TiledMapScene extends SceneComponent {
  tiledMapComp: TiledMapComp
  spriteRender: SpriteRender
  spriteRender2: SpriteRender

  start() {
    // console.log('TiledMapScene started', this.tiledMapComp.node.instance)
    // const { x, y } = this.tiledMapComp.getRenderNode().getLayer('map').getPositionAt(Vec2(3, 77))
    // console.log('x y ', x, y)
    // this.spriteRender.node.position = Vec2(x, y)
    // this.spriteRender2.node.position = this.tiledMapComp.getRenderNode().getLayer('map').getPositionAt(3, 75)
  }

  render() {
    <SceneComponent>
      <LabelComp node={{ xy: [540, 140] }} string="Hello safex tiled" />
      <BackButton />
      <TiledMapComp $ref={this.tiledMapComp} node={{ xy: [110, 2620] }} mapFile={map_1_json}>
        <SpriteRender $ref={this.spriteRender} spriteFrame={sf_crash}></SpriteRender>
        <SpriteRender $ref={this.spriteRender2} spriteFrame={sf_dialog_name}></SpriteRender>
      </TiledMapComp>
    </SceneComponent>
  }
}
