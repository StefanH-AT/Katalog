<script setup lang="ts">

// TODO: Move this out so it doesn't get recreated every render
import {watchDebounced} from "@vueuse/shared";

const imageExtensions = ["jpeg", "jpg", "png", "gif", "webp"];

const link = ref("");

const couldBeImage = computed<boolean>(() => {
  if(link.value === "") return false;
  if(!URL.canParse(link.value)) return false;
  const linkUrl = new URL(link.value);
  if(!linkUrl) return false;

  return imageExtensions.some((e) => linkUrl.pathname.endsWith(e));
});

let abortController = new AbortController();

watchDebounced(link, (newLink, oldLink) => {
  // abortController.abort();
  // abortController = new AbortController();
  console.log("Fetching", newLink);
  fetch(newLink, {mode: "no-cors", signal: abortController.signal}).then(f => {
    console.log("fetch response", f)
  });
}, {debounce: 100});

</script>

<template>

  <div class="flex gap-2 my-2">
    <UInput v-model="link" size="xl" placeholder="Paste link here" variant="subtle" autofocus class="max-w-full w-full lg:max-w-150" leading-icon="lucide:link" />
    <UButton label="Upload" size="xl" leading-icon="lucide:upload" :disabled="!couldBeImage"/>
  </div>

  <div v-if="couldBeImage">
    <div class="border border-gray-700 rounded p-3 grid place-items-center lg:w-fit lg:max-w-150">
      <img :src="link" class="max-w-full lg:max-w-100">
    </div>
  </div>

</template>

<style scoped>

</style>