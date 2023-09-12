<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { storeToRefs } from 'pinia'
// composables
import useNotify from '/src/composables/useNotify.js'

// stores
import { useAPIServerStore } from '/src/stores/apiServer'

// initialize
const { port, startAtOpen } = storeToRefs(useAPIServerStore())
const { updateValues, getValues } = useAPIServerStore()
const { notifyInfo } = useNotify()

const $q = useQuasar()
const serverStartOpen = ref(false)

async function update() {
  $q.loading.show()
  await updateValues()
  $q.loading.hide()
  notifyInfo('Updated')
}

onMounted(async () => {
  await getValues()
})
</script>

<template>
  <div class="row no-wrap justify-between">
    <div class="text-bold sans-font q-mt-sm">Start on API Server</div>
    <q-toggle v-model="startAtOpen" @update:model-value="update" />
  </div>
</template>

<style scoped></style>
