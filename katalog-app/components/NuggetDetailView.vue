<template>
  <div class="grid gap-3 grid-cols-1 lg:grid-cols-2">
    <div>
      <div class="border border-gray-700 rounded p-3 grid place-items-center">
        <img :src="props.nuggetMetaData.image"/>
      </div>
    </div>
    <div>
      <div class="flex justify-center lg:justify-start gap-2">
        <UButton variant="subtle" color="secondary" label="Download" leading-icon="lucide:download" @click="download"/>
        <NuggetDetailShareButtons :nugget-meta-data="props.nuggetMetaData"/>
      </div>
      <span>{{new Date(props.nuggetMetaData.uploadTimestamp).toDateString()}}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {NuggetMetaData} from "#shared/nugget/NuggetMetaData";
import {useDownloadToBrowser} from "~/composables/useDownloadToBrowser";
import {useShare} from "@vueuse/core";
import NuggetDetailShareButtons from "~/components/NuggetDetailShareButtons.vue";

const props = defineProps<{ nuggetMetaData: NuggetMetaData }>();

function download() {
  useDownloadToBrowser(props.nuggetMetaData.image, props.nuggetMetaData.nuggetFileName);
}

</script>

<style scoped>

</style>