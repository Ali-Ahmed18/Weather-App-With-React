import React from 'react'

function ForecastBox({pic,title,num}) {
  return (
    <>
        <div className='ForecastBox'>
                <img width={"50px"} src={pic}  />
                <div >
                   <p>{title}</p>
                   <p>{num}</p>
                </div>
                
        </div>
    </>
  )
}

export default ForecastBox