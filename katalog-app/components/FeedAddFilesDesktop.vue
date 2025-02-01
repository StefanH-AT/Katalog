<script setup lang="ts">
import {useFileDialog} from "@vueuse/core";

const props = defineProps<{ isOverDropZone: boolean }>();
const nuggetStore = useNuggetStore();

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

<template>
  <UButton block
           :variant="isOverDropZone ? 'soft' : 'link'"
           :color="isOverDropZone ? 'primary' : 'neutral'"
           class="border rounded-lg border-gray-700 hover:border-gray-400 h-full md:aspect-square gap-0.5 cursor-pointer text-lg"
           @click="() => open()">

    <div class="flex gap-2 items-center">
      <div class="flex" v-if="!isOverDropZone">
        <UIcon name="lucide:plus" size="1.5em"/>
        <span>Quick Add</span>
      </div>

      <div class="flex" v-if="isOverDropZone">
        <UIcon name="lucide:cloud-upload" size="1.5em"/>
        <span>Drop files</span>
      </div>

      <UKbd>Crtl + V</UKbd>
    </div>

  </UButton>
</template>

<style scoped>

</style>