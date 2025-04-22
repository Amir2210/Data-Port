export const importData = {
  fetchData
}

async function fetchData() {
  try {
    const res = await fetch('https://data.gov.il/api/3/action/datastore_search?resource_id=80c1e38e-06b9-4a67-b2a4-cc1a76374ee9&limit=5')
    if (!res.ok) throw new Error("Failed to fetch data");
    const data = await res.json()
    return data
  } catch (error) {
    console.log('error:', error)
    alert(error)
  }
}