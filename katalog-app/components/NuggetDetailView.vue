<template>
  <div class="grid gap-3 grid-cols-1 lg:grid-cols-2">
    <div>
      <div class="border border-gray-700 rounded p-3 grid place-items-center">
        <img v-if="props.nugget.type === NuggetTypes.Image" :src="props.nugget.image" :class="{ 'w-full': fullSizeCookie }"/>
      </div>
    </div>
    <div>
      <div class="grid grid-cols-[auto_1fr] mb-2">
        <div class="grid grid-cols-2 gap-2">
          <NuggetDetailCopyButtons :nugget="props.nugget"/>
          <NuggetDetailShareButtons :nugget="props.nugget"/>
        </div>
         <RouteQrImage class="bg-right"/>
      </div>
      <div>
        <UButton variant="subtle" color="secondary" label="Download" leading-icon="lucide:download" @click="download"/>
      </div>

      <USeparator class="my-2"/>

      <div class="grid grid-cols-2 gap-1">

        <span class="font-bold">Uploaded on:</span>
        <span>{{uploadedDateString}}</span>

        <span class="font-bold">Uploaded by:</span>
        <AvatarAndName :avatar-url="profile?.avatarUrl" :user-id="props.nugget.uploadUserId" :display-name="profile?.displayName ?? 'Unknown'"/>

        <template v-if="props.nugget.type === NuggetTypes.Image">
          <span class="font-bold">Resolution</span>
          <span>{{props.nugget.metaData.resX}}x{{props.nugget.metaData.resY}}</span>

          <span class="font-bold">Format</span>
          <span>{{props.nugget.metaData.format}}</span>
        </template>

      </div>

      <USeparator class="my-2"/>

      <div>
        <USwitch label="Full size" v-model="fullSizeCookie"/>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import {type Nugget, NuggetTypes} from "#shared/nugget/Nugget";
import {useDownloadToBrowser} from "~/composables/useDownloadToBrowser";
import NuggetDetailShareButtons from "~/components/NuggetDetailShareButtons.vue";
import AvatarAndName from "~/components/AvatarAndName.vue";
import {addDays} from "#shared/DateUtil";
import {useKatalogImageFullSizeCookie} from "~/composables/useKatalogCookies";
import NuggetDetailCopyButtons from "~/components/NuggetDetailCopyButtons.vue";
import RouteQrImage from "~/components/RouteQrImage.vue";
import type {KatalogUserProfile} from "#shared/user/KatalogUser";

const props = defineProps<{ nugget: Nugget }>();

const uploadedDateString = new Date(props.nugget.uploadTimestamp).toLocaleDateString("en-US", { day: "2-digit", month: "long", year: "numeric" });

function download() {
  useDownloadToBrowser(props.nugget.image, props.nugget.nuggetFileName);
}

const uploadUser = await useFetch<KatalogUserProfile>(`/api/user/${props.nugget.uploadUserId}`);
const profile = uploadUser.data?.value;

const fullSizeCookie = useKatalogImageFullSizeCookie();

</script>

<style scoped>

</style>