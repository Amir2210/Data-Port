export const importData = {
  fetchData
}

async function fetchData(year) {
  switch (year) {
    case '2022':
      year = '72c85505-0453-4f3c-be5f-cf23c930f47b'
      break;
    case '2023':
      year = '34a7dab2-c1a1-4634-9a95-3d1da2453471'
      break;
    case '2024':
      year = '6d3b03e1-de9c-42a8-bb08-91ba564c2f34'
      break;
    case '2025':
      year = '80c1e38e-06b9-4a67-b2a4-cc1a76374ee9'
      break;
    default:
      // default year 2025
      year = '80c1e38e-06b9-4a67-b2a4-cc1a76374ee9'
      break;
  }
  const url = `https://data.gov.il/api/3/action/datastore_search?resource_id=${year}`
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