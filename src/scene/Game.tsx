import { BoxCollider, ButtonComp, instantiate, LabelComp, loadScene, SceneComponent, Vec2, WidgetComp } from '@safe-engine/webgl'
import { SpineSkeleton } from '@safe-engine/webgl/dist/spine'

import { sf_crash, sp_spineboy_pma } from '../assets'
import { BackButton } from '../components/BackButton'
import { Hero } from '../components/Hero'
import { Home } from './Home'

export class Game extends SceneComponent {
  score = 0
  // uiRef: UIController = null
  hero: Hero

  start() {
    //   schedule((dt) => {
    const monster = instantiate(Hero, { gameNode: this.node })
    //     const box = monster.getComponent(BoxCollider)
    //     box.width = 123
    //     monster.on(DEATH, (point) => {
    //       this.score += point
    //       this.uiRef.updateScore(this.score)
    //       if (this.score > 1000) {
    console.log('you win')
    //         loadScene('game')
    //       }
    //     })
    this.node.addChild(monster.node)
    //   }, 2)
  }

  // onUpdate(dt: number) {}
  onPress() {
    console.log('Clicked')
    // this.uiRef.showDialog(true)
    loadScene(Home)
  }

  render() {
    <SceneComponent>
      <LabelComp node={{ position: Vec2(106, 240) }} string="Game" />
      <ButtonComp node={{ anchorY: 0.5 }} spriteFrame={sf_crash} onPress={this.onPress}>
        <WidgetComp top={20} right={10} />
      </ButtonComp>
      <Hero $ref={this.hero} node={{ position: Vec2(550, 430) }} gameNode={this.node}>
        <BoxCollider width={100} height={100} offset={[10, 10]} />
      </Hero>
      <Hero node={{ xy: [550, 130], rotation: 180 }} gameNode={this.node}>
        <BoxCollider width={100} height={100} offset={[10, 10]} />
      </Hero>
      <SpineSkeleton node={{ position: Vec2(306, 940) }} data={sp_spineboy_pma} animation="idle" loop={true} />
      <BackButton />
    </SceneComponent>
  }
}
