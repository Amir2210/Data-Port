import { useState, useEffect, useMemo } from 'react'
import { importData } from '../api/importData'
import { DataGrid } from '@mui/x-data-grid'
import { Box, Typography, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material'
import { HeroCarousel } from './HeroCarousel'
import numeral from 'numeral'
export function DataTable() {
  const [data, setData] = useState([])
  const [selectedFilters, setSelectedFilters] = useState({
    country: "All",
    customHouse: "All",
    currencyCode: "All",
  })
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

  const uniqueCountries = Array.from(new Set(data.map((row) => row.Origin_Country))).filter(Boolean)

  const uniqueCustomsHouse = Array.from(new Set(data.map((row) => row.CustomsHouse))).filter(Boolean)

  const uniqueCurrencyCode = Array.from(new Set(data.map((row) => row.CurrencyCode))).filter(Boolean)

  const filteredData = useMemo(() => {
    return data.filter((row) => {
      const matchesCountry = selectedFilters.country === "All" || row.Origin_Country === selectedFilters.country
      const matchesCustomHouse = selectedFilters.customHouse === "All" || row.CustomsHouse === selectedFilters.customHouse
      const matchesCurrencyCode = selectedFilters.currencyCode === "All" || row.CurrencyCode === selectedFilters.currencyCode
      return matchesCountry && matchesCustomHouse && matchesCurrencyCode
    })
  }, [data, selectedFilters])

  const handleFilterChange = (filterType) => (event) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: event.target.value,
    }))
  }

  const handleChangeYear = (event) => {
    const year = event.target.value
    setYear(year)
  }

  const onResetFilters = () => {
    setSelectedFilters({
      country: "All",
      customHouse: "All",
      currencyCode: "All",
    })
  }


  const columns = [
    { field: '_id', headerName: 'ID', width: 100 },
    { field: 'Year', headerName: 'שנה', width: 110 },
    { field: 'Month', headerName: 'חודש', width: 110 },
    { field: 'Origin_Country', headerName: 'מדינת מקור', width: 160 },
    { field: 'CustomsItem_2_Digits', headerName: 'פריט מכס (2 ספרות)', width: 230 },
    { field: 'CustomsItem_8_Digits', headerName: 'פריט מכס (8 ספרות)', width: 230 },
    {
      field: 'Exempt_CustomsItem', headerName: 'פטור ממכס', width: 160, valueFormatter: (params) => {
        if (!params) return ''
        return numeral(+params).format('0.[0]aa') + '₪'
      }
    },
    { field: 'CustomsHouse', headerName: 'בית מכס', width: 200 },
    {
      field: 'Quantity', headerName: 'כמות', width: 120, valueFormatter: (params) => {
        if (!params) return ''
        return (+params).toLocaleString()
      }
    },
    { field: 'Quantity_MeasurementUnitID', headerName: 'קוד יחידת מידה', width: 230 },
    { field: 'Quantity_MeasurementUnitName', headerName: 'שם יחידת מידה', width: 230 },
    { field: 'TradeAgreementName', headerName: 'הסכם סחר', width: 180 },
    { field: 'TermsOfSale', headerName: 'תנאי מכירה', width: 160 },
    { field: 'IsTradeAgreementWithQuota', headerName: 'האם הסכם סחר עם מכסה', width: 270 },
    {
      field: 'NISCurrencyAmount', headerName: 'שווי בש"ח', width: 150, valueFormatter: (params) => {
        if (!params) return ''
        return numeral(+params).format('0.[0]aa') + '₪'
      }
    },
    { field: 'CurrencyCode', headerName: 'קוד מטבע', width: 150 },
    { field: 'AutonomyTypeID', headerName: 'קוד אוטונומיה', width: 170 },
    { field: 'AutonomyType', headerName: 'סוג אוטונומיה', width: 170 },
    { field: 'GovernmentProcedureTypeName', headerName: 'תהליך ממשלתי (עברית)', width: 250 },
    { field: 'GovernmentProcedureTypeEnglishName', headerName: 'תהליך ממשלתי (אנגלית)', width: 250 },
    { field: 'IsPreferenceDocument', headerName: 'יש מסמך העדפה', width: 190 },
    {
      field: 'GeneralCustomsTax', headerName: 'מס מכס כללי', width: 170, valueFormatter: (params) => {
        if (!params) return ''
        return (+params).toLocaleString()
      }
    },
    { field: 'PurchaseTax', headerName: 'מס קניה', width: 150 },
    {
      field: 'VAT', headerName: 'מע״מ', width: 130, valueFormatter: (params) => {
        if (!params) return ''
        return (+params).toLocaleString()
      }
    },
  ]

  const totalYearlyImport = data.reduce((acc, row) => {
    const amount = parseFloat(row.NISCurrencyAmount) || 0
    return acc + amount
  }, 0).toLocaleString()


  const sortedByAmount = [...data]
    .filter(row => parseFloat(row.NISCurrencyAmount))
    .sort((a, b) => parseFloat(b.NISCurrencyAmount) - parseFloat(a.NISCurrencyAmount))

  const top5ExpensiveImports = sortedByAmount.slice(0, 5)

  const top5ImportsPerCountry = Object.fromEntries(
    Object.entries(
      data.reduce((acc, row) => {
        const country = row.Origin_Country
        if (country) {
          acc[country] = (acc[country] || 0) + 1
        }
        return acc
      }, {})
    )
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
  )
  const top5ImportsItems = Object.fromEntries(
    Object.entries(
      data.reduce((acc, row) => {
        const item = row.CustomsItem_8_Digits
        if (item) {
          acc[item] = (acc[item] || 0) + 1
        }
        return acc
      }, {})
    )
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
  )

  return (
    <section >
      <h1 className='text-4xl text-stone-800 font-bold  text-center pt-2'>נתוני יבוא לישראל לשנת <span>{year}</span></h1>
      <div>
        <Box sx={{ height: 560, width: '100%', p: 2, textAlign: 'end' }}>
          <div className='flex flex-wrap items-center gap-2 sm:gap-10'>

            <FormControl sx={{ minWidth: 120, mb: 2 }}>
              <InputLabel className='!text-lg' id="year-select-label">שנה</InputLabel>
              <Select
                className='!font-bold'
                labelId="year-select-label"
                id="year-select"
                value={year}
                label="שנה"
                onChange={handleChangeYear}
              >
                <MenuItem value="2025">2025</MenuItem>
                <MenuItem value="2024">2024</MenuItem>
                <MenuItem value="2023">2023</MenuItem>
                <MenuItem value="2022">2022</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 200, mb: 2 }}>
              <InputLabel className='!text-lg'>מדינה</InputLabel>
              <Select
                className='!font-bold'
                value={selectedFilters.country}
                label="מדינה"
                onChange={handleFilterChange('country')}
              >
                <MenuItem value="All">כל המדינות</MenuItem>
                {uniqueCountries.map(country => (
                  <MenuItem key={country} value={country}>{country}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 200, mb: 2 }}>
              <InputLabel className='!text-lg'>בית מכס</InputLabel>
              <Select
                className='!font-bold'
                value={selectedFilters.customHouse}
                label="בית מכס"
                onChange={handleFilterChange('customHouse')}
              >
                <MenuItem value="All">כל בתי המכס</MenuItem>
                {uniqueCustomsHouse.map(customHouse => (
                  <MenuItem key={customHouse} value={customHouse}>{customHouse}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 200, mb: 2, }}>
              <InputLabel className='!text-lg'>קוד מטבע</InputLabel>
              <Select
                className='!font-bold'
                value={selectedFilters.currencyCode}
                label="קוד מטבע"
                onChange={handleFilterChange('currencyCode')}
              >
                <MenuItem value="All">כל המטבעות</MenuItem>
                {uniqueCurrencyCode.map(currencyCode => (
                  <MenuItem key={currencyCode} value={currencyCode}>{currencyCode}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button className='!text-lg !capitalize' onClick={onResetFilters} variant="outlined">Reset filters</Button>
          </div>

          {error && <Typography color="error">{error}</Typography>}
          {!data.length && <Typography color="error">Loading...</Typography>}

          <DataGrid
            rows={filteredData.map((row, index) => ({ id: index, ...row }))}
            columns={columns}
            pageSize={10}
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
          />
          <div className='flex justify-center'>
            <HeroCarousel data={data} totalYearlyImport={totalYearlyImport} year={year} top5ExpensiveImports={top5ExpensiveImports} top5ImportsPerCountry={top5ImportsPerCountry} top5ImportsItems={top5ImportsItems} />
          </div>
        </Box>

      </div>
    </section>
  )
}