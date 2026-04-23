import { LabelComp, RichTextComp, SceneComponent, Size } from '@safe-engine/webgl'

import { BackButton } from '../components/BackButton'
import { CYAN, ORANGE, RED, YELLOW } from '../helper/constant'

export class LabelScene extends SceneComponent {
  render() {
    <SceneComponent>
      <LabelComp node={{ xy: [406, 240] }} string="Hello safex label" />
      <BackButton />
      <RichTextComp
        node={{ xy: [640, 940] }}
        size={72}
        string={'<font size=24><shadow color=#4169E1 offsetWidth=8 offsetHeight=-8  blurRadius=2>SHADOW</shadow></font>'}
      />
      <RichTextComp
        node={{ xy: [654, 540], color: CYAN }}
        string={'<font size=24><outline color=#D2B48C size=2>OUTLINE</outline></font>'}
        size={64}
      />
      <RichTextComp node={{ xy: [354, 340], w: 200, color: ORANGE }} string="RichTextComp normal" size={60} />
      <LabelComp node={{ xy: [706, 440], w: 300, h: 300, color: YELLOW }} string="Yellow label with long content" size={32} />
      <LabelComp node={{ xy: [306, 840] }} string="Yellow outline label" outline={[YELLOW, 5]}></LabelComp>
      <LabelComp node={{ xy: [406, 1240] }} string="Yellow shadow label" shadow={[RED, 12, Size(10, 10)]}></LabelComp>
    </SceneComponent>
  }
}
