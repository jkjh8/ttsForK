<script setup>
import { ref, onMounted, computed } from 'vue'
import { useQuasar } from 'quasar'
import { storeToRefs } from 'pinia'
// components
import TTSParams from 'src/components/tts/ttsParams'
import PreviewDialog from 'src/components/dialog/previewDialog'
// store
import { useTTSstore } from 'src/stores/tts.js'
// initialize
const { updateTtsInfo, makeFile } = useTTSstore()
const $q = useQuasar()
// const options = ref([])

async function openPreview() {
  const src = await makeFile()
  if (src && src.filename) {
    $q.dialog({
      component: PreviewDialog,
      componentProps: {
        src: `local://${src.filename}`
      }
    }).onOk(() => {
      API.onRequest({ command: 'removeFile', file: src.filename })
    })
  }
}

onMounted(async () => {
  await updateTtsInfo('ttsGetInfo')
})
</script>

<template>
  <q-card style="min-width: 400px">
    <q-card-section>
      <div class="row no-wrap justify-between items-center">
        <div>TTS</div>
        <q-btn
          flat
          round
          color="primary"
          icon="refresh"
          @click="updateTtsInfo('refreshTtsInfo')"
        />
      </div>
    </q-card-section>
    <q-card-section>
      <TTSParams />
    </q-card-section>
    <q-card-actions align="right">
      <q-btn round flat icon="volume_up" color="primary" @click="openPreview" />
    </q-card-actions>
  </q-card>
</template>

<style scoped></style>
