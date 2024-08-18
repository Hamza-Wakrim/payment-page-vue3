<!-- eslint-disable vue/no-mutating-props -->
<script setup lang="ts">
import { ref, watch, computed } from 'vue'

defineProps<{
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
  <v-row class="pt-4">
    <v-col cols="4">
      <v-text-field
        label="Email address"
        placeholder="johndoe@gmail.com"
        color="primary"
        variant="outlined"
        type="email"
        v-model="data.email"
      ></v-text-field>
    </v-col>
    <v-col cols="4">
      <v-text-field
        label="First Name"
        placeholder="First Name"
        color="primary"
        variant="outlined"
        type="text"
        v-model="data.firstName"
      ></v-text-field>
    </v-col>
    <v-col cols="4">
      <v-text-field
        label="Last Name"
        placeholder="Last Name"
        color="primary"
        variant="outlined"
        type="text"
        v-model="data.lastName"
      ></v-text-field>
    </v-col>
    <v-col cols="4">
      <v-text-field
        label="Phone"
        placeholder="Phone"
        color="primary"
        variant="outlined"
        type="text"
        v-model="data.phone"
      ></v-text-field>
    </v-col>
    <v-col cols="4">
      <v-text-field
        label="Country"
        placeholder="Country"
        color="primary"
        variant="outlined"
        type="text"
        v-model="data.country"
      ></v-text-field>
    </v-col>
    <v-col cols="4">
      <v-text-field
        label="State"
        placeholder="State"
        color="primary"
        variant="outlined"
        type="text"
        v-model="data.state"
      ></v-text-field>
    </v-col>
    <v-col cols="4">
      <v-text-field
        label="City"
        placeholder="City"
        color="primary"
        variant="outlined"
        type="text"
        v-model="data.city"
      ></v-text-field>
    </v-col>
    <v-col cols="4">
      <v-text-field
        label="Zip Code"
        placeholder="Zip Code"
        color="primary"
        variant="outlined"
        type="text"
        v-model="data.zip"
      ></v-text-field>
    </v-col>
    <v-col cols="4">
      <v-text-field
        label="Address 1"
        placeholder="Address 1"
        color="primary"
        variant="outlined"
        type="text"
        v-model="data.address"
      ></v-text-field>
    </v-col>
  </v-row>
</template>
