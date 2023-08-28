<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { storeToRefs } from 'pinia'
// components
import Confirm from 'src/components/dialog/confirmDialog'
// composables
import useNotify from 'src/composables/useNotify'
import useRules from 'src/composables/useRules'
// stores
import { useUidStore } from 'src/stores/uid.js'

// initializes
const { updateUid } = useUidStore()
const { notifyInfo, notifyError } = useNotify()
const { required } = useRules()
const $q = useQuasar()

// variables
const { uid } = storeToRefs(useUidStore())
const bridgeId = ref('')

const updateId = async () => {
  try {
    if (uid.value !== bridgeId.value) {
      const r = await API.onPromise({
        command: 'updateId',
        value: uid.value
      })
      if (r) {
        bridgeId.value = r
        uid.value = r
        notifyInfo(`Updated ID ${uid.value}`)
      }
    }
  } catch (error) {
    console.error(error)
    notifyError('Update ID failed')
  }
}

const confirmRefreshId = () => {
  $q.dialog({
    component: Confirm,
    componentProps: {
      title: 'Refresh ID?'
    }
  }).onOk(async () => {
    try {
      const r = await API.onPromise({ command: 'makeNewUid' })
      if (r) {
        bridgeId.value = r
        uid.value = r
        notifyInfo(`Updated ID ${uid.value}`)
      }
    } catch (error) {
      console.error(error)
      notifyError('Update ID failed')
    }
  })
}

onMounted(async () => {
  const id = await API.onPromise({ command: 'getId' })
  if (id) {
    uid.value = id
    bridgeId.value = id
  }
})
</script>

<template>
  <div class="row no-wrap justify-between">
    <div class="row no-wrap">
      <div class="text-bold sans-font q-mt-sm">ID</div>
      <q-icon
        class="cursor-pointer"
        style="margin: 10px 0px 0px 5px"
        name="refresh"
        size="18px"
        color="primary"
        @click="confirmRefreshId"
      >
      </q-icon>
    </div>
    <q-input
      v-model="uid"
      style="width: 50%; min-width: 300px"
      outlined
      dense
      :rules="[required]"
      lazy-rules
    >
      <template #append>
        <q-icon
          :class="uid === bridgeId ? 'disabled' : 'cursor-pointer'"
          name="check_circle"
          color="primary"
          @click="updateId"
        />
      </template>
    </q-input>
  </div>
</template>

<style scoped></style>
