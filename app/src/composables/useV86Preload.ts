import { ref } from 'vue'
import wasmURL from '@/assets/v86/build/v86.wasm?url'
import biosURL from '@/assets/v86/bios/seabios.bin?url'
import vgaBiosURL from '@/assets/v86/bios/vgabios.bin?url'

const bzimageURL = '/bzimage.bin'
const initrdURL = '/initrd'

export interface PreloadState {
  isStarted: boolean
  isReady: boolean
  progress: number // 0 to 100
}

// Module-level singleton state (persists across routes)
export const preloadState = ref<PreloadState>({
  isStarted: false,
  isReady: false,
  progress: 0,
})

// Optional in-memory object URL cache to guarantee zero HTTP overhead on mount
export const preloadedBuffers = new Map<string, ArrayBuffer>()

const ASSET_MANIFEST = [
  { id: 'wasm', url: wasmURL },
  { id: 'bios', url: biosURL },
  { id: 'vgaBios', url: vgaBiosURL },
  { id: 'bzimage', url: bzimageURL },
  { id: 'initrd', url: initrdURL },
]

export function useV86Preload() {
  async function startBackgroundPreload() {
    if (preloadState.value.isStarted) return
    preloadState.value.isStarted = true

    const fetchAsset = async (url: string) => {
      // standard fetch with 'force-cache' ensures the browser disk/memory cache stores it
      const response = await fetch(url, { cache: 'force-cache' })
      if (!response.ok) throw new Error(`Failed to preload ${url}: ${response.statusText}`)
      const buffer = await response.arrayBuffer()
      preloadedBuffers.set(url, buffer)
    }

    try {
      let loaded = 0
      const total = ASSET_MANIFEST.length

      await Promise.all(
        ASSET_MANIFEST.map(async (asset) => {
          await fetchAsset(asset.url)
          loaded++
          preloadState.value.progress = Math.round((loaded / total) * 100)
        })
      )

      preloadState.value.isReady = true
      console.info('[v86] Background kernel preloading complete.')
    } catch (err) {
      console.warn('[v86] Background preloading encountered an error:', err)
      // Allow TerminalView to fall back to direct network fetching
      preloadState.value.isStarted = false
    }
  }

  return {
    preloadState,
    startBackgroundPreload,
    preloadedBuffers,
    assetUrls: { wasmURL, biosURL, vgaBiosURL, bzimageURL, initrdURL },
  }
}