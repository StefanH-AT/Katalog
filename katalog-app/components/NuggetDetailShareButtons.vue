<script setup lang="ts">

import {useShare} from "@vueuse/core";
import type {NuggetMetaData} from "#shared/nugget/NuggetMetaData";

const props = defineProps<{ nuggetMetaData: NuggetMetaData }>();

const {share, isSupported} = useShare();

function shareLink() {
  share({
    url: props.nuggetMetaData.image,
    title: `Katalog - ${props.nuggetMetaData.nuggetFileName}`,
  });
}

async function shareFile() {
  const response = await fetch(props.nuggetMetaData.image, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/octet-stream',
    },
  });
  console.log(response);

  const blob = await response.blob();

  console.log(blob);

  const file = new File([blob], props.nuggetMetaData.nuggetFileName, {
    type: blob.type,
  });
  console.log(file);

  share({
    files: [file],
    title: `Katalog - ${props.nuggetMetaData.nuggetFileName}`,
  });
}

</script>

<template>
  <UButton variant="subtle" color="secondary" label="Share Link" leading-icon="lucide:link" @click="shareLink" :disabled="!isSupported"/>
  <UButton variant="subtle" color="secondary" label="Share File" leading-icon="lucide:image-up" @click="shareFile" :disabled="!isSupported"/>
</template>
