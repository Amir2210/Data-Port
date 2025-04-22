export const importData = {
  fetchData
}

async function fetchData(year) {
  const url = 'https://data.gov.il/api/3/action/datastore_search?resource_id=80c1e38e-06b9-4a67-b2a4-cc1a76374ee9&'
  try {
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error("Failed to fetch")
    }
    const json = await res.json()
    return json.result.records
  } catch (error) {
    throw error
  }
}