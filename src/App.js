/** @format */

import CarouselText from './components/carouselText'
import SwiperText from './components/swiperText'
import CustomTitle from './components/customTitle'
import TriangleLine from './components/triangleLine'
import Motion from './components/motion'
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
        sectionsColor={['#000', 'transparent', 'transparent']}
        onLeave={() => {}}
        scrollingSpeed={1000} /* Options here */
        render={({ state, fullpageApi }) => {
          return (
            <ReactFullpage.Wrapper>
              <div className='section'>
                <Motion></Motion>
              </div>
              <div className='section'>
                <CustomTitle></CustomTitle>
              </div>
              <div className='section'>
                <SwiperText textList={texts}></SwiperText>
                <CarouselText texts={texts}></CarouselText>
              </div>
              <div className='section'>
                <TriangleLine></TriangleLine>
              </div>
            </ReactFullpage.Wrapper>
          )
        }}
      />
    </div>
  )
}

export default App
