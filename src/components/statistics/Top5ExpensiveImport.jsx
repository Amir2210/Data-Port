import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import numeral from 'numeral'
import { useState } from 'react'
import { FormControl, InputLabel, MenuItem, Select, } from '@mui/material'
export function Top5ExpensiveImport({ year, data }) {
  const [count, setCount] = useState(5)

  const sortedByAmount = [...data]
    .filter(row => parseFloat(row.NISCurrencyAmount))
    .sort((a, b) => parseFloat(b.NISCurrencyAmount) - parseFloat(a.NISCurrencyAmount))

  const top5ExpensiveImports = sortedByAmount.slice(0, count)

  const columns = [
    { field: '_id', headerName: 'ID', width: 100 },
    { field: 'Year', headerName: 'שנה', width: 110 },
    { field: 'Month', headerName: 'חודש', width: 110 },
    { field: 'Origin_Country', headerName: 'מדינת מקור', width: 160 },
    {
      field: 'Quantity', headerName: 'כמות', width: 120, valueFormatter: (params) => {
        if (!params) return ''
        return (+params).toLocaleString()
      }
    },
    {
      field: 'NISCurrencyAmount', headerName: 'שווי בש"ח', width: 150, valueFormatter: (params) => {
        if (!params) return ''
        return numeral(+params).format('0.[0]aa') + '₪'
      }
    },
    { field: 'CurrencyCode', headerName: 'קוד מטבע', width: 150 },
  ]

  return (
    <div className='flex flex-col items-center'>
      <h2 className='text-4xl text-center text-blue-600 font-bold py-2 underline'>נתונים נוספים וחריגים</h2>
      <div className='my-3 min-w-96'>
        <FormControl fullWidth>
          <InputLabel className='!text-lg'>פריטים</InputLabel>
          <Select
            className='!font-bold'
            label="count"
            onChange={(ev) => setCount(ev.target.value)}
            value={count}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
          </Select>
        </FormControl>
      </div>
      <h2 className='text-xl text-stone-800 font-bold text-center mt-4' dir='rtl'>{count} היבואנים עם השווי היקר ביותר בשנת {year}</h2>
      <Box sx={{ height: 560, width: '60%', p: 2 }}>
        <DataGrid

          sx={{
            '& .MuiDataGrid-row:nth-of-type(odd)': {
              backgroundColor: '#F5F5F5',
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: '#DFF2EB',
            },
            '& .MuiDataGrid-cell': {
              textAlign: 'center',
              justifyContent: 'center',
              display: 'flex',
              alignItems: 'center',
              fontSize: '1rem',
            },
            '& .MuiDataGrid-columnHeader': {
              fontWeight: 'bold',
              fontSize: '1.1rem',
              textAlign: 'center',
              justifyContent: 'center',
              display: 'flex',
              alignItems: 'center',
            },
            '& .MuiDataGrid-columnHeaderTitleContainer': {
              display: 'flex',
              justifyContent: 'center',
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              width: '100%',
              textAlign: 'center',
              justifyContent: 'center',
              display: 'flex',
              alignItems: 'center',
              fontWeight: 'bold',
            },
          }}
          rows={top5ExpensiveImports.map((row, index) => ({ id: index, ...row }))}
          columns={columns}
          pageSize={10}
        />
      </Box>
    </div>
  )
}