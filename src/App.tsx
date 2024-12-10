import {List, Sidebar} from "./components";
import plane from './assets/airplane.svg'
import {memo} from "react";

function App() {

  return (
    <div className='bg-[#F3F7FA] mt-[-20px] min-h-screen'>
      <header className='flex flex-row justify-center align-middle my-4'>
        <img src={plane} alt="Header" className='w-[100px]'/>
      </header>
      <section className='flex flex-row gap-8 w-[900px] mx-auto'>
        <aside className='basis-1/3'>
          <Sidebar/>
        </aside>
        <main className='basis-2/3'>
          <List/>
        </main>
      </section>
    </div>
  )
}

export default memo(App)
