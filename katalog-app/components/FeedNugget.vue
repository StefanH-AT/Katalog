<template>

  <UContextMenu :items="contextMenuItems">

    <NuxtLink class="border rounded-lg border-gray-700 hover:border-gray-400 cursor-pointer p-1" :to="nuggetLink">
      <img class="max-h-40 rounded" :src="nugget.image"/>
    </NuxtLink>

  </UContextMenu>

</template>

<script setup lang="ts">

import type {NuggetMetaData} from "#shared/nugget/NuggetMetaData";
import {useClipboard} from "@vueuse/core";
import type {NuggetDeleteResponse} from "#shared/nugget/NuggetDeleteResponse";
import {useToast} from "#imports";

const clipboard = useClipboard();
const config = useRuntimeConfig();
const toast = useToast();

const props = defineProps<{ nugget: NuggetMetaData, onNuggetDeleted: (nuggetId: string) => void }>();

const nuggetLink = `/nugget/${props.nugget.nuggetId}`;

function copyLink() {
  clipboard.copy(`${config.public.baseUrl}${nuggetLink}`);
}

async function deleteMe() {
  const deleteResult = await $fetch<NuggetDeleteResponse>(`/api/nugget/${props.nugget.nuggetId}`, { method: "delete" });

  if(deleteResult.success) {
    props.onNuggetDeleted(props.nugget.nuggetId);
    toast.add({
      title: "Nugget Deleted!",
      color: "success",
    });
  }
}

const contextMenuItems = ref([
  [
    {
      label: `Nugget`,
      type: "label" as const,
    },
  ],
  [
    {
      label: "Copy Link",
      icon: "lucide:link",
      onSelect: copyLink,
    },
  ],
  [
    {
      label: "Delete",
      icon: "lucide:trash-2",
      color: "error" as const,
      onSelect: deleteMe,
    }
  ]
]);

</script>

<style scoped>

</style>