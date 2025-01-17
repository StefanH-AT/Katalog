<template>
<div>
  <div class="flex items-center gap-2 mb-2">
    <UButton leading-icon="lucide:arrow-left" color="neutral" variant="subtle" @click="back()">Back</UButton>
    <div v-if="data != null" class="ml-auto">
      <span class="font-mono text-xl">{{data.nuggetId}}</span>
    </div>
  </div>
  <NuggetDetailView v-if="data != null" :nugget-meta-data="data" />
  <div v-if="data == null">Unknown nugget</div>
</div>
</template>

<script setup lang="ts">

import type {NuggetMetaData} from "#shared/nugget/NuggetMetaData";
import NuggetDetailView from "~/components/NuggetDetailView.vue";

const route = useRoute();
const router = useRouter();

const nuggetId = route.params.nuggetId;
const {data} = await useFetch<NuggetMetaData>(`/api/nugget/${nuggetId}`);

function back() {
  router.back();
}
</script>

<style scoped>

</style>