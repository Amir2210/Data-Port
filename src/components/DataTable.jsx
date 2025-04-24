import { useState } from 'react'
import { importData } from '../api/importData'
import { useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Box, Typography } from '@mui/material'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
export function DataTable() {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [selectedCountry, setSelectedCountry] = useState("All")
  const [selectedCustomHouse, setSelectedCustomHouse] = useState("All")
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState("All")
  const [error, setError] = useState("")
  const [year, setYear] = useState(2025)

  useEffect(() => {
    async function getData() {
      try {
        const records = await importData.fetchData(year)
        setData(records)
        setFilteredData(records)
      } catch (err) {
        setError(err.message || "Unknown error")
      }
    }
    getData()
  }, [year])

  const uniqueCountries = Array.from(new Set(data.map((row) => row.Origin_Country))).filter(Boolean)
  const uniqueCustomsHouse = Array.from(new Set(data.map((row) => row.CustomsHouse))).filter(Boolean)
  const uniqueCurrencyCode = Array.from(new Set(data.map((row) => row.CurrencyCode))).filter(Boolean)

  const handleCountryChange = (event) => {
    const country = event.target.value
    setSelectedCountry(country)
    if (country === "All") {
      setFilteredData(data)
    } else {
      setFilteredData(data.filter((row) => row.Origin_Country === country))
    }
  }

  const handleCustomsHouseChange = (event) => {
    const customHouse = event.target.value
    setSelectedCustomHouse(customHouse)
    if (customHouse === "All") {
      setFilteredData(data)
    } else {
      setFilteredData(data.filter((row) => row.CustomsHouse === customHouse))
    }
  }

  const handleCurrencyCodeChange = (event) => {
    const currencyCode = event.target.value
    setSelectedCurrencyCode(currencyCode)
    if (currencyCode === "All") {
      setFilteredData(data)
    } else {
      setFilteredData(data.filter((row) => row.CurrencyCode === currencyCode))
    }
  }


  const columns = [
    { field: '_id', headerName: 'ID', width: 70 },
    { field: 'Year', headerName: 'שנה', width: 90 },
    { field: 'Month', headerName: 'חודש', width: 90 },
    { field: 'Origin_Country', headerName: 'מדינת מקור', width: 150 },
    { field: 'CustomsItem_2_Digits', headerName: 'פריט מכס (2 ספרות)', width: 150 },
    { field: 'CustomsItem_8_Digits', headerName: 'פריט מכס (8 ספרות)', width: 150 },
    { field: 'Exempt_CustomsItem', headerName: 'פטור ממכס', width: 130 },
    { field: 'CustomsHouse', headerName: 'בית מכס', width: 150 },
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
    { field: 'GovernmentProcedureTypeEnglishName', headerName: 'תהליך ממשלתי (אנגלית)', width: 300 },
    { field: 'IsPreferenceDocument', headerName: 'יש מסמך העדפה', width: 160 },
    { field: 'GeneralCustomsTax', headerName: 'מס מכס כללי', width: 150 },
    { field: 'PurchaseTax', headerName: 'מס קניה', width: 120 },
    { field: 'VAT', headerName: 'מע״מ', width: 100 },
  ]

  return (
    <div>
      <h1 className='text-4xl text-stone-800 font-bold  text-center pt-2'>יבוא לישראל לשנת <span>{year}</span></h1>
      <Box sx={{ height: 600, width: '100%', p: 2 }}>
        <div className='flex flex-wrap gap-2 sm:gap-10'>

          <FormControl sx={{ minWidth: 120, mb: 2 }}>
            <InputLabel id="year-select-label">שנה</InputLabel>
            <Select
              labelId="year-select-label"
              id="year-select"
              value={year}
              label="שנה"
              onChange={(ev) => setYear(ev.target.value)}
            >
              <MenuItem value="2025">2025</MenuItem>
              <MenuItem value="2024">2024</MenuItem>
              <MenuItem value="2023">2023</MenuItem>
              <MenuItem value="2022">2022</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 200, mb: 2 }}>
            <InputLabel>מדינה</InputLabel>
            <Select
              value={selectedCountry}
              label="מדינה"
              onChange={handleCountryChange}
            >
              <MenuItem value="All">כל המדינות</MenuItem>
              {uniqueCountries.map(country => (
                <MenuItem key={country} value={country}>{country}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 200, mb: 2 }}>
            <InputLabel>בית מכס</InputLabel>
            <Select
              value={selectedCustomHouse}
              label="בית מכס"
              onChange={handleCustomsHouseChange}
            >
              <MenuItem value="All">כל בתי המכס</MenuItem>
              {uniqueCustomsHouse.map(customHouse => (
                <MenuItem key={customHouse} value={customHouse}>{customHouse}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 200, mb: 2 }}>
            <InputLabel>קוד מטבע</InputLabel>
            <Select
              value={selectedCurrencyCode}
              label="קוד מטבע"
              onChange={handleCurrencyCodeChange}
            >
              <MenuItem value="All">כל המטבעות</MenuItem>
              {uniqueCurrencyCode.map(currencyCode => (
                <MenuItem key={currencyCode} value={currencyCode}>{currencyCode}</MenuItem>
              ))}
            </Select>
          </FormControl>

        </div>
        {error && <Typography color="error">{error}</Typography>}
        <DataGrid
          rows={filteredData.map((row, index) => ({ id: index, ...row }))}
          columns={columns}
          pageSize={10}
        />
      </Box>
    </div>
  )
}