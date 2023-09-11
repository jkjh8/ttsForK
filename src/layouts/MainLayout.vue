<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
// components
import HomeLogo from 'src/components/layouts/homeLogo'
import ToolbarLinks from 'src/components/layouts/toolbarLinks'
// composables
// stores
import { useOnlineStore } from 'src/stores/online'
import { useUidStore } from 'src/stores/uid'
import { useTTSstore } from 'src/stores/tts'

const { updateOnline } = useOnlineStore()
const { updateUid } = useUidStore()
const { voices, voice, rate } = storeToRefs(useTTSstore())
// computed
// Variables
// Functions

onMounted(() => {
  window.addEventListener('resize', () => {
    //
    API.windowSizePosition({
      height: window.outerHeight,
      width: window.outerWidth
    })
  })

  API.onResponse((args) => {
    switch (args.key) {
      case 'connect':
        updateOnline(args.value)
        break
      case 'updateUid':
        updateUid(args.value)
        break
      case 'tts':
        console.log(args)
        voices.value = args.value.voices
        rate.value = args.value.rate
        voice.value = args.value.voice
      default:
        console.log(args)
        break
    }
  })
  API.onRequest({ command: 'started' })
})
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="header">
      <div class="row no-wrap full-height justify-between items-center">
        <HomeLogo />
        <ToolbarLinks />
      </div>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style scope></style>
