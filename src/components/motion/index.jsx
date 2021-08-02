/** @format */

import React, { useEffect, useRef, useState } from 'react'
import Typed from 'typed.js'
import './index.scss'

const Motion = ({ index }) => {
  const step = useRef(0)
  const [lock, setLock] = useState(false)
  let typed
  useEffect(() => {
    if (index === 2 && !lock) {
      setLock(true)
      console.log(123123)
      const options = {
        strings: [
          `const ctx = this.ele.getContext('2d')
ctx.beginPath()
ctx.save()

// 画头部
drawHead(t) {
  <font color="#00ff2b">ctx.translate(0, Math.sin(t) * 4)</font>
  ctx.arc(80, -35, 35, 0, 2 * Math.PI)
  ctx.fill()
  ctx.closePath()
  ctx.restore()
}

// 画身体
drawBody(t) {
  ctx.beginPath()
  ctx.save()
  ctx.rotate(((Math.sin(t) * Math.PI) / 180) * -1)
  ctx.translate(0, Math.sin(t) * 4)
  ctx.scale(0.5, 0.5)
  const body = new Path2D(
    'M125,284 L1,284 C0.33333333,94.6666667 35,0 105,0 C115.666667,4 122.333333,20.6666667 125,50 L125,284 Z'
  )
  ctx.fill(body)
  ctx.restore()
  ctx.closePath()
}

// 画脚
drawFeet(t) {
  t = t / 2
  ctx.save()
  ctx.scale(0.5, 0.5)
  ctx.translate(0, 460)
  const foot = new Path2D(
    'M23,0 C67,0 80,16 80,22 C80,26 78.6666667,28 76,28 C29.3333333,28 6,28 6,28 C6,28 -1.34111707e-14,30 0,17 C1.42108547e-14,4 10,1.9505735e-16 13,0 C16,0 13,0 23,0 Z'
  )

  ctx.save()
  <font color="#00ff2b">ctx.translate(Math.cos(t) * -50, Math.sin(t) > 0 ? Math.sin(t) * -35 : 0)
  t < Math.PI &&  ctx.rotate(((Math.sin(t) * Math.PI) / 180) * -5)</font>

  ctx.fill(foot)
  ctx.restore()

  ctx.save()
  <font color="#00ff2b">ctx.translate(
    Math.cos(t + Math.PI) * -50,
    Math.sin(t + Math.PI) > 0 ? Math.sin(t + Math.PI) * -35 : 0
  )</font>

  t > Math.PI && ctx.rotate(((Math.sin(t + Math.PI) * Math.PI) / 180) * -5)

  ctx.fill(foot)
  ctx.restore()

  ctx.restore()
}
`,
        ],
        typeSpeed: 20,
      }
      typed = new Typed('.textarea', options)

      setTimeout(() => {
        step.current = 1
        typed.toggle()
      }, 6500)
    }

    const onKeySpace = (e) => {
      console.log(typed)
      if (e.keyCode === 13 && index === 2) {
        typed.toggle()
        step.current === 1 &&
          setTimeout(() => {
            step.current = 2
            typed.toggle()
          }, 11000)

        step.current === 2 &&
          setTimeout(() => {
            step.current = 3
            typed.toggle()
          }, 22000)
      }
    }
    //空格暂停
    document.addEventListener('keypress', onKeySpace, false)

    ctx = canvas.init()

    return () => {
      document.removeEventListener('keypress', onKeySpace, false)
    }
  }, [index])

  let ctx
  const canvas = {
    init() {
      this.ele = document.querySelector('.motion')
      this.resize()
      window.addEventListener('resize', () => this.resize(), false)
      this.ctx = this.ele.getContext('2d')
      return this.ctx
    },
    onResize(callback) {
      this.resizeCallback = callback
    },
    resize() {
      this.width = this.ele.width = window.innerWidth
      this.height = this.ele.height = window.innerHeight
      this.ele.style.width = this.ele.width * 0.5 + 'px'
      this.ele.style.height = this.ele.height * 0.5 + 'px'
      this.ctx = this.ele.getContext('2d')
      this.ctx.scale(2, 2)
      this.resizeCallback && this.resizeCallback()
    },
    run(callback) {
      requestAnimationFrame(() => {
        this.run(callback)
      })
      callback(this.ctx)
    },
  }

  let objects = []

  class SadMan {
    //画头
    drawHead(t) {
      ctx.save()
      ctx.beginPath()
      ctx.translate(0, Math.sin(t) * 4)
      ctx.arc(80, -35, 35, 0, 2 * Math.PI)
      ctx.fill()
      ctx.closePath()
      ctx.restore()
    }
    //画身体
    drawBody(t) {
      ctx.beginPath()
      ctx.save()
      ctx.rotate(((Math.sin(t) * Math.PI) / 180) * -1)
      ctx.translate(0, Math.sin(t) * 4)
      ctx.scale(0.5, 0.5)
      const body = new Path2D(
        'M125,284 L1,284 C0.33333333,94.6666667 35,0 105,0 C115.666667,4 122.333333,20.6666667 125,50 L125,284 Z'
      )
      ctx.fill(body)
      ctx.restore()
      ctx.closePath()
    }
    //画脚
    drawFeet(t) {
      t = t / 2
      ctx.save()
      ctx.scale(0.5, 0.5)
      ctx.translate(0, 460)
      const foot = new Path2D(
        'M23,0 C67,0 80,16 80,22 C80,26 78.6666667,28 76,28 C29.3333333,28 6,28 6,28 C6,28 -1.34111707e-14,30 0,17 C1.42108547e-14,4 10,1.9505735e-16 13,0 C16,0 13,0 23,0 Z'
      )

      ctx.save()
      ctx.translate(Math.cos(t) * -50, Math.sin(t) > 0 ? Math.sin(t) * -35 : 0)
      if (t < Math.PI) {
        ctx.rotate(((Math.sin(t) * Math.PI) / 180) * -5)
      }
      ctx.fill(foot)
      ctx.restore()

      ctx.save()
      ctx.translate(
        Math.cos(t + Math.PI) * -50,
        Math.sin(t + Math.PI) > 0 ? Math.sin(t + Math.PI) * -35 : 0
      )
      if (t > Math.PI) {
        ctx.rotate(((Math.sin(t + Math.PI) * Math.PI) / 180) * -5)
      }
      ctx.fill(foot)
      ctx.restore()
      ctx.restore()
    }
    //画阴影
    drawShadow(t) {
      ctx.beginPath()
      ctx.save()
      ctx.scale(0.5, 0.5)
      ctx.translate(45, 490)
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.ellipse(0, 0, 120 + Math.sin(t) * 10, 8, 0, 0, 2 * Math.PI)
      ctx.fill()
      ctx.restore()
      ctx.closePath()
    }
    draw(t) {
      t = (t % Math.PI) * 2
      ctx.fillStyle = 'white'
      ctx.save()
      ctx.translate(
        window.innerWidth * 0.25 - 140,
        window.innerHeight * 0.25 - 80
      )
      this.drawShadow(t)
      step.current > 0 && this.drawHead(t)
      step.current > 1 && this.drawBody(t)
      step.current > 2 && this.drawFeet(t)
      ctx.restore()
    }
  }

  const init = () => {
    objects = []
    objects.push(new SadMan())
  }

  useEffect(() => {
    init()
  }, [])

  let tick = 0
  canvas.run((ctx) => {
    var div = document.querySelector('.textarea')
    div &&
      step.current !== 3 &&
      step.current !== 0 &&
      (div.scrollTop = div.scrollHeight)

    ctx && ctx.clearRect(0, 0, canvas.width, canvas.height)
    tick += 0.1
    objects.forEach((obj) => {
      obj.draw(tick)
    })
  })

  canvas.onResize(() => {
    init()
  })

  return (
    <div className='motion-warp'>
      <canvas className='motion'></canvas>
      <div disabled className='textarea'></div>
    </div>
  )
}

export default Motion
