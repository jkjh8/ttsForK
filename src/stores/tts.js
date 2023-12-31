import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useQuasar } from 'quasar'
import useNotify from 'src/composables/useNotify'

export const useTTSstore = defineStore('tts', () => {
  const { notifyError } = useNotify()
  const $q = useQuasar()
  const rate = ref(200)
  const voice = ref(null)
  const voices = ref(null)
  const text = ref('')
  const selectedLanguage = ref('')

  async function updateTtsInfo() {
    $q.loading.show()
    const r = await API.onPromise({ command: 'ttsGetInfo' })
    if (r && r.voice) {
      voice.value = r.voice
    }
    if (r && r.voices) {
      voices.value = r.voices
    }
    if (r && r.rate) {
      rate.value = r.rate
    }
    $q.loading.hide()
  }

  async function makeFile() {
    if (!text.value) {
      notifyError('Please enter your message ')
      return false
    }
    $q.loading.show()
    const r = await API.onPromise({
      command: 'ttsMakeFile',
      voice: voice.value,
      rate: rate.value,
      message: text.value
    })
    $q.loading.hide()
    return r
  }

  return {
    rate,
    voices,
    voice,
    text,
    selectedLanguage,
    updateTtsInfo,
    makeFile
  }
})
