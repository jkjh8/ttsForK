<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
// store
import { useTTSstore } from 'src/stores/tts.js'

const { voices, voice, rate, text } = storeToRefs(useTTSstore())
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
      <div class="q-gutter-y-sm">
        <q-select
          v-model="voice"
          :options="voices"
          option-label="name"
          option-value="id"
          map-options
          emit-value
          label="Voice"
        />
        <q-input v-model="rate" type="number" label="Rate" />
        <q-input v-model="text" filled type="textarea" label="type to text" />
      </div>
    </q-card-section>
  </q-card>
</template>

<style scoped></style>
