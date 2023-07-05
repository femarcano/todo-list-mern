import { Link } from 'react-router-dom'

function Navbar () {
  return (
    <div className='bg-zinc-700 flex justify-between px-10 py-4'>
      <Link className='text-white font-bold' to='/'>
        <h1>React MySQL</h1>
      </Link>

      <ul className='flex gap-x-2'>
        <li>
          <Link className='bg-white rounded-sm px-2 py-1' to='/'>Home</Link>
        </li>
        <li><Link className='bg-green-300 rounded-sm px-2 py-1' to='/new'>Create Task</Link></li>
      </ul>

    </div>
  )
}

export default Navbar
