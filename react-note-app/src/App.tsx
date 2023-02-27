import { Outlet } from 'react-router-dom'
function App() {
  return (
    <div className='flex'>
      <div className='w-48 bg-gray-100 h-screen' >App</div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default App