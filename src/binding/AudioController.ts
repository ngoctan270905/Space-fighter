import { audioEngine } from 'safex-webgl/dist/audio'
import { button_sfx } from '../assets/AudioAssets'

export default class AudioController {
  private static _instance: AudioController
  private constructor() { }
  public static get Instance() {
    if (!AudioController._instance) {
      AudioController._instance = new AudioController()
    }
    return AudioController._instance
  }

  playBackgroundMusic() {
    const newMusicState = true
    // log('toggleBackgroundMusic', this.music);
    if (newMusicState) {
      if (!audioEngine.isMusicPlaying()) {
        audioEngine.playMusic(button_sfx, true)
        // audioEngine.setMusicVolume(1);
      } else {
        audioEngine.resumeMusic()
      }
    } else {
      audioEngine.pauseMusic()
    }
  }
  playEffectSound(type: string) {
    // if (getEffect()) {
    audioEngine.playEffect(type, false)
    // }
  }

  playButtonClickSound() {
    this.playEffectSound(button_sfx)
  }
}
