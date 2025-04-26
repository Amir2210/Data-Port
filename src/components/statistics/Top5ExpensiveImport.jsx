import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
export function Top5ExpensiveImport({ top5ExpensiveImports, year, columns }) {
  return (
    <div>
      <h2 className='text-4xl text-center text-blue-600 font-bold py-2 underline'>נתונים נוספים וחריגים</h2>
      <h2 className='text-xl text-stone-800 font-bold text-center mt-4' dir='rtl'>5 היבואים הכי יקרים בשנת {year}</h2>
      <Box sx={{ height: 560, width: '100%', p: 2 }}>
        <DataGrid
          rows={top5ExpensiveImports.map((row, index) => ({ id: index, ...row }))}
          columns={columns}
          pageSize={10}
        />
      </Box>
    </div>
  )
}