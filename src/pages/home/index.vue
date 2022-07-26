
<template>
  <div>1234</div>
  <Home @click="changeMse" :num="num" />
</template>
<script setup lang="ts">
import { ref } from "vue";
import Home from "@/components/Home/index.vue";
const num = ref(0);
const changeMse = () => {
  num.value++;
};
</script>

<style scoped>
</style>
