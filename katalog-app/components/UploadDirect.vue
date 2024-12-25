<script setup lang="ts">

import {useFileDialog} from "@vueuse/core";

const addedFiles = ref<File[]>([]);

const {open, files, reset, onChange, onCancel} = useFileDialog({
  accept: "*",
  directory: false,
})

onChange((files) => {
  if(!files) return;
  for (const file of files) {
    if(!addedFiles.value.some(f => f.name === file.name)) {
      addedFiles.value.push(file);
    }
  }
});

function remove(fileName: string) {
  const index = addedFiles.value.findIndex(f => f.name === fileName);
  addedFiles.value.splice(index, 1);
}

</script>

<template>
  <UCard>
    <template #header>
      Direct upload
    </template>
    <ul>
      <li v-for="file in addedFiles" class="flex justify-between">
        <div>
          {{file.name}} {{(file.size / 1024).toFixed(2)}}kB
        </div>
        <div>
          <UButton icon="lucide:minus" color="red" variant="link" @click="() => remove(file.name)"/>
        </div>
      </li>
    </ul>
    <template #footer>
      <UButton leading-icon="lucide:upload" @click="open">Add files</UButton>
    </template>
  </UCard>
</template>

<style scoped>

</style>