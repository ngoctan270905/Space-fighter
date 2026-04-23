import { CameraFlag, LabelComp, SceneComponent, SpriteRender, Vec2 } from '@safe-engine/webgl'
import {
  DynamicBody,
  PhysicsBox,
  PhysicsCircle,
  PhysicsPolygon,
  RigidBody,
  StaticBody
} from '@safe-engine/webgl/dist/box2d-wasm'
import {
  CameraComp
} from '@safe-engine/webgl/dist/camera'

import { sf_button, sf_crash, sf_dialog_name } from '../assets'
import { BackButton } from '../components/BackButton'

export class PhysicsScene extends SceneComponent {
  body: RigidBody

  start() {
    this.body.applyLinearImpulse(Vec2(10, 100))
    console.log(this.body.linearVelocity)
    this.body.applyTorque(10)
    this.defaultCamera.isCenterDraw = true
  }

  onCollisionEnter(other: RigidBody) {
    console.log('box contact', other.props.tag)
    // this.body.position = Vec2(600, 1800)
    // other.node.destroy()
  }

  update() {
    // console.log('update', this.body.node.rotation)
    // if (this.body)
      // this.defaultCamera.setPosition(this.body.node.position)
  }

  render() {
    <SceneComponent>
      <LabelComp node={{ xy: [541, 1755], cameraMask: CameraFlag.USER5 }} string="Hello safex physics" />
      <BackButton node={{ cameraMask: CameraFlag.USER1 }} />
      <CameraComp flag={CameraFlag.USER1} />
      <SpriteRender node={{ xy: [560, 1030] }} spriteFrame={sf_button}>
        <RigidBody type={DynamicBody} onBeginContact={this.onCollisionEnter} shapes={PhysicsBox(52, 171)} />
      </SpriteRender>
      <SpriteRender node={{ xy: [360, 1130] }} spriteFrame={sf_dialog_name}>
        <RigidBody $ref={this.body} type={DynamicBody} shapes={PhysicsCircle(150, [-100, -20])} />
      </SpriteRender>
      <SpriteRender node={{ xy: [660, 1530] }} spriteFrame={sf_button}>
        <RigidBody type={DynamicBody} shapes={PhysicsPolygon([[0, 1],
        [0, 50],
        [169, 51],
        [170, 1],
        ], [-100, -20])} />
      </SpriteRender>
      <SpriteRender node={{ xy: [860, 1230] }} spriteFrame={sf_crash}>
        <RigidBody type={DynamicBody} shapes={PhysicsPolygon([
          [46, 1],
          [0, 39],
          [1, 82],
          [44, 119],
          [87, 122],
          [157, 95],
          [121, 7],
          [69, 2],
        ])} />
      </SpriteRender>
      <SpriteRender node={{ xy: [540, 500] }} spriteFrame={sf_button}>
        <RigidBody type={StaticBody} shapes={PhysicsBox(60, 1200)} />
      </SpriteRender>
    </SceneComponent>
  }
}
