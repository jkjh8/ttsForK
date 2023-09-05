<script setup>
import { ref, onMounted, computed } from 'vue'
import { useQuasar } from 'quasar'
import { storeToRefs } from 'pinia'
// store
import { useTTSstore } from 'src/stores/tts.js'
// init
const { voices, voice, rate, text, selectedLanguage } = storeToRefs(
  useTTSstore()
)
const $q = useQuasar()
// const options = ref([])
const options = computed(() => useTTSstore().getVoices())
const refreshTts = async (command) => {
  $q.loading.show()
  await useTTSstore().updateTtsInfo(command)
  $q.loading.hide()
}

onMounted(async () => {
  await refreshTts('ttsGetInfo')
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
          @click="refreshTts('refreshTtsInfo')"
        />
      </div>
    </q-card-section>
    <q-card-section>
      <div class="q-gutter-y-sm">
        <q-select
          v-model="voice"
          :options="options"
          option-label="name"
          option-value="id"
          map-options
          emit-value
          label="Voice"
          outlined
        />
        <q-select
          v-model="selectedLanguage"
          :options="[
            { label: 'ALL', value: '' },
            { label: 'Korean', value: 'ko_KR' },
            { label: 'English', value: 'en_US' },
            { label: 'Japanese', value: 'ja_JP' }
          ]"
          emit-value
          map-options
          label="Language"
          outlined
        />
        <q-input v-model="rate" type="number" label="Rate" outlined />
        <q-input v-model="text" filled type="textarea" label="type to text" />
      </div>
    </q-card-section>
    <q-card-actions align="right">
      <q-btn round flat icon="save" color="primary" />
      <q-btn round flat icon="volume_up" color="primary" />
    </q-card-actions>
  </q-card>
</template>

<style scoped></style>
