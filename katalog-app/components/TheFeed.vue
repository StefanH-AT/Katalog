<template>
<div class="min-h-full flex flex-shrink flex-wrap items-start content-start gap-3" ref="dropZoneRef">
  <div v-for="img in preUploadImages" class="border border-gray-700 p-1">
    <img class="max-h-40" :src="img"/>
  </div>
  <FeedNugget v-for="nugget of nuggets" :nugget="nugget"/>
</div>
</template>

<script setup lang="ts">

import type {NuggetMetaData} from "#shared/nugget/NuggetMetaData";
import {type NuggetUploadResponse, NuggetUploadResponseStatuses} from "#shared/nugget/NuggetUploadResponse";
import {useDropZone} from "@vueuse/core";
import FeedNugget from "~/components/FeedNugget.vue";

const preUploadImages = ref<string[]>([]);
const nuggets = ref<NuggetMetaData[]>([]);

const nuggetFetchResult = await useFetch<NuggetMetaData[]>("/api/nugget");

nuggets.value.push(...nuggetFetchResult.data.value ?? []);

const dropZoneRef = ref<HTMLDivElement>();
const { isOverDropZone } = useDropZone(dropZoneRef, {
  onDrop,
  onEnter,
  onLeave,
  multiple: true,
  preventDefaultForUnhandled: false,
});

function onEnter(files: File[] | null, event: DragEvent) {
  console.log("Enter", files);
  if(!files) return;
  console.log(files);
  for (const file of files) {
    preUploadImages.value.push(file.webkitRelativePath);
  }
}

function onLeave(files: File[] | null, event: DragEvent) {
  console.log("Leave", files);
}

function onDrop(files: File[] | null) {
  if(!files) return;
  preUploadImages.value = [];
  uploadFiles(files);
}

async function uploadFiles(files: File[]) {
  const formData = new FormData();

  for (const file of files) {
    formData.append("file", file);
  }

  const result = await useFetch<NuggetUploadResponse[]>("/api/nugget", {
    method: "POST",
    body: formData,
  });

  if(!result.data.value) return;

  const responses = result.data.value as NuggetUploadResponse[];

  const newNugs: NuggetMetaData[] = [];
  for (const response of responses) {
    if(response.status === NuggetUploadResponseStatuses.Failure) continue;  // TODO: Handle this case

    newNugs.push(response.metaData);
  }

  nuggets.value = [...newNugs, ...nuggets.value];
}

</script>

<style scoped>

</style>