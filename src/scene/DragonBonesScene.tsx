import { LabelComp, SceneComponent, Vec2 } from '@safe-engine/webgl'
import { DragonBonesComp } from '@safe-engine/webgl/dist/dragonbones'

import { db_mecha_1004d_show } from '../assets'
import { BackButton } from '../components/BackButton'

export class DragonBonesScene extends SceneComponent {
  dragon: DragonBonesComp

  render() {
    <SceneComponent>
      <LabelComp node={{ position: Vec2(607, 270) }} string="Hello safex dragon bones" />
      <DragonBonesComp $ref={this.dragon} node={{ position: Vec2(587, 454) }} data={db_mecha_1004d_show} animation="idle" playTimes={3} />
      <BackButton />
    </SceneComponent>
  }
}
