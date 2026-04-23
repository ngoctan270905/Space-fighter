import {
  ButtonComp,
  ExtraDataComp,
  loadScene,
  SceneComponent,
  SpriteRender,
} from '@safe-engine/webgl'

import { sf_home, sf_button_start, sf_button_map, sf_button_exit, sf_button_game, sf_button_hoicham, sf_button_setting, sf_button_cup, sf_button_cart } from '../assets'
import { Scenes } from '../helper/constant'
import { FighterScene } from './FighterScene'
import { SpineScene } from './SpineScene'
import ButtonScene from './ButtonScene'

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export class Home extends SceneComponent {
  private isNavigating = false

  onPress = (event: ButtonComp) => {
    if (this.isNavigating) return
    this.isNavigating = true

    const id = event.node.getData<Integer>('id') as Scenes
    console.log('Clicked', id, Scenes[id])

    if (id === Scenes.Fighter) {
      loadScene(FighterScene)
      return
    }

    if (id === Scenes.Spine) {
      loadScene(SpineScene)
      return
    }

    if (id === Scenes.Button) {
      loadScene(ButtonScene)
      return
    }

    this.isNavigating = false
  }

  render() {
    <SceneComponent>
      <SpriteRender
        node={{ xy: [540, 1170], scale: 1.25 }}
        spriteFrame={sf_home}
      />

      <ButtonComp
        node={{ xy: [970, 2220], scale: 0.35 }}
        spriteFrame={sf_button_setting}
        zoomScale={0.92}
        onPress={this.onPress}
      >
        <ExtraDataComp key="id" value={Scenes.Fighter} />
      </ButtonComp>

      <ButtonComp
        node={{ xy: [970, 2080], scale: 0.35 }}
        spriteFrame={sf_button_game}
        zoomScale={0.92}
        onPress={this.onPress}
      >
        <ExtraDataComp key="id" value={Scenes.Fighter} />
      </ButtonComp>

      <ButtonComp
        node={{ xy: [970, 1940], scale: 0.35 }}
        spriteFrame={sf_button_cup}
        zoomScale={0.92}
        onPress={this.onPress}
      >
        <ExtraDataComp key="id" value={Scenes.Fighter} />
      </ButtonComp>

      <ButtonComp
        node={{ xy: [970, 1800], scale: 0.35 }}
        spriteFrame={sf_button_cart}
        zoomScale={0.92}
        onPress={this.onPress}
      >
        <ExtraDataComp key="id" value={Scenes.Fighter} />
      </ButtonComp>

      <ButtonComp
        node={{ xy: [970, 1660], scale: 0.35 }}
        spriteFrame={sf_button_hoicham}
        zoomScale={0.92}
        onPress={this.onPress}
      >
        <ExtraDataComp key="id" value={Scenes.Fighter} />
      </ButtonComp>

      <ButtonComp
        node={{ xy: [540, 1080], scale: 0.8 }}
        spriteFrame={sf_button_start}
        zoomScale={0.92}
        onPress={this.onPress}
      >
        <ExtraDataComp key="id" value={Scenes.Fighter} />
      </ButtonComp>

      <ButtonComp
        node={{ xy: [540, 860], scale: 0.8 }}
        spriteFrame={sf_button_map}
        zoomScale={0.92}
        onPress={this.onPress}
      >
        <ExtraDataComp key="id" value={Scenes.Spine} />
      </ButtonComp>

      <ButtonComp
        node={{ xy: [540, 640], scale: 0.8 }}
        spriteFrame={sf_button_exit}
        zoomScale={0.92}
        onPress={this.onPress}
      >
        <ExtraDataComp key="id" value={Scenes.Button} />
      </ButtonComp>
    </SceneComponent>
  }
}