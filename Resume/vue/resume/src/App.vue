<template>
  <Resume />
</template>

<script>
import Resume from "./components/TomOteroResume.vue";

export default {
  name: "App",
  components: {
    Resume,
  },
};
</script>

<style>
body {
  position: relative;
  display: flex;
  justify-content: center;
  background: #fafafa;
}
#app {
  padding: 0;
  margin: 10px;
  max-width: 900px;
  min-height: 100vh;

  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  line-height: 1.7;
  color: #222;
  background: #fafafa;
}
</style>
