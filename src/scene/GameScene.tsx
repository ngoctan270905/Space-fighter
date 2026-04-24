import { SceneComponent, SpriteRender, Size } from '@safe-engine/webgl'
import { sf_background_game_scene } from '../assets'
import { BackButton } from '../components/BackButton'
import ParallaxScroller from '../components/norender/ParallaxScroller'

export class GameScene extends SceneComponent {
  render() {
    <SceneComponent>
      <SpriteRender
        node={{ xy: [540, 1170] }}
        spriteFrame={sf_background_game_scene}
        tiledSize={Size(1080, 2340)}
      >
        <ParallaxScroller speed={-200} height={2340} count={3} />
      </SpriteRender>

      <SpriteRender
        node={{ xy: [540, 1170 + 2340] }}
        spriteFrame={sf_background_game_scene}
        tiledSize={Size(1080, 2340)}
      >
        <ParallaxScroller speed={-200} height={2340} count={3} />
      </SpriteRender>

      <SpriteRender
        node={{ xy: [540, 1170 + 2340 * 2] }}
        spriteFrame={sf_background_game_scene}
        tiledSize={Size(1080, 2340)}
      >
        <ParallaxScroller speed={-200} height={2340} count={3} />
      </SpriteRender>

      <BackButton />
    </SceneComponent>
  }
}