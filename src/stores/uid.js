import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUidStore = defineStore('uid', () => {
  const uid = ref(false)

  function updateUid(value) {
    uid.value = value
  }

  return { uid, updateUid }
})
