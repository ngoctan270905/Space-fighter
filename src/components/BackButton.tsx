import { ButtonComp, ComponentX, LabelComp, loadScene, Vec2 } from '@safe-engine/webgl'

import { sf_button } from '../assets'
import { ORANGE } from '../helper/constant'
import { Home } from '../scene/Home'

export class BackButton extends ComponentX {
  onPress() {
    loadScene(Home)
  }
  render() {
    <ButtonComp node={{ xy: [850, 80] }} spriteFrame={sf_button} onPress={this.onPress}>
      <LabelComp node={{ position: Vec2(80, 30), color: ORANGE }} string="Back" size={48} />
    </ButtonComp>
  }
}
