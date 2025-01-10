<template>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>
<script setup lang="ts">

const route = useRoute();
const runtimeConfig = useRuntimeConfig();
useHead({
  title: buildTitle()
});

function buildTitle(): string {
  let siteName = runtimeConfig.public.siteName;
  if(!siteName) {
    siteName = "Katalog";
  }

  const pageTitle = route.meta.title;

  if(pageTitle) {
    return `${siteName} ⋅ ${pageTitle}`
  }

  return siteName;
}

</script>