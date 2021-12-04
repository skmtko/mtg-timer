<template>
  <div>
    <div class="text-xs">
      <span class="minutes">minutes: {{ displayMinutes }}</span>
      <span> / </span>
      <span class="seconds">seconds: {{ displaySeconds }}</span>
    </div>

    <div class="text-3xl">
      {{ `${displayMinutes}:${displaySeconds}` }}
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
export default {
  name: 'TimeDisplay',
  props: {
    time: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const parseMiliSeconds = (s) => s * 1000
    const format = (s) => {
      return `0${s}`.slice(-2)
    }

    const displayMinutes = computed(() => {
      const date = new Date(parseMiliSeconds(props.time))
      return format(date.getMinutes())
    })

    const displaySeconds = computed(() => {
      const date = new Date(parseMiliSeconds(props.time))
      return format(date.getSeconds())
    })

    return {
      displayMinutes,
      displaySeconds,
    }
  },
}
</script>
