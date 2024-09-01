<script setup lang="ts">
import Items from '../components/Items.vue'
import UserInformationPage from '../components/UserInformationPage.vue'
import CheckoutPage from '../components/CheckoutPage.vue'
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { fetchProducts } from '@/services/productService'
import { createHostedPage } from '@/services/checkoutService'

const router = useRouter()

const step = ref(1)
const dummyData = reactive([])
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

onMounted(async () => {
  try {
    const products = await fetchProducts()
    dummyData.push(...products.data)
  } catch (error) {
    console.error(error)
  }
})

// Event handler to update cartData from the child component
const updateCartData = (newData: { checkedItem: object; price: number }) => {
  cartData.checkedItem = newData.checkedItem
  cartData.price = newData.price
}

const nextStep = () => {
  if (step.value < 3) step.value += 1
}

const prevStep = () => {
  if (step.value > 1) step.value -= 1
}

const hostedPageStep = async () => {
  const hostedPage = await createHostedPage(cartData)
  if (step.value < 3) step.value += 1
}

const goToProductPage = (planCode: string) => {
  router.push({ name: 'ProductPage', params: { id: planCode } })
}
</script>

<template>
  <v-app>
    <v-app-bar app color="#FAFAFA" dark>
      <v-col class="pl-4">
        <v-img
          src="src/assets/logo.png"
          alt="Logo"
          contain
          width="15%"
          height="70%"
          class="mr-3"
        ></v-img>
      </v-col>
    </v-app-bar>

    <v-main>
      <v-row>
        <v-col
          lg="3"
          cols="4"
          md="3"
          xs="6"
          class="pb-4"
          v-for="item in dummyData"
          :key="item?.plan_code"
        >
          <v-card class="mx-auto" width="100%" height="100%" levation="2">
            <!-- Dynamic Image Section -->
            <v-img
              :src="item.image || 'src/assets/logo.png'"
              aspect-ratio="1.5"
              class="image-cover"
              contain
            ></v-img>

            <!-- Title Section -->
            <v-card-title class="py-2">{{ item.name }}</v-card-title>

            <!-- Subtitle Section -->
            <v-card-subtitle class="py-1">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry's standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book. It has
              survived not only five centuries
            </v-card-subtitle>

            <!-- Actions Section -->
            <v-card-actions class="justify-space-between py-2">
              <v-btn color="blue-lighten-1" @click="goToProductPage(item.plan_code)">
                Discover
              </v-btn>
              <h3>
                <b>${{ item.recurring_price }}</b
                >/Month
              </h3>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <!-- <v-stepper
        hide-actions
        alt-labels
        v-model="step"
        :items="['Products', 'User Information', 'Checkout']"
      >
        <template v-slot:item.1>
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
          <v-card flat>
            <UserInformationPage :data="cartData" />

            <v-card-actions class="justify-end">
              <v-row d-flex class="pt-3">
                <v-col cols="6">
                  <v-btn variant="outlined" width="18%" rounded="lg" @click="prevStep">Back</v-btn>
                </v-col>
                <v-col cols="6" style="justify-content: end; display: flex">
                  <v-btn
                    v-if="cartData.firstName"
                    variant="outlined"
                    width="50%"
                    color="primary"
                    rounded="lg"
                    @click="hostedPageStep"
                    >Go Checkout</v-btn
                  >
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </template>

        <template v-slot:item.3>
          <v-card flat>
            <CheckoutPage :data="cartData" />

            <v-card-actions class="justify-end">
              <v-row d-flex class="pt-3">
                <v-col cols="6">
                  <v-btn variant="outlined" width="18%" rounded="lg" @click="prevStep">Back</v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </template>
      </v-stepper> -->
    </v-main>
  </v-app>
</template>

<style scoped>
.image-cover {
  height: 200px;
  object-fit: contain;
  border-bottom: 1px solid #e0e0e0;
}

.v-card-title {
  font-size: 1.25rem;
  font-weight: bold;
}

.v-card-subtitle {
  font-size: 0.875rem;
  color: gray;
}

.v-card-actions {
  padding: 8px;
}
</style>
