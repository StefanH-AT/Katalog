<script setup lang="ts">

import UploadDirect from "~/components/UploadDirect.vue";
import TheUploadYtdlp from "~/components/TheUploadYtdlp.vue";

const tabItems = [
  {
    key: "direct",
    label: "Direct Upload",
    icon: "lucide:file-up",
  },
  {
    "key": "ytdlp",
    label: "yt-dlp",
    icon: "lucide:cloud-upload"
  }
]

</script>

<template>
  <div>
    <h1 class="text-2xl">Upload</h1>
    <UTabs :items="tabItems">
      <template #item="{ item }">

        <UploadDirect v-if="item.key === 'direct'"/>
        <TheUploadYtdlp v-if="item.key === 'ytdlp'"/>

      </template>
    </UTabs>
  </div>
</template>

<style scoped>

</style>