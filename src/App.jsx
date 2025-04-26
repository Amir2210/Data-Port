import { DataTable } from './components/DataTable'
import favicon from '../src/assets/imgs/cargo.png'


function App() {
  return (
    <main>
      <div className='flex justify-center items-center'>
        <h1 className="text-4xl text-stone-800 font-bold capitalize font-mono text-center pt-2 ">data port</h1>
        <img src={favicon} alt="" />
      </div>
      <DataTable />
    </main>
  )
}

export default App
