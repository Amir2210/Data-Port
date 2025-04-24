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

export function CustomsHouseChart({ data, year, totalYearlyImport }) {
  const importByLocation = {}
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
    <div className='' style={{ width: '100%', height: 500 }}>
      <h3 className='text-xl text-stone-800 font-bold text-center mt-4'>סך כל היבוא בשקלים לפי מיקום המכס לשנת {year}</h3>
      <h3 className='text-xl text-stone-800 font-bold text-center'>₪ {totalYearlyImport} </h3>
      <ResponsiveContainer>
        <BarChart
          data={chartData}
          margin={{ top: 30, right: 30, left: 30, bottom: 80 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="location" angle={-45} textAnchor="end" interval={0} />
          <YAxis scale="log" domain={['auto', 'auto']} tickFormatter={(val) => numeral(val).format('0.[0]a') + '₪'} />
          <Tooltip formatter={(val) => val.toLocaleString() + ' ₪'} />
          <Bar dataKey="total" fill="#2563eb" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
