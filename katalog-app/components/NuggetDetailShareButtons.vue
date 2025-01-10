<script setup lang="ts">

import {useShare, type UseShareOptions} from "@vueuse/core";
import type {NuggetMetaData} from "#shared/nugget/NuggetMetaData";

const props = defineProps<{ nuggetMetaData: NuggetMetaData }>();

const isSupportLoading = ref(true);
const isShareSupported = ref(false);
const shareFunction = ref<((overrideOptions?: (globalThis.MaybeRefOrGetter<UseShareOptions> | undefined)) => Promise<void>) | undefined>(undefined);

// During SSR the server will always say it doesn't support share api so this creates a hydration mismatch. We also show the button as loading during hydration
onMounted(() => {
  const {share, isSupported} = useShare();
  isShareSupported.value = isSupported.value;
  shareFunction.value = share;
  isSupportLoading.value = false;
});

function shareLink() {
  if(shareFunction.value) {
    shareFunction.value({
      url: props.nuggetMetaData.image,
      title: `Katalog - ${props.nuggetMetaData.nuggetFileName}`,
    });
  }
}

async function shareFile() {
  const response = await fetch(props.nuggetMetaData.image, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/octet-stream',
    },
  });

  const blob = await response.blob();

  const file = new File([blob], props.nuggetMetaData.nuggetFileName, {
    type: blob.type,
  });

  if(shareFunction.value) {
    shareFunction.value({
      files: [file],
      title: `Katalog - ${props.nuggetMetaData.nuggetFileName}`,
    });
  }
}

</script>

<template>
  <UButton variant="subtle" color="secondary" label="Share Link" leading-icon="lucide:link" @click="shareLink" :disabled="!isShareSupported" :loading="isSupportLoading"/>
  <UButton variant="subtle" color="secondary" label="Share File" leading-icon="lucide:image-up" @click="shareFile" :disabled="!isShareSupported" :loading="isSupportLoading"/>
</template>
