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

  async function updateTtsInfo(command) {
    $q.loading.show()
    const r = await API.onPromise({ command })
    voice.value = r.voice
    voices.value = r.voices
    rate.value = r.rate
    $q.loading.hide()
  }

  async function makeFile() {
    if (!text.value) {
      notifyError('Please enter your message ')
      return false
    }
    const r = await API.onPromise({
      command: 'ttsMakeFile',
      voice: voice.value,
      rate: rate.value,
      message: text.value
    })
    console.log(r)
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
