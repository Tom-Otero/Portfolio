<script setup lang="ts">
import { ref } from 'vue'
import ContentCard from "@/components/ContentCard.vue"

const iframeRef = ref<HTMLIFrameElement | null>(null)
const isPaused = ref(false)

// Define the exact contract your component expects from the iframe
interface V86Instance {
  run: () => void;
  stop: () => void;
  restart: () => void;
  destroy: () => void;
}

// Extend the native Window interface
interface V86Window extends Window {
  emulator?: V86Instance;
}

function getEmulator(): V86Instance | undefined {
  return (iframeRef.value?.contentWindow as V86Window | null)?.emulator;
}
function togglePause() {
  const emu = getEmulator();
  if (!emu) return;

  if (isPaused.value) {
    emu.run();
    isPaused.value = false;
  } else {
    emu.stop();
    isPaused.value = true;
  }
}

function handleReboot() {
  if (iframeRef.value && iframeRef.value.contentWindow) {
    // Cold reboot: Reload the iframe completely
    iframeRef.value.contentWindow.location.reload();
    isPaused.value = false;
  }
}

</script>

<template>
  <section class="terminal">
    <div class="terminal-header">
      <h1>Embedded Linux Kernel</h1>
      <p>
        The application below is a fully functional Linux kernel running in the browser.
        This instance runs client-side inside WebAssembly.
      </p>

      <div class="terminal-controls">
        <span class="status-indicator" :class="{ paused: isPaused }">
          ● {{ isPaused ? 'PAUSED' : 'RUNNING' }}
        </span>

        <button type="button" class="ctrl-btn" @click="togglePause()">
          {{ isPaused ? 'Resume' : 'Pause' }}
        </button>

        <button type="button" class="ctrl-btn" @click="handleReboot()">
          Reboot
        </button>
      </div>
    </div>

    <ContentCard class="terminal-content">
      <!-- The sandbox isolates the memory leak and event listeners -->
      <iframe 
        ref="iframeRef" 
        src="/linux-env.html" 
        class="v86-sandbox"
        frameborder="0"
        scrolling="no"
      ></iframe>
    </ContentCard>

    <div class="credits">
      <h4 style="padding-bottom: 0; margin-bottom: 0;">Credits:</h4>
      <ul>
        <li>
          This application is made possible by the 
          <a href="https://github.com/copy/v86" target="_blank" rel="noopener">V86 emulator</a>.
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.v86-sandbox {
  width: 100%;
  height: 400px;
  background: var(--monokai-bg, #272822);
  border-radius: 4px;
}

/* ... keep your existing button and control styles ... */
.terminal-controls {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 1rem 0;
  padding: 0.5rem 0.75rem;
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid var(--gruvbox-green, #b8bb26);
  border-radius: 4px;
  width: fit-content;
}

.status-indicator {
  font-family: monospace;
  font-size: 0.85rem;
  font-weight: bold;
  color: var(--gruvbox-green, #b8bb26);
  margin-right: 0.5rem;
}

.status-indicator.paused {
  color: var(--monokai-pink, #f92672);
}

.ctrl-btn {
  font-family: monospace;
  font-size: 0.85rem;
  font-weight: bold;
  padding: 0.35rem 0.75rem;
  background: var(--gruvbox-bg, #282828);
  color: var(--gruvbox-fg, #ebdbb2);
  border: 2px outset var(--gruvbox-bg-light, #504945);
  cursor: pointer;
}
</style>