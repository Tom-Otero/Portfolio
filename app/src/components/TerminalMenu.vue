<script setup lang="ts">
import { ref, watch, nextTick,
  defineProps, defineEmits, onMounted,
  onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps<{
  visible: boolean,
  excludeElements?: (HTMLElement | null)[]
}>()

const router = useRouter()

const terminalOutput = ref<HTMLElement | null>(null)

type TerminalLine = { text: string } | { html: string }
const output = ref<TerminalLine[]>([
  { text: '┌───────────────────────────────┐' },
  { text: '│        PORTFOLIO MENU         │' },
  { text: '├───────────────────────────────┤' },
  { html: '│ [1] <a href="/">cd home        ─ Go Home</a>  │' },
  { html: '│ [2] <a href="/about">cd about       ─ About Me</a> │' },
  { html: '│ [3] <a href="/projects">cd projects    ─ Projects</a> │' },
  { html: '│ [4] <a href="/conc">cd conc        ─ ConC</a>     │' },
  { html: '│ [5] <a href="/terminal">cd terminal    ─ Terminal</a> │' },
  { html: '│ [6] <a href="/debug">cd debug       ─ debug</a>    │' },
  { html: '│ [7] <a href="/contact">cd contact     ─ Contact</a>  │' },
  { text: '└───────────────────────────────┘' }
])

watch(output, async () => {
  await nextTick()
  if (terminalOutput.value) {
    terminalOutput.value.scrollTop = terminalOutput.value.scrollHeight
  }
})

const command = ref('')
const terminalRef = ref<HTMLDivElement | null>(null)

function runCommand() {
  if (!command.value.trim()) return

  output.value.push({ text:`> ${ command.value }`})

  // Simulated response
  if (command.value === 'cd home') {
    output.value.push({ text:'Navigating to Home page...'})
    router.push('/')
  } else if (command.value === 'cd about') {
    output.value.push({ text:'Navigating to About page...'})
    router.push('/about')
  } else if (command.value === 'cd conc') {
    output.value.push({ text:'Navigating to ConC page...'})
    router.push('/conc')
  } else if (command.value === 'cd projects') {
    output.value.push({ text:'Navigating to Projects page...'})
    router.push('/projects')
  } else if (command.value === 'cd terminal') {
    output.value.push({ text:'Navigating to Terminal page...'})
    router.push('/terminal')
  } else if (command.value === 'cd debug') {
    output.value.push({ text:'Navigating to Debug page...'})
    router.push('/debug')
  } else if (command.value === 'cd contact') {
    output.value.push({ text:'navigating to contact page...'})
    router.push('/contact')
  }else if (command.value === 'cd contact') {
    output.value.push({ text:'navigating to contact page...'})
    router.push('/contact')
  } else if (command.value === 'cd') {
    output.value.push({ text:'Usage: cd [directory]'})
  } else if (command.value === 'ls') {
    output.value.push({ text:'Usage: ls [directory]'})
  } else {
    output.value.push({ text:`Command not recognized: ${ command.value }`})
  }

  command.value = ''

  // Scroll to bottom
  nextTick(() => {
    terminalRef.value?.scrollTo({
      top: terminalRef.value.scrollHeight,
      behavior: 'smooth',
    })
  })
}

const emit = defineEmits<{
  (e: 'close'): void
}>()



function handleClickOutside(event: MouseEvent) {
  const target = event.target as Node
  const safe = [terminalRef.value, ...(props.excludeElements ?? [])]

  for (const el of safe) {
    if (el && el.contains(target)) return
  }
  emit('close')
}

function handleEscKey(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    emit('close')
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
  document.addEventListener('keypress', handleEscKey)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside)
  document.removeEventListener('keypress', handleEscKey)
})

</script>

<template>
  <div class="terminal-overlay" v-if="visible">
    <div
      ref="terminalRef"
      class="terminal-window"
    >
      <div ref="terminalOutput" class="terminal-output">
        <pre
          v-for="(line, index) in output"
          :key="index"
          class="terminal-line"
          v-html="'html' in line ? line.html : line.text"
        />
      </div>
      <div class="prompt"><pre>> </pre>
        <input
        v-model="command"
        @keyup.enter="runCommand"
        class="input-line"
        autofocus
      />
      </div>
    </div>
  </div>
</template>

<style scoped>


.input-line {
  background: transparent;
  border: none;
  color: var(--monokai-pink);
  font-family: monospace;
  outline: none;
  width: 90%;
}

.prompt {
  display: flex;
}


.terminal-overlay {
  position: relative;
  width: 600px;
  height: 400px;
  background: var(--monokai-bg);
  border: 4px solid var(--gruvbox-green);
  opacity: 0.95;
  font-family: 'Courier New', monospace;
  z-index: 1000;
  display: flex;
  justify-self: center;
}


.terminal-window {
  padding: 0.5em;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  color: var(--gruvbox-green);
  animation: fadeIn 0.3s ease;
}

.terminal-line {
  margin: 0;
  line-height: 1.5em;
}
.terminal-line a {
  text-decoration: none;
  color: inherit;
  font-weight: bold;
}
.terminal-line a:hover {
  text-decoration: underline;
}

@media (max-width: 600px) {
  .terminal-overlay {
    max-width: 400px;
    max-height: 300px;
  }
}
</style>
