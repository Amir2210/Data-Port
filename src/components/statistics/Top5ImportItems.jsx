import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend)
export function Top5ImportItems({ top5ImportsItems, year }) {
  const data = {
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
        ]
      }
    ]
  };
  return (
    <div style={{ maxWidth: 500, margin: 'auto' }}>
      <h1 className='text-4xl text-center text-blue-600 font-bold py-2 underline'>נתונים נוספים וחריגים</h1>
      <h2 className='text-xl text-stone-800 font-bold text-center my-4' dir='rtl'>
        5 פריטי המכס (8 ספרות) המיובאים ביותר בשנת {year}
      </h2>
      <Doughnut data={data} />
    </div>
  )
}