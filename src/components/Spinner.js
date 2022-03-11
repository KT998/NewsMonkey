import React from 'react'
import loading from './spinner.gif'


const Spinner = ()=>{
  
    return (
      <div className='text-center'>
        <img className="my-2" src={loading} alt={loading}></img>
      </div>
    )
  
}

export default Spinner
