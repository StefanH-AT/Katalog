<script setup lang="ts">

import {useClipboard} from "@vueuse/core";
import type {Nugget} from "#shared/nugget/Nugget";
import type {AsyncStatusButtonState} from "~/components/AsyncStatusButton.vue";

const clipboard = useClipboard();

const props = defineProps<{ nugget: Nugget }>();

function copyLink() {
  clipboard.copy(useRequestURL().toString());
}

const imageIsCopyStatus = ref<AsyncStatusButtonState>("idle");

async function copyImage() {
  console.log("Copying image")
  imageIsCopyStatus.value = "loading";
  const response = await fetch(props.nugget.image);
  const blob = await response.blob();

  const clipboardItem = new ClipboardItem({
    [props.nugget.metaData.format]: blob,
  });

  navigator.clipboard.write([clipboardItem])
      .then(() => imageIsCopyStatus.value = "success")
      .catch(() => imageIsCopyStatus.value = "fail");
}

</script>

<template>
  <UButton variant="subtle" color="secondary" label="Copy Link" leading-icon="lucide:link" @click="copyLink"/>
  <AsyncStatusButton :state="imageIsCopyStatus"
                     @click="copyImage"
                     idle-icon="lucide:image"
                     idle-label="Copy File"
                     success-label="Copied!"
                     loading-label="Copying"
                     @update-state="(newState) => {imageIsCopyStatus = newState}"
                     auto-idle
                     variant="subtle" color="secondary"/>
</template>

<style scoped>

</style>