<script setup lang="ts">

import UploadDirect from "~/components/TheUploadDirect.vue";
import TheUploadYtdlp from "~/components/TheUploadYtdlp.vue";

const tabItems = [
  {
    slot: "direct",
    label: "Direct Upload",
    icon: "lucide:file-up",
  },
  {
    slot: "ytdlp",
    label: "yt-dlp",
    icon: "lucide:cloud-upload"
  }
]

</script>

<template>
  <div class="pb">
    <UTabs :items="tabItems" variant="link">

      <template #direct>
        <UploadDirect/>
      </template>

      <template #ytdlp>
        <TheUploadYtdlp/>
      </template>

    </UTabs>
  </div>
</template>

<style scoped>

</style>