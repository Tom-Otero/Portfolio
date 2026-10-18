<script setup lang="ts">
import { onMounted } from 'vue'
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";
import { applyTheme } from "@/theme/themes";

onMounted(() => {
  applyTheme("gruvbox")
})

</script>

<template class="layout">
  <NavBar class="navbar"/>
  <main class="main">
    <slot/>
  </main>
  <Footer class="footer"/>
</template>

<style scoped>
.layout {
  grid-template-areas:
  "navbar"
  "main"
  "footer";
;
}

NavBar {
  max-height: 10%;
}

main {
  min-height: 80%;
  line-height: 1.7;
}

Footer {
  max-height: 10%;
}
</style>
