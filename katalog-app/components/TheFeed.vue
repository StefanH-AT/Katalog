<template>
<div class="min-h-full flex flex-shrink flex-wrap items-start content-start gap-3" ref="dropZoneRef">
  <FeedNugget v-for="nugget of nuggetStore.nuggets" :nugget="nugget" />
</div>
</template>

<script setup lang="ts">

import {useDropZone} from "@vueuse/core";
import FeedNugget from "~/components/FeedNugget.vue";

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

</script>

<style scoped>

</style>