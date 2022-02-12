import { ref } from 'vue'

const minutes = 60
const maxLimit = 59 + 59 * 60
const msToSec = (ms: number) => ms / 1000
const SecToMs = (s: number) => s * 1000

type FinishTime = number | false

export default function useTimer(defaultLimit = minutes) {
  const current = ref(defaultLimit)
  const isCounting = ref(false)
  const resetPoint = ref(defaultLimit)
  const finishTime = ref<FinishTime>(false)

  const setFinishTime = (value: FinishTime) => {
    finishTime.value = value
  }

  const addCount = (s = 10) => {
    const tmp = current.value + s

    if (tmp < 0) {
      current.value = 0
      return
    }

    if (!isCounting.value) {
      if (tmp > maxLimit) {
        current.value = maxLimit
        return
      }
      current.value = tmp
    }

    if (isCounting.value && finishTime.value) {
      if (tmp > maxLimit) {
        setFinishTime(new Date().getTime() + SecToMs(maxLimit))
        return
      }
      setFinishTime(finishTime.value + SecToMs(s))
    }
  }

  const roundUp = () => {
    const Operators = current.value % minutes
    if (Operators !== 0) {
      current.value = current.value + (minutes - Operators)
    }
  }

  const countStart = () => {
    resetPoint.value = current.value
    setFinishTime(new Date().getTime() + SecToMs(current.value))
    isCounting.value = true
  }
  const countStop = () => {
    isCounting.value = false
    setFinishTime(false)
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
    if (!finishTime.value) return

    const currentMillisecond = finishTime.value - new Date().getTime()
    current.value = Math.ceil(msToSec(currentMillisecond))
  }

  const flame = 30
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
