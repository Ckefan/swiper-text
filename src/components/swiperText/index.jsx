/** @format */

import React, { useState, useEffect, useRef } from 'react'
import './index.scss'

const SwiperText = ({ textList }) => {
  const list = [...textList, ...textList]
  const [active, setAction] = useState(-1)
  const swiperWarp = useRef(null)
  const activeRef = useRef(-1)
  const [first, setFirst] = useState(true)
  const [over, setOver] = useState(false)
  let init = true

  useEffect(() => {
    animation()
    return () => {
      setOver(true)
    }
  }, [])

  const animation = () => {
    if (over) return
    const that = swiperWarp.current
    if (that) {
      that.style.top = that.offsetTop - 62 + 'px'
      setAction((active) => (active > list.length - 3 ? 1 : ++active))
      activeRef.current =
        activeRef.current > list.length - 3 ? 1 : ++activeRef.current

      //执行第二遍重置
      if (activeRef.current === 1 && !init) {
        that.style.transition = 'none'
        that.style.top = '4px'
        setTimeout(() => {
          that.style.transition = 'all 1.5s ease-in-out'
        }, 300)
        animation()
        return
      }

      //定时自调用
      setTimeout(animation, activeRef.current === 2 && !init ? 300 : 2500)

      //设置节点，区分首次运行
      if (activeRef.current === 2) {
        init = false
      }
      activeRef.current > 2 && setFirst(false)
    }
  }
  return (
    <div className='ct-carousel-2'>
      <div ref={swiperWarp} className='ct-carousel-warp'>
        {list.map((e, i) => (
          <div
            key={i}
            className={'ct-carousel-Text ' + (active === i ? 'active' : '')}
            style={{
              transition: active === 2 && !first ? 'none' : 'all 1.5s',
            }}>
            {e}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SwiperText
