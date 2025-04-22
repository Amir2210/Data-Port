import { useState } from 'react';
import { importData } from '../api/importData'
import { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';
export function DataTable() {
  const [data, setData] = useState([])
  const [error, setError] = useState("")
  const [year, setYear] = useState(2025)

  useEffect(() => {
    async function getData() {
      try {
        const records = await importData.fetchData(year)
        setData(records)
      } catch (err) {
        setError(err.message || "Unknown error")
      }
    }
    getData()
  }, [year])

  const columns = [
    { field: 'Year', headerName: 'שנה', width: 90 },
    { field: 'Month', headerName: 'חודש', width: 90 },
    { field: 'Origin_Country', headerName: 'מדינת מקור', width: 150 },
    { field: 'CustomsItem_2_Digits', headerName: 'פריט מכס (2 ספרות)', width: 150 },
    { field: 'CustomsItem_8_Digits', headerName: 'פריט מכס (8 ספרות)', width: 150 },
    { field: 'Exempt_CustomsItem', headerName: 'פטור ממכס', width: 130 },
    { field: 'CustomsHouse', headerName: 'בית מכס', width: 120 },
    { field: 'Quantity', headerName: 'כמות', width: 120 },
    { field: 'Quantity_MeasurementUnitID', headerName: 'קוד יחידת מידה', width: 140 },
    { field: 'Quantity_MeasurementUnitName', headerName: 'שם יחידת מידה', width: 150 },
    { field: 'TradeAgreementName', headerName: 'הסכם סחר', width: 180 },
    { field: 'TermsOfSale', headerName: 'תנאי מכירה', width: 150 },
    { field: 'IsTradeAgreementWithQuota', headerName: 'האם הסכם סחר עם מכסה', width: 200 },
    { field: 'NISCurrencyAmount', headerName: 'שווי בש"ח', width: 130 },
    { field: 'CurrencyCode', headerName: 'קוד מטבע', width: 100 },
    { field: 'AutonomyTypeID', headerName: 'קוד אוטונומיה', width: 130 },
    { field: 'AutonomyType', headerName: 'סוג אוטונומיה', width: 150 },
    { field: 'GovernmentProcedureTypeName', headerName: 'תהליך ממשלתי (עברית)', width: 180 },
    { field: 'GovernmentProcedureTypeEnglishName', headerName: 'תהליך ממשלתי (אנגלית)', width: 200 },
    { field: 'IsPreferenceDocument', headerName: 'יש מסמך העדפה', width: 160 },
    { field: 'GeneralCustomsTax', headerName: 'מס מכס כללי', width: 150 },
    { field: 'PurchaseTax', headerName: 'מס קניה', width: 120 },
    { field: 'VAT', headerName: 'מע״מ', width: 100 },
  ];

  return (
    <div>
      <h1 className='text-4xl text-stone-800 font-bold font-mono text-center pt-2'>יבוא לישראל לשנת <span>{year}</span></h1>
      <Box sx={{ height: 600, width: '100%', p: 2 }}>
        <div className='flex gap-10'>
          <select name='year' className="" onChange={(ev) => setYear(ev.target.value)}>
            <option>2025</option>
            <option>2024</option>
            <option>2023</option>
            <option>2022</option>
          </select>
        </div>
        {error && <Typography color="error">{error}</Typography>}
        <DataGrid
          rows={data}
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
        />
      </Box>
    </div>
  )
}