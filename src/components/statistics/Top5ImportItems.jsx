import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { FormControl, InputLabel, MenuItem, Select, } from '@mui/material'
ChartJS.register(ArcElement, Tooltip, Legend)
export function Top5ImportItems({ data, year }) {
  const [count, setCount] = useState(5)
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
      .slice(0, count)
  )

  const total = Object.values(top5ImportsItems).reduce((acc, val) => acc + val, 0)

  const dataChart = {
    labels: Object.keys(top5ImportsItems),
    datasets: [
      {
        label: 'כמות יבוא',
        data: Object.values(top5ImportsItems),
        backgroundColor: [
          '#577BC1',
          '#FFD65A',
          '#B771E5',
          '#FF2DF1',
          '#AEEA94',
          '#FF5733',
          '#33FF57',
          '#3357FF',
          '#F1C40F',
          '#8E44AD',
          '#1ABC9C',
          '#E74C3C',
          '#2ECC71',
          '#9B59B6',
          '#16A085',
        ]
      }
    ]
  }

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || ''
            const value = context.raw
            const percentage = ((value / total) * 100).toFixed(2)
            return `${label}: ${value} (${percentage}%)`
          },
        },
      },
    },
  }
  return (
    <div style={{ maxWidth: 500, margin: 'auto' }}>
      <h1 className='text-4xl text-center text-blue-600 font-bold py-2 underline'>נתונים נוספים וחריגים</h1>
      <div className='my-3'>
        <FormControl fullWidth>
          <InputLabel className='!text-lg'>הצג</InputLabel>
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
      <h2 className='text-xl text-stone-800 font-bold text-center my-4' dir='rtl'>
        {count} פריטי המכס (8 ספרות) המיובאים ביותר בשנת {year}
      </h2>
      <Doughnut data={dataChart} options={options} />
    </div>
  )
}