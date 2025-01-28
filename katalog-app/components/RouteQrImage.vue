<script setup lang="ts">
import {renderSVG} from "uqr"

const url = useRequestURL();

const dataImg = `data:image/svg+xml;charset=UTF-8,${renderSVG(url.toString())}`;

const bg = `background-image: url('${dataImg}')`;

</script>

<template>
  <div :style="bg" class="h-full bg-contain bg-no-repeat"/>
</template>

<style scoped>

</style>