<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import { useAPIServerStore } from '/src/stores/apiServer'

const { port, startAtOpen } = storeToRefs(useAPIServerStore())
const { updateValues, getValues } = useAPIServerStore()

const serverStartOpen = ref(false)

onMounted(async () => {
  await getValues()
})
</script>

<template>
  <div class="row no-wrap justify-between">
    <div class="text-bold sans-font q-mt-sm">API Server Port</div>
    <q-toggle v-model="startAtOpen" @update:model-value="updateValues" />
  </div>
</template>

<style scoped></style>
