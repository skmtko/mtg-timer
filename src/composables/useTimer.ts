import { Ref, ref } from 'vue'

const minutes = 60
const maxLimit = 59 + 59 * 60
const miliSeconds = 1000

export default function useTimer(defaultLimit = minutes) {
  const current = ref(defaultLimit)
  const isCounting = ref(false)
  const resetPoint = ref(defaultLimit)
  const finishTime: Ref<number | false> = ref(false)

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
        finishTime.value = new Date().getTime() + maxLimit * miliSeconds
        return
      }
      finishTime.value = finishTime.value + s * miliSeconds
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
    finishTime.value = new Date().getTime() + current.value * miliSeconds
    isCounting.value = true
  }
  const countStop = () => {
    isCounting.value = false
    finishTime.value = false
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

    const currentMili = finishTime.value - new Date().getTime()
    current.value = Math.ceil(currentMili / miliSeconds)

    // current.value = current.value - 1
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
