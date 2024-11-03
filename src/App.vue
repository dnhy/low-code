<template>
  <div class="app">
    <Editor v-model="state" />
  </div>
</template>

<script setup lang="ts">
import { ref, provide } from "vue";
import data from "./data.json";
import Editor from "@/packages/editor";
import { registerConfig as config } from "@/utils/editor-config";
import type { EditorData } from "./types";

const state = ref<EditorData>(data);

provide("config", Object.freeze(config));

console.log("NODE_ENV", process.env.NODE_ENV);
console.log("process.env", process.env);
</script>

<style>
.app {
  position: fixed;
  inset: 20px;
}
</style>
