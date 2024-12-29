<template>

  <NuxtLink class="border border-gray-700 hover:border-primary cursor-pointer p-1" :to="nuggetLink"  @contextmenu.prevent="onContextMenu">
    <img class="max-h-40" :src="nugget.image"/>
  </NuxtLink>

  <UContextMenu v-model="isOpen" :virtual-element="virtualElement">
    <div class="p-4">
      Menu
    </div>
  </UContextMenu>

</template>

<script setup lang="ts">

import type {NuggetMetaData} from "#shared/nugget/NuggetMetaData";
import {useMouse, useWindowScroll} from "@vueuse/core";

const props = defineProps<{ nugget: NuggetMetaData }>();

const nuggetLink = `/nugget/${props.nugget.nuggetId}`;

const { x, y } = useMouse();
const { y: windowY } = useWindowScroll();
const isOpen = ref(false);
const virtualElement = ref({ getBoundingClientRect: () => ({}) });

function onContextMenu() {
  const top = unref(y) - unref(windowY)
  const left = unref(x)

  virtualElement.value.getBoundingClientRect = () => ({
    width: 0,
    height: 0,
    top,
    left
  })

  isOpen.value = true
}
</script>

<style scoped>

</style>