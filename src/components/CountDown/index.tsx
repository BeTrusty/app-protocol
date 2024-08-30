import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface CountdownProps {
  creationTimestamp: number
  durationInMinutes: number
}

export function CountDown ({
  creationTimestamp,
  durationInMinutes = 5
}: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState(0)
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = Date.now()
      const endTime = creationTimestamp + durationInMinutes * 60 * 1000
      const difference = endTime - now

      if (difference > 0) {
        setTimeLeft(Math.floor(difference / 1000))
        setIsExpired(false)
      } else {
        setTimeLeft(0)
        setIsExpired(true)
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [creationTimestamp, durationInMinutes])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  const formatTime = (time: number) => time.toString().padStart(2, '0')

  return (
    <>
      {!isExpired && (
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className='bg-white bg-opacity-20 p-8 rounded-2xl shadow-lg backdrop-blur-md absolute top-0 w-full h-full flex flex-col justify-center items-center'
        >
          <p className='text-2xl font-bold text-gray-700 mb-6 text-center'>
            Cuenta Regresiva
          </p>
          {isExpired ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='text-2xl text-default-700 text-center'
            >
              ¡Tiempo expirado!
            </motion.p>
          ) : (
            <div className='flex space-x-4'>
              <TimeUnit label='Minutos' value={formatTime(minutes)} />
              <TimeUnit label='Segundos' value={formatTime(seconds)} />
            </div>
          )}
        </motion.div>
      )}
    </>
  )
}

function TimeUnit ({ label, value }: { label: string; value: string }) {
  return (
    <div className='flex flex-col items-center'>
      <motion.div
        key={value}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className='bg-default-300 bg-opacity-30 w-24 h-24 rounded-lg flex items-center justify-center mb-2'
      >
        <span className='text-5xl font-bold text-default-700'>{value}</span>
      </motion.div>
      <span className='text-sm font-medium text-default-700'>{label}</span>
    </div>
  )
}
