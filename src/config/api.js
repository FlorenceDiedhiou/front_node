export const API_URL =  import.meta.env.VITE_API_URL 

export const fetchApi = async (path, options = {}) => {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 10000)

  try {
    return await fetch(`${API_URL}${path}`, {
      ...options,
      signal: controller.signal,
    })
  } finally {
    clearTimeout(timeoutId)
  }
}

export const readApiResponse = async (response) => {
  const text = await response.text()

  if (!text) return {}

  try {
    return JSON.parse(text)
  } catch {
    return { message: text }
  }
}
