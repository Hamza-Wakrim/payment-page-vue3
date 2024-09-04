<!-- eslint-disable vue/no-mutating-props -->
<script setup lang="ts">
import { reactive } from 'vue'

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
</script>

<template>
  <v-row class="pt-4">
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
        label="Street Address"
        placeholder="Street Address"
        color="primary"
        variant="outlined"
        type="text"
        v-model="data.address"
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
        label="Phone"
        placeholder="Phone"
        color="primary"
        variant="outlined"
        type="text"
        v-model="data.phone"
      ></v-text-field>
    </v-col>
    <v-col cols="4">
      <v-select
        label="Country"
        placeholder="Country"
        color="primary"
        variant="outlined"
        v-model="data.country"
        :items="['USA']"
        :menu-props="{ closeOnContentClick: false }"
      ></v-select>
    </v-col>
  </v-row>
</template>
