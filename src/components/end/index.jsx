/** @format */

import React, { useEffect } from 'react'
import './index.scss'

const End = ({ index }) => {
  useEffect(() => {
    if (index === 4) {
      document.querySelector('.dg.ac').style.display = 'none'
    }
  }, [index])
  return <div className='end'>谢谢观看</div>
}
export default End
