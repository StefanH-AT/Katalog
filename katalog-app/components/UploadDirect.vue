<script setup lang="ts">

import {useDropZone, useFileDialog} from "@vueuse/core";

const addedFiles = ref<File[]>([]);

const dropZoneRef = ref<HTMLDivElement>();

function onDrop(files: File[] | null) {
  if(files) {
    addFiles(files);
  }
}

function addFiles(files: File[] | FileList) {
  for (const file of files) {
    if(!addedFiles.value.some(f => f.name === file.name)) {
      addedFiles.value.push(file);
    }
  }
}

const { isOverDropZone } = useDropZone(dropZoneRef, {
  onDrop,
  multiple: true,
  preventDefaultForUnhandled: false,
})

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
    key: "type",
    label: "Type",
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
  if(files) {
    addFiles(files);
  }
});

function remove(fileName: string) {
  const index = addedFiles.value.findIndex(f => f.name === fileName);
  addedFiles.value.splice(index, 1);
}

async function upload() {
  const response = await useFetch("/api/nugget", { method: "POST", body: { files: files.value } });
}

</script>

<template>
  <UCard>
    <template #header>
      <div class="flex justify-between items-center">
        <span class="text-xl">Direct upload</span>
        <UButton leading-icon="lucide:upload" @click="upload" :disabled="addedFiles.length === 0">Upload {{ addedFiles.length }} files</UButton>
      </div>
    </template>

    <div ref="dropZoneRef" class="rounded border border-gray-700 p-4" :class="{'border-primary border-dotted': isOverDropZone}">

      <UTable :rows="addedFiles" :columns="columns">

        <template #size-data="{ row }">
          {{ (row.size / 1024).toFixed(2) }} kB
        </template>

        <template #action-data="{ row }">
          <UButton icon="lucide:minus" color="red" @click="() => remove(row.name)"/>
        </template>

        <template #empty-state>
          <div class="grid place-items-center p-10 gap-5">
            <span class="flex items-center gap-2"><UIcon name="lucide:file-plus-2" class="size-6"/> Drop files here</span>
            <UDivider label="OR" size="sm" class="w-1/2" type="dashed"/>
            <UButton leading-icon="lucide:plus" @click="open" variant="outline">Add files directly</UButton>
          </div>
        </template>

      </UTable>

      <div v-if="addedFiles.length > 0">
        <UDivider class="mb-5"/>

        <UButton leading-icon="lucide:plus" @click="open" variant="ghost">Add files</UButton>
      </div>

    </div>



  </UCard>
</template>

<style scoped>

</style>