<script setup lang="ts">

import {useClipboard, useShare, type UseShareOptions} from "@vueuse/core";
import type {Nugget} from "#shared/nugget/Nugget";

const clipboard = useClipboard();

const props = defineProps<{ nuggetMetaData: Nugget }>();

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
      url: props.nugget.image,
      title: `Katalog - ${props.nugget.nuggetFileName}`,
    });
  }
}

async function shareFile() {
  const response = await fetch(props.nugget.image, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/octet-stream',
    },
  });

  const blob = await response.blob();

  const file = new File([blob], props.nugget.nuggetFileName, {
    type: blob.type,
  });

  if(shareFunction.value) {
    shareFunction.value({
      files: [file],
      title: `Katalog - ${props.nugget.nuggetFileName}`,
    });
  }
}

function copyLink() {
  clipboard.copy(useRequestURL().toString());
}

</script>

<template>
  <UButton variant="subtle" color="secondary" label="Copy Link" leading-icon="lucide:link" @click="copyLink"/>
  <UButton variant="subtle" color="secondary" label="Share Link" leading-icon="lucide:link" @click="shareLink" :disabled="!isShareSupported" :loading="isSupportLoading"/>
  <UButton variant="subtle" color="secondary" label="Share File" leading-icon="lucide:image-up" @click="shareFile" :disabled="!isShareSupported" :loading="isSupportLoading"/>
</template>
