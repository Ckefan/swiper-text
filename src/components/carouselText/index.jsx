/** @format */

import React, { useState, useEffect, useRef } from 'react'
import './index.scss'

const SwiperText = ({ texts }) => {
  const list = [...texts, ...texts]
  const [active, setAction] = useState(list.length)
  const swiperWarp = useRef()

  let lock = ''
  let nowTime = 0
  let lastTime = Date.now()
  let speeds = 28
  const diffTime = 25

  useEffect(() => {
    animation(0)
  }, [])

  const animation = (e) => {
    const that = swiperWarp.current
    const speed = e * 0.03
    if (
      Math.floor((speed + 0) % (360 / list.length)) === 0 &&
      Math.ceil(speed) !== lock
    ) {
      setAction((active) => (active === 0 ? list.length - 1 : --active))
      lock = Math.ceil(speed) //防抖
    }

    nowTime = Date.now()

    if (nowTime - lastTime > diffTime) {
      that.style.transform = ` rotateX(${speeds++}deg)  translateY(35%) `

      lastTime = nowTime
    }
    requestAnimationFrame(animation)
  }

  return (
    <div className='ct-carousel'>
      <div ref={swiperWarp} className='ct-carousel-warp'>
        {list.map((e, i) => (
          <div
            key={(e + i).toString()}
            className={'ct-carousel-Text ' + (active === i ? 'active' : '')}
            style={{
              transform: `rotateX(${
                (360 / list.length) * i
              }deg) translateZ(80px)  `,
            }}>
            {e}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SwiperText
