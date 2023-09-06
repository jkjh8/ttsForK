<script setup>
import { ref, onMounted } from 'vue'
import useClipboard from 'vue-clipboard3'
// composables
import useNotify from 'src/composables/useNotify'
import useRules from 'src/composables/useRules'

// initialized
const { notifyInfo, notifyError } = useNotify()
const { required } = useRules()
const { toClipboard } = useClipboard()

const current = ref('http://localhost')
const serverAddress = ref('http://localhost')

const updateServerAddress = async () => {
  try {
    if (current.value !== serverAddress.value) {
      const r = await API.onPromise({
        command: 'updateServerAddress',
        value: current.value
      })
      if (r) {
        serverAddress.value = current.value
        notifyInfo('updated server address')
      }
    }
  } catch (err) {
    console.error(err)
    notifyError('update server address failed')
  }
}
// clipboard copy
async function clipboardCopy() {
  await toClipboard(current.value)
  notifyInfo('copy to clipboard')
}

onMounted(async () => {
  const addr = await API.onPromise({ command: 'getAddress' })
  if (addr) {
    current.value = addr
    serverAddress.value = addr
  }
})
</script>

<template>
  <div class="row no-wrap justify-between">
    <div class="text-bold sans-font q-mt-sm">Server Address</div>
    <q-input
      v-model="current"
      style="width: 50%; min-width: 300px"
      outlined
      dense
      :rules="[required]"
      lazy-rules
    >
      <template #append>
        <div class="row no-wrap items-center q-gutter-x-sm">
          <q-icon
            class="cursor-pointer"
            name="content_copy"
            color="primary"
            size="xs"
            @click="clipboardCopy"
          >
            <q-tooltip>Copy</q-tooltip>
          </q-icon>
          <q-icon
            :class="current === serverAddress ? 'disabled' : 'cursor-pointer'"
            name="check_circle"
            color="primary"
            @click="updateServerAddress"
          >
            <q-tooltip>Apply</q-tooltip>
          </q-icon>
        </div>
      </template>
    </q-input>
  </div>
</template>

<style scoped></style>
