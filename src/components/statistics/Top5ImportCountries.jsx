import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
ChartJS.register(ArcElement, Tooltip, Legend)
export function Top5ImportCountries({ year, top5ImportsPerCountry }) {



  const chartData = {
    labels: Object.keys(top5ImportsPerCountry),
    datasets: [
      {
        label: 'כמות',
        data: Object.values(top5ImportsPerCountry),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  }
  return (
    <div style={{ maxWidth: 500, margin: 'auto' }}>
      <h1 className='text-4xl text-center text-blue-600 font-bold py-2 underline'>נתונים נוספים וחריגים</h1>
      <h2 className='text-xl text-stone-800 font-bold text-center my-4' dir='rtl'>5 המדינות המייבאות ביותר בשנת {year}</h2>
      <Pie data={chartData} />
    </div>
  )
}