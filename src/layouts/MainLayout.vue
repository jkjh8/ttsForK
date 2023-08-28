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

const { updateOnline } = useOnlineStore()
const { updateUid } = useUidStore()
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
      default:
        console.log(args)
        break
    }
  })
  API.onRequest({ command: 'connect' })
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
