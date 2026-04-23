import { BoxCollider, Collider, LabelComp, SceneComponent, SpriteRender } from '@safe-engine/webgl'

import { DragonBonesComp } from '@safe-engine/webgl/dist/dragonbones'
import { db_mecha_1004d_show, sf_crash } from '../assets'
import { BackButton } from '../components/BackButton'

export class CollidersScene extends SceneComponent {
  dragon: DragonBonesComp

  onCollisionEnter(other: Collider) {
    console.log(other.props.tag)
  }

  render() {
    <SceneComponent>
      <LabelComp node={{ xy: [530, 1712] }} string="Hello safex Collide" />
      <BackButton />
      <DragonBonesComp $ref={this.dragon} node={{ xy: [576, 724] }} data={db_mecha_1004d_show} animation="idle" playTimes={3}>
        <BoxCollider height={200} width={200} offset={[-100, -200]} onCollisionEnter={this.onCollisionEnter} />
      </DragonBonesComp>
      <SpriteRender node={{ xy: [640, 360] }} spriteFrame={sf_crash}>
        <BoxCollider height={100} width={100} />
      </SpriteRender>
      <BackButton />
    </SceneComponent>
  }
}
