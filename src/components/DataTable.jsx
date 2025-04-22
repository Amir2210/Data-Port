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
    <h1>data</h1>
  )
}