import React from 'react'

function UserLogin() {
  return (
    <div className='p-7' >
     <div>
      <img className='w-16 mb-6' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <form >
          <h3 className='text-lg font-medium mb-2 ' >What's Your Email</h3>
          <input 
          className='bg-[#eeeeee] mb-7  rounded px-4 py-2 border w-full text-lg placeholder:text-base'
          required 
          type="email" 
          placeholder='email@example.com'  />
          <h3 className='text-lg mb-2 font-medium ' >Enter Password</h3>
          <input className='bg-[#eeeeee] mb-7  rounded px-4 py-2 border w-full text-lg placeholder:text-base' required placeholder='password' type="password" />
          <button className='bg-[#111] text-white font-semibold mb-7  rounded px-4 py-2 w-full text-lg placeholder:text-base' >login</button>
        </form>
     </div>

     <div>
     <button className='bg-[#111] text-white font-semibold mb-7  rounded px-4 py-2 w-full text-lg placeholder:text-base' >Sign in as Captain</button>
     </div>
    </div>
  )
}

export default UserLogin