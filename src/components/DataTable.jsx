import { useState } from 'react';
import { importData } from '../api/importData'
import { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';
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

  const columns = [
    { field: '_id', headerName: 'ID', width: 70 },
    { field: 'Year', headerName: 'שנה', width: 100 },
    { field: 'Month', headerName: 'חודש', width: 100 },
    { field: 'Origin_Country', headerName: 'מדינת מקור', width: 150 },
    { field: 'CustomsItem_8_Digits', headerName: 'פריט מכס (8 ספרות)', width: 180 },
    { field: 'Quantity', headerName: 'כמות', width: 120 },
    { field: 'Quantity_MeasurementUnitName', headerName: 'יחידת מידה', width: 150 },
    { field: 'CurrencyCode', headerName: 'מטבע', width: 100 },
    { field: 'NISCurrencyAmount', headerName: 'שווי בש"ח', width: 150 },
  ];

  return (
    <Box sx={{ height: 600, width: '100%', p: 2 }}>
      <Typography variant="h5" gutterBottom>יבוא לישראל</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <DataGrid
        rows={data}
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={10}
        rowsPerPageOptions={[10, 25, 50]}
      />
    </Box>
  );
}