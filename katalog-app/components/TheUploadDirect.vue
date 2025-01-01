<script setup lang="ts">

import {useDropZone, useFileDialog} from "@vueuse/core";
import {filesize} from "filesize";

const addedFiles = ref<File[]>([]);
const dropZoneRef = ref<HTMLDivElement>();
let uploadStatus = ref<string>("idle");

const addedFileImages = ref<Map<string, string>>(new Map());

watch(addedFiles, (newAddedFiles, oldAddedFiles) => {
  for (let i = 0; i < newAddedFiles.length; i++) {
    const file = newAddedFiles[i];
    const fileName = file.name;
    const reader  = new FileReader();
    reader.onload = function(e)  {
      const result = e.target?.result;
      console.log(result);
      if(typeof(result) === "string") {
        const newMap = new Map<string, string>(addedFileImages.value);
        newMap.set(fileName, result);
        addedFileImages.value = newMap;
      }
    }
    reader.readAsDataURL(file);
  }
}, {deep: true});

function addFiles(files: File[] | FileList) {
  for (const file of files) {
    if(!addedFiles.value.some(f => f.name === file.name)) {
      addedFiles.value.push(file);
    }
  }
}

function removeFile(fileName: string) {
  const index = addedFiles.value.findIndex(f => f.name === fileName);
  if(index === -1) return;
  addedFiles.value.splice(index, 1);
}

async function upload() {
  const formData = new FormData();

  for (const file of addedFiles.value) {
    formData.append("file", file);
  }
  const response = await useFetch("/api/nugget", {
    method: "POST",
    body: formData,
  });

  uploadStatus = response.status;
}

function onDrop(files: File[] | null) {
  if(files) {
    addFiles(files);
  }
}

const { isOverDropZone } = useDropZone(dropZoneRef, {
  onDrop,
  multiple: true,
  preventDefaultForUnhandled: false,
})

const {open, files, reset, onChange, onCancel} = useFileDialog({
  accept: "*",
  directory: false,
})

onChange((files) => {
  if(files) {
    addFiles(files);
  }
});

const columns = [
  {
    cell: "preview",
    header: "Preview",
  },
  {
    cell: "name",
    header: "Name",
  },
  {
    cell: "size",
    header: "File Size",
  },
  {
    cell: "type",
    header: "Type",
  },
  {
    cell: "action",
    header: "",
  },
];

</script>

<template>
  <UCard>
    <template #header>
      <div class="flex justify-between items-center">
        <span class="text-xl">Direct upload</span>
        <UButton leading-icon="lucide:upload" @click="upload" :disabled="addedFiles.length === 0" :loading="uploadStatus === 'pending'">Upload {{ addedFiles.length }} file{{addedFiles.length === 1 ? '' : 's'}}</UButton>
      </div>
    </template>

    <div ref="dropZoneRef" class="rounded border border-gray-700 p-4" :class="{'border-primary border-dotted': isOverDropZone}">

      <UTable :rows="addedFiles">

<!--        <template #preview-data="{ row }">-->
<!--          <img class="max-w-40 max-h-20" v-if="addedFileImages.has(row.name)" :src="addedFileImages.get(row.name)" alt="Preview"/>-->
<!--        </template>-->

<!--        <template #size-data="{ row }">-->
<!--          {{ filesize(row.size) }}-->
<!--        </template>-->

<!--        <template #action-data="{ row }">-->
<!--          <UButton icon="lucide:minus" color="red" @click="() => removeFile(row.name)"/>-->
<!--        </template>-->

<!--        <template #empty-state>-->
<!--          <div class="grid place-items-center p-10 gap-5">-->
<!--            <span class="flex items-center gap-2"><UIcon name="lucide:file-plus-2" class="size-6"/> Drop files here</span>-->
<!--            <UDivider label="OR" size="sm" class="w-1/2" type="dashed"/>-->
<!--            <UButton leading-icon="lucide:plus" @click="open" variant="outline">Add files directly</UButton>-->
<!--          </div>-->
<!--        </template>-->

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