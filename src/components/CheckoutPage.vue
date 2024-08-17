<script setup lang="ts">
import { ref, watch, computed } from 'vue'

const props = defineProps<{
  selectedItem: {
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

// const emit = defineEmits(['update:data'])

// const checkedItemId = ref<object | null>(props.data.checkedItem || null)

// // Computed property for selected item
// const selectedItem = computed(() => props.items.find((item) => item.id === checkedItemId.value))

// watch(checkedItemId, (newId) => {
//   const item = props.items.find((item) => item.id === newId)
//   if (item) {
//     emit('update:data', { checkedItem: item, price: item.price })
//   }
// })
</script>

<template>
  <v-row class="pb-4">
    <v-col cols="4"> </v-col>
  </v-row>
  <v-row class="pb-4">
    <v-col cols="4"> </v-col>
  </v-row>
</template>
