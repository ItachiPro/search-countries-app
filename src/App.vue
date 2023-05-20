<template>
  <a-spin tip="Cargando..." :spinning="spinning">
    <router-view />
  </a-spin>
</template>
<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const spinning = computed(() => store.state.spinning);
</script>
