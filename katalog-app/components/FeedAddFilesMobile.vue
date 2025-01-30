<script setup lang="ts">

import {useFileDialog} from "@vueuse/core";
import {NuggetImageFormats} from "#shared/nugget/Nugget";

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

const pasteClipboardLoading = ref<boolean>(false);

async function handlePasteClipboard() {
  pasteClipboardLoading.value = true;
  try {
    const items = await navigator.clipboard.read();

    const files: File[] = [];
    for (const item of items) {
      for (const imageFormat of NuggetImageFormats) {
        if (!item.types.includes(imageFormat)) continue;

        const blob = await item.getType(imageFormat);
        const f = new File([blob], "unknown" + files.length);
        files.push(f);
      }
    }

    if (files.length > 0) {
      await nuggetStore.uploadNuggetsToServer(files);
    }
  } catch(e) {

    console.log(e);

  } finally {
    pasteClipboardLoading.value = false;
  }
}

</script>

<template>
  <div class="flex flex-row flex-wrap gap-3">
    <UButton variant="outline" color="neutral" class="grow-10 justify-center" size="xl" leading-icon="lucide:plus" @click="() => open()">Add</UButton>
    <UButton variant="outline" color="neutral" class="grow justify-center" size="xl" leading-icon="lucide:clipboard" :loading="pasteClipboardLoading" :disabled="pasteClipboardLoading" @click="handlePasteClipboard">Paste Clipboard</UButton>
  </div>
</template>

<style scoped>

</style>