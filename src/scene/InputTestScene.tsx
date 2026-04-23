import { ButtonComp, LabelComp, SceneComponent, Vec2 } from '@safe-engine/webgl'
import { InputComp } from '@safe-engine/webgl/dist/gui/InputComp'
import { sf_button } from '../assets'
import { BackButton } from '../components/BackButton'

export class InputTestScene extends SceneComponent {
  captchaInput: InputComp

  async onSubmitCaptcha() {
    const captcha = this.captchaInput.string
    console.log('auth', captcha)
  }

  render() {
    <SceneComponent>
      <LabelComp node={{ position: Vec2(406, 440) }} string="Hello safex Input" />
      <InputComp $ref={this.captchaInput} node={{ position: Vec2(420, 320) }} placeHolder="Input here"></InputComp>
      <ButtonComp node={{ position: Vec2(382, 150) }} spriteFrame={sf_button} onPress={this.onSubmitCaptcha}>
        <LabelComp string="Submit" node={{ position: Vec2(72, 25) }} />
      </ButtonComp>
      <BackButton />
    </SceneComponent>
  }
}
