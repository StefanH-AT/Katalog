<template>
  <div class="grid grid-cols-2">
    <img class="max-h-60" :src="props.nuggetMetaData.image"/>
    <div>
      <span>{{new Date(props.nuggetMetaData.uploadTimestamp).toDateString()}}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {NuggetMetaData} from "#shared/nugget/NuggetMetaData";

const props = defineProps<{ nuggetMetaData: NuggetMetaData }>();
</script>

<style scoped>

</style>