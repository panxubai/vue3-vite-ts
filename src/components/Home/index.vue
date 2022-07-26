<script setup lang="ts">
import { ref, computed } from "vue";
import { useStore, mapGetters } from "vuex";
defineProps({
  num: { type: Number, required: true, default: "你好" },
});
const emit = defineEmits<{
  (event: "click", id?: number): void;
}>();
const count = ref(0);
const store = useStore();
let six = store.state.Home.six;
const changname = computed(() => {
  // return store.state.Home.name;
  return store.getters["getName"];
});
const changSIX = computed(() => {
  // return store.state.Home.six;
  return store.getters["getSix"];
});
const clickTap = () => {
  store.commit("setName", (store.state.Home.name += "--"));
  store.dispatch("getUserData", (six += 1));
  emit("click");
};
console.log(import.meta.env); // 获取环境
</script>
<template>
  <h1>{{ num }}</h1>
  <div class="card">
    <a-button type="button" @click="clickTap">count is {{ num }}</a-button>
  </div>
  <p>姓名：{{ changname }}</p>
  <p>年龄：{{ changSIX }}</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
