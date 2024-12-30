<script setup lang="ts">


</script>

<template>

  <UApp>
    <UContainer class="_layout min-h-screen">
      <TheNavBar/>
      <slot/>
    </UContainer>
  </UApp>

</template>

<style scoped>
._layout {
  display: grid;
  grid-template-rows: auto 1fr;
}
</style>