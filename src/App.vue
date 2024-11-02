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
