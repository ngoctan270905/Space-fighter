import { ButtonComp, LabelComp, SceneComponent } from '@safe-engine/webgl'
import { SpineSkeleton } from '@safe-engine/webgl/dist/spine'

import { sf_button, sp_spineboy_pma } from '../assets'
import { BackButton } from '../components/BackButton'
import { LIME, ORANGE } from '../helper/constant'

export class SpineScene extends SceneComponent {
  private static readonly anims = [
    'aim',
    'death',
    'hoverboard',
    'idle',
    'idle-turn',
    'jump',
    'portal',
    'run',
    'run-to-idle',
    'shoot',
    'walk',
  ]
  animIndex = 0
  skeleton: SpineSkeleton
  animName: LabelComp
  start() {
    console.log(this.skeleton)
    // this.skeleton.setSkeletonData(sp_icon_ready)
    // this.skeleton.setAnimation('animation')
  }

  nextAnim() {
    this.animIndex++
    if (this.animIndex >= SpineScene.anims.length) this.animIndex = 0
    this.skeleton.setAnimation(SpineScene.anims[this.animIndex])
    this.animName.string = SpineScene.anims[this.animIndex]
  }

  render() {
    <SceneComponent>
      <LabelComp node={{ xy: [526, 1698] }} string="Hello safex spine"   />
      <SpineSkeleton $ref={this.skeleton} node={{ xy: [521, 575] }} data={sp_spineboy_pma} loop={true} />
      <LabelComp $ref={this.animName} string="Anim Name" node={{ xy: [560, 495], w: 500, color: LIME }} />
      <BackButton />
      <ButtonComp spriteFrame={sf_button} node={{ xy: [540, 265], color: ORANGE }} onPress={this.nextAnim}>
        <LabelComp string="Next Anim" />
      </ButtonComp>
    </SceneComponent>
  }
}
