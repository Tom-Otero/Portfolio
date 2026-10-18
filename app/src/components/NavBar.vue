<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { HomeIcon } from '@heroicons/vue/24/solid'
import MiniEngine from "@/components/MiniEngine/MiniEngine.vue";
import NavLinks from "@/components/NavLinks.vue";
import TerminalMenu from "@/components/TerminalMenu.vue";

const router = useRouter()

const visible = ref(false);
const menuButtonRef = ref<HTMLElement | null>(null)

function menuButton (){
  visible.value = !visible.value;
}

</script>

<template>
  <header class="navbar">
    <button type="button" class="nav-icon-btn" @click="router.push('/')" aria-label="Home">
      <HomeIcon class="icon" />
    </button>
    <MiniEngine/>
    <button ref="menuButtonRef" @click=menuButton() class="menu-button">MENU</button>
    <TerminalMenu
      :visible=visible
      :exclude-elements="[menuButtonRef]"
      @close="visible = false"
    />
  </header>
</template>

<style scoped>
.navbar {
  position: sticky;
  display: grid;
  grid-template-columns: minmax(100px, 1fr) auto;
  top: 0;
  left: 0;
  z-index: 50;
  height: 64px;
  width: 100%;
  padding: 0 0;
  align-items: center;
  background: var(--accent);
  color: var(--gruvbox-bg-light);
  box-shadow: 0 2px 10px black;
  gap: 1em;
}

.nav-icon-btn {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 60;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gruvbox-green, #b8bb26);
}
.icon {
  width: 24px;
  height: 24px;
  color: #6b7280;
  display: block;
}
.icon:hover {
  color: #111827;
}

MiniEngine {
  grid-row: 1;
  grid-column: 1;
  position:relative;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: left;
  align-items: center;
  align-self: center;
}
 TerminalMenu {
   grid-row: 2;
 }

.menu-button {
  grid-row: 1;
  grid-column: 2;
  position: relative;
  margin-right: 2rem;
  width: 60px;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: var(--gruvbox-green);
  background: var(--monokai-pink);
  border: 4px outset var(--monokai-pink);
  font-family: "TerminessNerdFont-Regular", "Courier New", Courier, monospace;;
  font-size: 1.2rem;
  font-weight: bold;
}
.menu-button:active {
  color: var(--gruvbox-bg);
  background: var(--monokai-pink);
  border: 4px inset var(--monokai-purple);
}

@media (max-width: 700px) {
  .header-content {
    padding: 0 0.5rem;
  }

  .nav {
    gap: 0.9em;
  }
}

</style>
