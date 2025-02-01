<script setup lang="ts">

const {isMobile} = useUserAgentInfo();

const inputRef = useTemplateRef("search");

const props = defineProps<{
  shortcut?: boolean
}>();

onMounted(() => {
  if(props.shortcut) {
    defineShortcuts({
      meta_m: (e) => { // TODO: This should be meta_k but that doesn't work on linux right now
        console.log("Shortcut pressed", e);
        inputRef.value.focus()
      }
    })
  }
});

</script>

<template>
  <UInput leading-icon="lucide:search" placeholder="Search" ref="search">
    <template #trailing>
      <UKbd v-if="shortcut && !isMobile">Crtl + K</UKbd>
    </template>
  </UInput>
</template>

<style scoped>

</style>