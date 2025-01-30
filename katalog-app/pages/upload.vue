<script setup lang="ts">

import UploadDirect from "~/components/TheUploadDirect.vue";
import TheUploadYtdlp from "~/components/TheUploadYtdlp.vue";
import TheUploadLink from "~/components/TheUploadLink.vue";

const tabItems = [
  {
    slot: "link",
    label: "Link",
    icon: "lucide:link"
  },
  {
    slot: "direct",
    label: "Direct Upload",
    icon: "lucide:file-up",
    disabled: true,
  },
  {
    slot: "ytdlp",
    label: "yt-dlp",
    icon: "lucide:cloud-upload",
    disabled: true,
  },
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

      <template #link>
        <TheUploadLink/>
      </template>

    </UTabs>
  </div>
</template>

<style scoped>

</style>