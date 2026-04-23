import {
  ButtonComp,
  GraphicsRender,
  LabelComp,
  NodeComp,
  NodeRender,
  SceneComponent,
  Size,
  SpriteRender,
  Vec2
} from '@safe-engine/webgl'
import { MaskRender } from '@safe-engine/webgl/dist/render/MaskRender'

import { sf_base, sf_button, sf_crash, sf_dialog_name, sf_progress_bar, sf_streak } from '../assets'
import { BackButton } from '../components/BackButton'
import { GREEN, RED, WHITE } from '../helper/constant'

export default class SpriteTest extends SceneComponent {
  $cases: NodeComp[] = []
  stencil: GraphicsRender
  mask: MaskRender
  indexCase = 2

  start() {
    this.nextCase()
    // this.nextCase()
    this.stencil.drawDot(Vec2(50, 50), 1450)
  }

  onPressNext() {
    this.nextCase()
  }

  nextCase() {
    this.indexCase = (this.indexCase + 1) % this.$cases.length
    this.$cases.forEach((node, i) => {
      node.active = i === this.indexCase
    })
  }

  render() {
    <SceneComponent>
      <ButtonComp spriteFrame={sf_button} node={{ xy: [540, 200] }} onPress={this.onPressNext} >
        <LabelComp string="Next Test" node={{ xy: [85.5, 26] }} >
        </LabelComp>
      </ButtonComp>
      <NodeRender $pushNode={this.$cases}>
        <LabelComp string="Sprite Test loop" node={{ xy: [540, 2000] }} />
        {Array(4).map((_, i = 1) => (
          <SpriteRender spriteFrame={sf_streak} node={{ xy: [115, 350 + i * 275] }} />
        ))}
        <NodeRender node={{ xy: [540, 960] }}>
          {Array(6).map(() => (
            <SpriteRender spriteFrame={sf_crash} />
          ))}
        </NodeRender>
      </NodeRender>
      <NodeRender $pushNode={this.$cases}>
        <LabelComp string="9-slice Sprite" node={{ xy: [540, 2000] }} />
        <SpriteRender spriteFrame={sf_base} capInsets={[1, 1, 1, 1]} node={{ xy: [540, 960], contentSize: Size(200, 300), color: GREEN }} >
          <SpriteRender spriteFrame={sf_crash} node={{ xy: [50, 50] }} />
        </SpriteRender>
      </NodeRender>
      <NodeRender $pushNode={this.$cases}>
        <LabelComp string="Sprite Mask" node={{ xy: [540, 2000] }} />
        <SpriteRender spriteFrame={sf_crash} node={{ xy: [330, 500] }}>
          <MaskRender $ref={this.mask} spriteFrame={sf_dialog_name} node={{ xy: [330, 800], scale: 2 }}>
            <SpriteRender spriteFrame={sf_crash} node={{ xy: [0, 10] }}></SpriteRender>
          </MaskRender>
        </SpriteRender>
        <MaskRender cropSize={Size(200, 50)} node={{ xy: [330, 1500], scale: 2 }}>
          <GraphicsRender $ref={this.stencil} lineWidth={5} strokeColor={RED} fillColor={WHITE} node={{ xy: [100, 100] }} />
          <SpriteRender spriteFrame={sf_progress_bar} node={{ xy: [1, 10] }}></SpriteRender>
        </MaskRender>
      </NodeRender>
      <NodeRender $pushNode={this.$cases}>
        <LabelComp string="Tiled Sprite" node={{ xy: [540, 2000] }} />
        <SpriteRender spriteFrame={sf_crash} tiledSize={Size(480, 900)} node={{ xy: [480, 800] }}>
          <SpriteRender spriteFrame={sf_dialog_name} node={{ xy: [1, 10] }}></SpriteRender>
        </SpriteRender>
      </NodeRender>
      <BackButton />
    </SceneComponent>
  }
}
