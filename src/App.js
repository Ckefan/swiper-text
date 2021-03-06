/** @format */

import CarouselText from './components/carouselText'
import SwiperText from './components/swiperText'
import CustomTitle from './components/customTitle'
import TriangleLine from './components/triangleLine'
import End from './components/end'

import Motion from './components/motion'
import ThreePosman from './components/threePosman'
import ReactFullpage from '@fullpage/react-fullpage'

import './App.css'

function App() {
  const texts = [
    '进入教学环境后',
    '你可以上传实操题所需素材',
    '并配置实操题的学习指引',
    '供学员进行实操练习',
  ]
  return (
    <div className='App'>
      <ReactFullpage
        licenseKey={'YOUR_KEY_HERE'}
        navigation
        navigationBarColor={['#ff00ff']}
        sectionsColor={['#000', 'transparent', '#000', 'transparent', '#000']}
        onLeave={() => {}}
        scrollingSpeed={1000} /* Options here */
        render={({ state, fullpageApi, a, b }) => {
          console.log(state && state.destination?.index)
          return (
            <ReactFullpage.Wrapper>
              <div className='section'>
                <CustomTitle></CustomTitle>
              </div>

              <div className='section'>
                <SwiperText textList={texts}></SwiperText>
                <CarouselText texts={texts}></CarouselText>
              </div>
              <div className='section'>
                <Motion index={state.destination?.index}></Motion>
              </div>
              <div className='section'>
                <ThreePosman index={state.destination?.index}></ThreePosman>
              </div>
              <div className='section'>
                <End index={state.destination?.index}></End>
                {/* <TriangleLine></TriangleLine> */}
              </div>
            </ReactFullpage.Wrapper>
          )
        }}
      />
    </div>
  )
}

export default App
