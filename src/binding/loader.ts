import { loadAll } from '@safe-engine/webgl'

import * as allAssets from '../assets'

export async function loadAssets(cb: (progress: number) => void, onCompleted: () => void) {
  await loadAll(allAssets, cb)
  onCompleted()
}
