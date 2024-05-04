import React from 'react'

const StatSquares = ({stat}) => {
    const numBlocks = Math.floor(stat/3)
    const statArr = Array(6).fill(null)
  return (
    <div className='col-4 d-flex'>
        {
            statArr.map((sq, idx) => {
                return <span className={idx < numBlocks ? 'statFILL' : 'statEMPTY'} key={idx}></span>
            })
        }
    </div>
  )
}

export default StatSquares