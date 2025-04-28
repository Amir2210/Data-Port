import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

export function ImportPerMonth({ year, data }) {
  const monthNames = {
    1: 'ינואר',
    2: 'פברואר',
    3: 'מרץ',
    4: 'אפריל',
    5: 'מאי',
    6: 'יוני',
    7: 'יולי',
    8: 'אוגוסט',
    9: 'ספטמבר',
    10: 'אוקטובר',
    11: 'נובמבר',
    12: 'דצמבר'
  }

  const importPerMonth = (() => {
    const acc = data.reduce((acc, row) => {
      const month = row.Month
      if (month) {
        acc[month] = (acc[month] || 0) + 1
      }
      return acc
    }, {})
    for (let i = 1; i <= 12; i++) {
      if (!(i in acc)) {
        acc[i] = 0
      }
    }
    return Object.fromEntries(
      Object.entries(acc).sort((a, b) => Number(a[0]) - Number(b[0]))
    )
  })()

  const chardata = {
    labels: Object.keys(importPerMonth).map((month) => monthNames[month]),
    datasets: [
      {
        label: `כמות יבוא בשנת ${year}`,
        data: Object.values(importPerMonth),
        fill: false,
        borderColor: '#4F46E5',
        backgroundColor: '#4F46E5',
        tension: 0.3
      }
    ]
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'כמות יבוא'
        }
      },
      x: {
        title: {
          display: true,
          text: 'חודשים'
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top'
      },
      tooltip: {
        callbacks: {
          label: (context) => `כמות יבוא: ${context.parsed.y}`
        }
      }
    }
  }
  return (
    <div style={{ maxWidth: 800, margin: 'auto' }}>
      <h1 className='text-4xl text-center text-blue-600 font-bold py-2 underline'>נתונים נוספים וחריגים</h1>
      <h1 className='text-xl text-stone-800 font-bold text-center mt-4'>כמות יבוא לפי חודשים</h1>
      <Line data={chardata} options={options} />
    </div>
  )
}