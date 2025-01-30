<template>
  <FeedAddFilesDesktop v-if="!isMobile" :is-over-drop-zone="props.isOverDropZone"/>
  <FeedAddFilesMobile v-if="isMobile"/>
</template>

<script setup lang="ts">

import FeedAddFilesDesktop from "~/components/FeedAddFilesDesktop.vue";
import FeedAddFilesMobile from "~/components/FeedAddFilesMobile.vue";

const {isMobile} = useUserAgentInfo();
const props = defineProps<{ isOverDropZone: boolean }>();

</script>

<style scoped>

</style>