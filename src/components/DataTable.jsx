import { useState } from 'react';
import { importData } from '../api/importData'
import { useEffect } from 'react';
export function DataTable() {
  const [data, setData] = useState([])
  const [error, setError] = useState("")

  useEffect(() => {
    async function getData() {
      try {
        const records = await importData.fetchData()
        setData(records)
      } catch (err) {
        setError(err.message || "Unknown error")
      }
    }
    getData()
  }, [])



  console.log('data:', data)
  return (
    <div>
      <h1>יבוא לישראל</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}