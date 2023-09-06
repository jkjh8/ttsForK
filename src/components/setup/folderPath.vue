<script setup>
import { ref, onMounted } from 'vue'

// variables
const current = ref('')

// functions
async function selectFolder() {
  const r = await API.onPromise({ command: 'selectFolder' })
  current.value = r
}

// lifecycle hooks
onMounted(async () => {
  const r = await API.onPromise({
    command: 'getFolder'
  })
  current.value = r
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
      <div>{{ current }}</div>
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

<style scoped></style>
