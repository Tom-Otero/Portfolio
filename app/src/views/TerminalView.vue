<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import V86 from "@/assets/v86/build/libv86.mjs"
import ContentCard from "@/components/ContentCard.vue"
import { useV86Preload } from '@/composables/useV86Preload'

const { preloadedBuffers, assetUrls, preloadState } = useV86Preload()
let emulator: any = null

onMounted(() => {
  const container = document.getElementById("screen_container")
  if (!container) return

  // Resolve configuration: use ArrayBuffer if cached, otherwise fall back to standard URL
  const biosConfig = preloadedBuffers.has(assetUrls.biosURL)
    ? { buffer: preloadedBuffers.get(assetUrls.biosURL) }
    : { url: assetUrls.biosURL }

  const vgaBiosConfig = preloadedBuffers.has(assetUrls.vgaBiosURL)
    ? { buffer: preloadedBuffers.get(assetUrls.vgaBiosURL) }
    : { url: assetUrls.vgaBiosURL }

  const bzimageConfig = preloadedBuffers.has(assetUrls.bzimageURL)
    ? { buffer: preloadedBuffers.get(assetUrls.bzimageURL) }
    : { url: assetUrls.bzimageURL }

  const initrdConfig = preloadedBuffers.has(assetUrls.initrdURL)
    ? { buffer: preloadedBuffers.get(assetUrls.initrdURL) }
    : { url: assetUrls.initrdURL }

  emulator = new V86({
    wasm_path: assetUrls.wasmURL,
    memory_size: 512 * 1024 * 1024,
    vga_memory_size: 8 * 1024 * 1024,
    screen_container: container,
    bios: biosConfig,
    vga_bios: vgaBiosConfig,
    bzimage: bzimageConfig,
    initrd: initrdConfig,
    cmdline: "rw root=/dev/ram init=/init rdinit=/bin/sh",
    autostart: true,
  })
})

onBeforeUnmount(() => {
  // Always destroy emulator instance on navigation to release ~520MB allocated RAM
  if (emulator && typeof emulator.destroy === 'function') {
    emulator.destroy()
    emulator = null
  }
})
</script>

<template>
  <section class="terminal">
    <div class="terminal-header">
      <h1>Embedded Linux Kernel</h1>
      <p>
        The application below is a fully functional Linux kernel running in the browser. This application is purely
        client-side and does not communicate with any servers. As in, yes! You are currently running an operating system
        entirely in your browser.
      </p>
    </div>
    
    <ContentCard class="terminal-content">
      <div id="screen_container">
        <div style="white-space: pre; font: 14px monospace; line-height: 14px">If you see this, try refreshing...</div>
        <canvas style="display: none">If you see this, try refreshing...</canvas>
      </div>
    </ContentCard>

    <div class="credits">
      <h4 style="padding-bottom: 0; margin-bottom: 0;">Credits:</h4>
      <ul>
        <li>
          This application is made possible by the <a href="https://github.com/copy/v86">V86 emulator</a>, an
          x86 PC emulator and x86-to-wasm JIT, running in the browser.
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.terminal {
  display: grid;
  align-items: center;
  justify-content: center;
  grid-template-areas:
    "terminal-header"
    "terminal-content";
}

.terminal-header {
  grid-area: terminal-header;
  max-width: 800px;
  align-content: center;
  justify-content: center;
  text-align: left;
  padding: 10px;
}
.terminal-header h1 {
  text-align: center;
}

.terminal-content {
  grid-area: terminal-content;
  max-width: 800px;
  align-items: center;
  align-content: center;
  justify-items: center;
  justify-content: center;
  text-align: center;
}

#screen_container {
  display: block;
  background: black;
  align-self: center;
}

hr {
  width: 90%;
  color: var(--gruvbox-green);
  box-shadow: 0 0 10px var(--gruvbox-green);
}
</style>
