import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import numeral from 'numeral'
export function Top5ExpensiveImport({ top5ExpensiveImports, year }) {

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
      <h2 className='text-xl text-stone-800 font-bold text-center mt-4' dir='rtl'>5 היבואנים עם השווי היקר ביותר בשנת {year}</h2>
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