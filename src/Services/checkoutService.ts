// src/services/productService.ts
import axios from 'axios'

interface HostedPage {
  hostedPageId: string
  url: string
}

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const createHostedPage = async (data): Promise<HostedPage[]> => {
  try {
    const requestData = {
      customer: {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        mobile: data.phone
      },
      plan: {
        plan_code: data.checkedItem.plan_code,
        price: data.checkedItem.recurring_price
      }
    }
    const response = await apiClient.post<HostedPage[]>('/hostedpages', requestData)
    console.log('creating hosted page data', response.data)
    //return response.data
  } catch (error) {
    throw new Error('Failed to creating hosted page')
  }
}

// // Example of transforming the response data
// const transformResponse = (data: Product[]): Product[] => {
//   return data
// }
