<template>
<div class="flex flex-shrink gap-3">
  <NuxtLink class="border border-gray-700 hover:border-primary cursor-pointer p-1"
            v-for="nugget of nuggets.data.value"
            :to="`/nugget/${nugget.nuggetId}`">
    <img class="max-h-40" :src="nugget.image"/>
  </NuxtLink>
</div>
</template>

<script setup lang="ts">

import type {NuggetMetaData} from "#shared/nugget/NuggetMetaData";

const nuggets = await useFetch<NuggetMetaData[]>("/api/nugget");

</script>

<style scoped>

</style>