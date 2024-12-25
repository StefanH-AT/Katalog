<script setup lang="ts">

import {useFileDialog} from "@vueuse/core";

const addedFiles = ref<File[]>([]);

const columns = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "size",
    label: "File Size",
  },
  {
    key: "action",
  },
]

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
      <div class="flex justify-between">
        <span>Direct upload</span>
        <UButton leading-icon="lucide:upload" :disabled="addedFiles.length === 0">Upload {{ addedFiles.length }} files</UButton>
      </div>
    </template>

    <UTable :rows="addedFiles" :columns="columns">

      <template #size-data="{ row }">
        {{ (row.size / 1024).toFixed(2) }} kB
      </template>

      <template #action-data="{ row }">
        <UButton icon="lucide:minus" color="red" @click="() => remove(row.name)"/>
      </template>

      <template #empty-state>
        <div class="grid place-items-center p-10">
          <UButton leading-icon="lucide:plus" @click="open" variant="outline">Add files from computer</UButton>
        </div>
      </template>

    </UTable>

    <div v-if="addedFiles.length > 0">
      <UDivider class="mb-5"/>

      <UButton leading-icon="lucide:plus" @click="open" variant="outline">Add files from computer</UButton>
    </div>


  </UCard>
</template>

<style scoped>

</style>