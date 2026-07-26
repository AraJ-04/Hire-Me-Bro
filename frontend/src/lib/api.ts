const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export async function getJson(path: string) {
  const res = await fetch(`${API_BASE}${path}`)
  return res.json()
}
