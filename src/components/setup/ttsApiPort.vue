<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
// composables
import useNotify from 'src/composables/useNotify'
import useRules from 'src/composables/useRules'
// stores
import { useAPIServerStore } from '/src/stores/apiServer'

// initialize
const { notifyInfo, notifyError } = useNotify()
const { required } = useRules()
const { port, startAtOpen } = storeToRefs(useAPIServerStore())
const { updateValues, getValues } = useAPIServerStore()
// variables
const current = ref(9999)

async function update() {
  $q.loading.show()
  await updateValues()
  $q.loading.hide()
  current.value = port.value
  notifyInfo('updated')
}

onMounted(async () => {
  await getValues()
  current.value = port.value
})
</script>

<template>
  <div class="row no-wrap justify-between">
    <div class="text-bold sans-font q-mt-sm">API Server Port</div>
    <q-input
      v-model="port"
      style="width: 50%; min-width: 300px"
      outlined
      dense
      :rules="[required]"
      lazy-rules
    >
      <template #append>
        <q-icon
          :class="current === port ? 'disabled' : 'cursor-pointer'"
          name="check_circle"
          color="primary"
          @click="update"
        />
      </template>
    </q-input>
  </div>
</template>

<style scoped></style>
