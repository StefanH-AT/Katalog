<template>
  <div class="min-h-full grid content-start gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6" ref="dropZoneRef">
    <FeedAddFiles :is-over-drop-zone="isOverDropZone" />
    <FeedNugget v-for="nugget of nuggetStore.nuggets" :key="nugget.nuggetId" :nugget="nugget" />
  </div>
</template>

<script setup lang="ts">

import {useDropZone, useEventListener} from "@vueuse/core";
import FeedNugget from "~/components/FeedNugget.vue";
import FeedAddFiles from "~/components/FeedAddFiles.vue";

const nuggetStore = useNuggetStore();

nuggetStore.fetchNuggets();

const dropZoneRef = ref<HTMLDivElement>();
const { isOverDropZone } = useDropZone(dropZoneRef, {
  onDrop,
  multiple: true,
  preventDefaultForUnhandled: false,
});

function onDrop(files: File[] | null) {
  if(!files) return;
  nuggetStore.uploadNuggetsToServer(files);
}

useEventListener("paste", (event: ClipboardEvent) => {
  const clipboardData = event.clipboardData;
  if (!clipboardData || clipboardData.files.length === 0) return;

  nuggetStore.uploadNuggetsToServer(clipboardData.files);
});

</script>

<style scoped>

</style>