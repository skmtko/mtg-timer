<template>
  <div class="flex justify-center items-center">
    <slot name="prefix" />
    <div class="text-8xl">
      {{ `${displayMinutes}:${displaySeconds}` }}
    </div>
    <slot name="suffix" />
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
