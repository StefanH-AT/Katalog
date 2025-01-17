<template>
  <ULink :to="`/profile/${userId}`" class="flex items-center gap-2">
    <UAvatar :src="avatarUrl" size="xs" v-if="avatarUrl"/>
    {{displayName}}
  </ULink>
</template>

<script setup lang="ts">

const props = defineProps<{ displayName: string; userId: string; avatarUrl?: string }>();

</script>

<style scoped>

</style>