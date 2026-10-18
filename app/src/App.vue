<script setup lang="ts">
import { onMounted } from 'vue'
import { useV86Preload } from '@/composables/useV86Preload'
import Layout from '@/layouts/Layout.vue'

const { startBackgroundPreload } = useV86Preload()

onMounted(() => {
  // Wait until main thread is idle to prevent bandwidth contention with view rendering
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => {
      startBackgroundPreload()
    }, { timeout: 4000 }) // Force start within 4s if idle is delayed
  } else {
    // Safari fallback
    setTimeout(() => {
      startBackgroundPreload()
    }, 1500)
  }
})
</script>

<template>
  <div id="app">
    <Layout>
      <router-view class="content"/>
    </Layout>
  </div>
</template>
<style scoped>
Layout {
  min-height: 100%;
}
.content {
  min-height: 100vh;
}
</style>

