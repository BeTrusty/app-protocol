import { useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react'

// Components
import { Step1 } from './Step1'
import { Step2 } from './Step2'
import { Step3 } from './Step3'
import { Step4 } from './Step4'
import { Button } from '@nextui-org/react'

//CSS Styles
import 'swiper/css'
import 'swiper/css/pagination'

export function Onboarding (): JSX.Element {
  const router = useRouter()
  const swiperRef = useRef<SwiperClass | null>(null)
  const [isLastSlide, setIsLastSlide] = useState(false)

  const handleContinue = () => {
    router.push('/login')
  }

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext()
    }
  }

  const onSlideChange = (swiper: SwiperClass) => {
    setIsLastSlide(swiper.activeIndex === swiper.slides.length - 1)
  }

  return (
    <section className='w-full max-w-[400px] mt-5 p-5'>
      <Swiper
        modules={[Navigation, Pagination]}
        navigation={true}
        pagination={{
          clickable: true,
          renderBullet: function (index, className) {
            return `<span class="${className}" style="background-color:#1F8D99;"></span>`
          }
        }}
        spaceBetween={50}
        slidesPerView={1}
        onSwiper={swiper => (swiperRef.current = swiper)}
        onSlideChange={onSlideChange}
      >
        <SwiperSlide>
          <Step1 />
        </SwiperSlide>
        <SwiperSlide>
          <Step2 />
        </SwiperSlide>
        <SwiperSlide>
          <Step3 />
        </SwiperSlide>
        <SwiperSlide>
          <Step4 />
        </SwiperSlide>
      </Swiper>
      <div className='w-full max-w-[400px] mt-5 flex flex-row justify-center items-center'>
        <Button
          color='primary'
          radius='full'
          className='w-full'
          onClick={isLastSlide ? handleContinue : handleNext}
        >
          {isLastSlide ? 'Comenzar' : 'Siguiente'}
        </Button>
      </div>
    </section>
  )
}
