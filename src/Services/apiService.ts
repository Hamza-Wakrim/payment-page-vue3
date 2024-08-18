// src/services/apiService.ts
import axios from 'axios'

// Create an Axios instance
const apiClient = axios.create({
  baseURL: 'https://api.yourdomain.com', // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request Transformer
apiClient.interceptors.request.use((config) => {
  if (config.data) {
    config.data = requestTransformer(config.data)
  }
  return config
})

// Response Transformer
apiClient.interceptors.response.use(
  (response) => {
    if (response.data) {
      response.data = responseTransformer(response.data)
    }
    return response
  },
  (error) => {
    // Handle errors globally if needed
    return Promise.reject(error)
  }
)

// Request transformer function
function requestTransformer(data: any) {
  // Example: Convert camelCase to snake_case
  const transformedData = {}
  for (const key in data) {
    transformedData[camelToSnake(key)] = data[key]
  }
  return transformedData
}

// Response transformer function
function responseTransformer(data: any) {
  // Example: Convert snake_case to camelCase
  const transformedData = {}
  for (const key in data) {
    transformedData[snakeToCamel(key)] = data[key]
  }
  return transformedData
}

// Helper functions for case conversion
function camelToSnake(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
}

function snakeToCamel(str: string): string {
  return str.replace(/(_\w)/g, (matches) => matches[1].toUpperCase())
}

export default apiClient
