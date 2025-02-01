<script setup lang="ts">


</script>

<template>

  <UApp>
    <div class="_layout">
      <TheNavBar/>
      <slot/>
    </div>
  </UApp>

</template>

<style scoped>
._layout {
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: [full-left] var(--flow-gutter) [inner-left] 1fr [inner-right] var(--flow-gutter) [full-right];
  align-content: start;

  min-height: 100vh;
}

._layout > * {
  grid-column: inner-left / inner-right;
}
</style>