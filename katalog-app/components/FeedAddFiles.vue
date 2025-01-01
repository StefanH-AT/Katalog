<template>
  <UButton block
           :variant="isOverDropZone ? 'soft' : 'link'"
           :color="isOverDropZone ? 'primary' : 'neutral'"
           class="border rounded-lg border-gray-700 hover:border-gray-400 h-full md:aspect-square gap-0.5 cursor-pointer text-lg"
           @click="() => open()">

    <UIcon name="lucide:plus" size="1.5em" v-if="!isOverDropZone"/>
    <span v-if="!isOverDropZone">Add</span>

    <UIcon name="lucide:cloud-upload" size="1.5em" v-if="isOverDropZone"/>
    <span v-if="isOverDropZone">Drop files</span>

  </UButton>
</template>

<script setup lang="ts">

import {useFileDialog} from "@vueuse/core";

const nuggetStore = useNuggetStore();
const props = defineProps<{ isOverDropZone: boolean }>();

const {open, files, reset, onChange, onCancel} = useFileDialog({
  accept: "*",
  directory: false,
});

onChange((files) => {
  if(files) {
    nuggetStore.uploadNuggetsToServer(files);
  }
});


</script>

<style scoped>

</style>