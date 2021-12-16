import { ref } from "vue"

const minutes = 60
const maxLimit = 59 + (59 * 60)

export default function useTimer(
  defaultLimit = minutes
) {
  const current = ref(defaultLimit)
  const isCounting = ref(false)
  const resetPoint = ref(defaultLimit)

  const addCount = (s = 10) => {
    const tmp = current.value + s
    if(tmp < 0) {
      current.value = 0
      return  
    }
    if(tmp > maxLimit) {
      current.value = maxLimit
      return  
    }
    current.value = tmp
  }

  const roundUp = () => {
    const Operators = current.value % minutes
    if(Operators !== 0){
      current.value = current.value + (minutes - Operators)
    }
  }

  const countStart = () => {
    resetPoint.value = current.value
    isCounting.value = true
  }
  const countStop = () => {
    isCounting.value = false
  }
  const countReset = () => {
    const limit = resetPoint.value

    if (!isCounting.value) {
      current.value = limit
    }
  }

  const countDown = () => {
    if (current.value <= 0) {
      countStop()
      return
    }
    current.value = current.value - 1
  }

  const flame = 1000
  const handleTimer = () => {
    setTimeout(() => {
      if (isCounting.value) {
        countDown()
      }
      handleTimer()
    }, flame)
  }

  return {
    handleTimer,
    current,
    countStart,
    countStop,
    isCounting,
    countReset,
    addCount,
    roundUp,
  }
}