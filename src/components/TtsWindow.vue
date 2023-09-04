<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
// store
import { useTTSstore } from 'src/stores/tts.js'

const { voices, voice, rate } = storeToRefs(useTTSstore())
const options = ref([])

const refreshTts = () => {
  API.onRequest({ command: 'refreshTts' })
}
</script>

<template>
  <q-card style="min-width: 400px">
    <q-card-section>
      <div class="row no-wrap justify-between items-center">
        <div>TTS</div>
        <q-btn flat round color="primary" icon="refresh" @click="refreshTts" />
      </div>
    </q-card-section>
    <q-card-section>
      <q-select
        v-model="voice"
        :options="voices"
        option-label="name"
        map-options
        label="Voice"
      />
      <q-input v-model="rate" type="number" label="Rate" />
    </q-card-section>
  </q-card>
</template>

<style scoped></style>
