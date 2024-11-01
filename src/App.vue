<template>
  <div class="app">
    <Editor v-model="state" />
  </div>
</template>

<script setup>
import { ref, defineModel, provide } from "vue";
import data from "./data.json";
import Editor from "@/packages/editor.jsx";
import { registerConfig as config } from "@/utils/editor-config";
const state = ref(data);

provide("config", Object.freeze(config));
</script>

<style>
.app {
  position: fixed;
  top: 20px;
  left: 20px;
  right: 20px;
  bottom: 20px;
}
</style>
