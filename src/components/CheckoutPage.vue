<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import axios from 'axios'

const props = defineProps<{
  data: {
    checkedItem: object
    price: number
    firstName: string
    lastName: string
    zip: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    country: string
  }
}>()

const iframeUrl = ref(props.data.checkedItem.url)

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})
const checkIframeStatus = async () => {
  // Example: Check some status or endpoint related to the iframe
  try {
    const response = await apiClient.get('/authZoho')
    console.log('worked', response)
  } catch (error) {
    console.error('Polling Error:', error)
  }
}

onMounted(() => {
  const interval = setInterval(checkIframeStatus, 7000) // Poll every 5 seconds
  onUnmounted(() => clearInterval(interval))
})
</script>

<template>
  <v-row class="pt-4">
    <iframe width="100%" height="900px" :src="iframeUrl"></iframe>
  </v-row>
</template>
