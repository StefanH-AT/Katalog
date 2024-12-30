<template>
<div class="min-h-full flex flex-shrink flex-wrap items-start content-start gap-3" ref="dropZoneRef">
  <FeedNugget v-for="nugget of nuggets" :nugget="nugget" :on-nugget-deleted="deleteNugget" />
</div>
</template>

<script setup lang="ts">

import type {NuggetMetaData} from "#shared/nugget/NuggetMetaData";
import {type NuggetUploadResponse, NuggetUploadResponseStatuses} from "#shared/nugget/NuggetUploadResponse";
import {useDropZone} from "@vueuse/core";
import FeedNugget from "~/components/FeedNugget.vue";

const nuggets = ref<NuggetMetaData[]>([]);

const nuggetFetchResult = await useFetch<NuggetMetaData[]>("/api/nugget");

nuggets.value.push(...nuggetFetchResult.data.value ?? []);

const dropZoneRef = ref<HTMLDivElement>();
const { isOverDropZone } = useDropZone(dropZoneRef, {
  onDrop,
  multiple: true,
  preventDefaultForUnhandled: false,
});

function deleteNugget(nuggetId: string) {
  console.log("Deleting ", nuggetId);
  const idx = nuggets.value.findIndex(n => n.nuggetId === nuggetId);
  if(idx === -1) return;

  nuggets.value.splice(idx, 1);
}

function onDrop(files: File[] | null) {
  if(!files) return;
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