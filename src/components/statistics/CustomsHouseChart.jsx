import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'
import numeral from 'numeral'

export function CustomsHouseChart({ data, year }) {
  const importByLocation = {}
  const totalYearlyImport = data.reduce((acc, row) => {
    const amount = parseFloat(row.NISCurrencyAmount) || 0
    return acc + amount
  }, 0).toLocaleString()
  data.forEach((row) => {
    const location = row.CustomsHouse
    const amount = parseFloat(row.NISCurrencyAmount) || 0
    if (location) {
      importByLocation[location] = (importByLocation[location] || 0) + amount
    }
  })

  const chartData = Object.entries(importByLocation).map(([location, total]) => ({
    location,
    total: Number(total.toFixed(2)),
  }))

  return (
    <div className='' style={{ width: '100%', height: 600 }}>
      <h1 className='text-4xl text-center text-blue-600 font-bold py-2 underline'>נתונים נוספים וחריגים</h1>
      <h3 className='text-xl text-stone-800 font-bold text-center mt-4'>סך כל היבוא בשקלים לפי מיקום המכס לשנת {year}</h3>
      <h3 className='text-xl text-stone-800 font-bold text-center'>₪ {totalYearlyImport} </h3>
      <ResponsiveContainer>
        <BarChart
          data={chartData}
          margin={{ top: 30, right: 30, left: 30, bottom: 80 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="location" angle={0} textAnchor="middle" interval={0} />
          <YAxis scale="log" domain={['auto', 'auto']} tickFormatter={(val) => numeral(val).format('0.[0]a') + '₪'} allowDataOverflow={true} minTickGap={50} />
          <Tooltip formatter={(val) => numeral(val).format('0.[0]a') + '₪'} />
          <Bar dataKey="total" fill="#2563eb" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
