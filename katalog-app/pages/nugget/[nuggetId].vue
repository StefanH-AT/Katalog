<template>
<div>
  <NuggetDetailView v-if="data != null" :nugget-meta-data="data" />
  <div v-if="data == null">Unknown nugget</div>
</div>
</template>

<script setup lang="ts">

import type {NuggetMetaData} from "#shared/nugget/NuggetMetaData";
import NuggetDetailView from "~/components/NuggetDetailView.vue";

const route = useRoute();

const nuggetId = route.params.nuggetId;
const {data} = await useFetch<NuggetMetaData>(`/api/nugget/${nuggetId}`);
</script>

<style scoped>

</style>