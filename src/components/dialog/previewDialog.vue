<script setup>
import { useQuasar, useDialogPluginComponent } from 'quasar'
// dialog functions
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent()
// props
const props = defineProps({ src: String })
// emit
const emit = defineEmits([...useDialogPluginComponent.emits])
</script>

<template>
  <q-dialog ref="dialogRef" @hide="onDialogOK">
    <div>{{ src }}</div>
    <audio controls autoplay @ended="onDialogOK">
      <source :src="src" type="audio/wav" />
    </audio>
  </q-dialog>
</template>

<style>
.confirmDialog {
  max-width: 300px;
  min-width: 200px;
  border-radius: 0.5rem;
}
</style>
