<script setup lang="ts">
import Items from '../components/Items.vue'
import { ref, reactive } from 'vue'

const step = ref(1)
const dummyData = reactive([
  { id: 1, name: 'Item 1', price: 10, checked: true },
  { id: 2, name: 'Item 2', price: 10, checked: false },
  { id: 3, name: 'Item 3', price: 10, checked: false },
  { id: 4, name: 'Item 4', price: 10, checked: false }
])
const cartData = reactive({
  checkedItem: null as object | null,
  price: null as number | null,
  firstName: null as string | null,
  lastName: null as string | null,
  zip: null as string | null,
  email: null as string | null,
  phone: null as string | null,
  address: null as string | null,
  city: null as string | null,
  state: null as string | null,
  country: null as string | null
})

// Event handler to update cartData from the child component
const updateCartData = (newData: { checkedItem: number; price: number }) => {
  cartData.checkedItem = newData.checkedItem
  cartData.price = newData.price
}

const nextStep = () => {
  if (step.value < 2) step.value += 1
}

const prevStep = () => {
  if (step.value > 1) step.value -= 1
}

const finish = () => {
  alert('Checkout Complete!')
  // Add any additional actions here (e.g., submitting data to the server)
}
</script>

<template>
  <v-stepper hide-actions alt-labels v-model="step" :items="['Products', 'Checkout']">
    <template v-slot:item.1>
      <!-- Pass the reactive dummyData and handle the emitted event -->
      <Items :items="dummyData" :data="cartData" @update:data="updateCartData" />
      <v-card-actions class="justify-end">
        <v-btn
          v-if="cartData.checkedItem"
          variant="outlined"
          width="14%"
          color="primary"
          rounded="lg"
          @click="nextStep"
          >Next</v-btn
        >
      </v-card-actions>
    </template>

    <template v-slot:item.2>
      <v-card title="Step Two" flat>
        <!-- Displaying cartData -->
        <div>card data: {{ cartData }}</div>

        <CheckoutPage />
        <v-card-actions class="justify-end">
          <v-row d-flex class="pt-3">
            <v-col cols="6">
              <v-btn variant="outlined" width="18%" rounded="lg" @click="prevStep">Back</v-btn>
            </v-col>
            <v-col cols="6" style="justify-content: end; display: flex">
              <v-btn variant="outlined" width="18%" color="primary" rounded="lg" @click="finish"
                >Finish</v-btn
              >
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </template>
  </v-stepper>
</template>
