<script setup>
import { storeToRefs } from 'pinia'
//store
import { useTTSstore } from 'src/stores/tts'

// initialize
const { voices, voice, rate, text } = storeToRefs(useTTSstore())
</script>

<template>
  <div class="q-gutter-y-sm">
    <q-select
      v-model="voice"
      :options="voices"
      option-label="name"
      option-value="id"
      map-options
      emit-value
      label="Voice"
      outlined
      dense
    />
    <q-input v-model="rate" dense type="number" label="Rate" outlined />
    <q-input v-model="text" filled type="textarea" label="Text" />
  </div>
</template>

<style scoped></style>
