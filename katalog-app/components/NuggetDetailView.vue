<template>
  <div class="grid gap-3 grid-cols-1 lg:grid-cols-2">
    <div>
      <div class="border border-gray-700 rounded p-3 grid place-items-center">
        <img :src="props.nuggetMetaData.image"/>
      </div>
    </div>
    <div>
      <div class="flex gap-2 mb-2">
        <NuggetDetailShareButtons :nugget-meta-data="props.nuggetMetaData"/>
      </div>
      <div>
        <UButton variant="subtle" color="secondary" label="Download" leading-icon="lucide:download" @click="download"/>
      </div>

      <USeparator class="my-2"/>

      <div class="grid grid-cols-2 gap-1">

        <span class="font-bold">Uploaded on:</span>
        <span>{{uploadedDateString}}</span>

        <span class="font-bold">Uploaded by:</span>
        <AvatarAndName :avatar-url="profile?.avatarUrl" :user-id="props.nuggetMetaData.uploadUserId" :display-name="profile?.displayName ?? 'Unknown'"/>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {NuggetMetaData} from "#shared/nugget/NuggetMetaData";
import {useDownloadToBrowser} from "~/composables/useDownloadToBrowser";
import NuggetDetailShareButtons from "~/components/NuggetDetailShareButtons.vue";
import type {UserProfile} from "#shared/user/UserProfile";
import AvatarAndName from "~/components/AvatarAndName.vue";

const props = defineProps<{ nuggetMetaData: NuggetMetaData }>();

const uploadedDateString = new Date(props.nuggetMetaData.uploadTimestamp).toLocaleDateString("en-US", { day: "2-digit", month: "long", year: "numeric" });

function download() {
  useDownloadToBrowser(props.nuggetMetaData.image, props.nuggetMetaData.nuggetFileName);
}

const uploadUser = await useFetch<UserProfile>(`/api/user/${props.nuggetMetaData.uploadUserId}`);
const profile = uploadUser.data?.value;

</script>

<style scoped>

</style>