<script setup>
import { ref, onMounted } from 'vue'

// variables
const current = ref('')

// functions
async function selectFolder() {
  current.value = await API.onPromise({ command: 'selectFolder' })
}
async function openFinder() {
  await API.onRequest({ command: 'openFinder', value: current.value })
}
// lifecycle hooks
onMounted(async () => {
  current.value = await API.onPromise({ command: 'getFolder' })
})
</script>

<template>
  <div class="row no-wrap justify-between">
    <div class="row no-wrap" style="min-width: 150px">
      <div class="text-bold sans-font q-mt-sm">Media Folder</div>
    </div>
    <div
      class="fit row no-wrap justify-end items-center"
      style="max-width: 50%"
    >
      <div class="cursor-pointer underline" @click="openFinder">
        {{ current }}
      </div>
      <q-btn
        round
        flat
        icon="folder"
        color="yellow-8"
        @click="selectFolder"
      ></q-btn>
    </div>
  </div>
</template>

<style scoped>
.underline {
  text-decoration: underline;
}
</style>
