import { ButtonComp, ExtraDataComp, SceneComponent } from '@safe-engine/webgl'

import { sf_btn_other_button_square_01_yellow, sf_crash } from '../assets'
import { BackButton } from '../components/BackButton'

export default class ButtonScene extends SceneComponent {
  start() {
    // TODO: implement start logic
  }
  onPress(button: ButtonComp) {
    console.log('Clicked', button.node.getData('id'))
  }
  render() {
    <SceneComponent>
      <ButtonComp spriteFrame={sf_crash} node={{ xy: [185 + 180, 960], scaleX: 1.6, scaleY: -1.6 }} onPress={this.onPress}>
        <ExtraDataComp value={12} key="id" />
      </ButtonComp>
      <ButtonComp
        onPress={this.onPress}
        spriteFrame={sf_btn_other_button_square_01_yellow}
        capInsets={[31, 84, 2, 2]}
        node={{ xy: [480, 560], w: 400, h: 180, scale: 2 }}
      >
        <ExtraDataComp value={34} key="id" />
      </ButtonComp>
      <ButtonComp
        spriteFrame={sf_btn_other_button_square_01_yellow}
        capInsets={[34, 67, 28, 23]}
        node={{ xy: [680, 1260], w: 800, h: 80 }}
        onPress={this.onPress}
      >
        <ExtraDataComp value={34} key="id" />
      </ButtonComp>
      <BackButton />
    </SceneComponent>
  }
}
