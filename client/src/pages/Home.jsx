import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <div className='bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1515543582370-4cff31e54e8b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjN8fHRyYWZmaWMlMjBsaWdodHxlbnwwfHwwfHx8MA%3D%3D)] h-screen pt-8  w-full flex justify-between flex-col  bg-red-400'>
        <img className='w-16  left-5 ml-6 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
          <div className='bg-white pb-7 py-4 px-4' >
            <h2 className='text-3xl font-bold' >Get Started With Uber</h2>
            <Link to={"/login"} className='w-full flex items-center justify-center font-semibold bg-black text-white py-3 rounded mt-5' >Continue</Link>
          </div>
      </div>
    </div>
  )
}

export default Home