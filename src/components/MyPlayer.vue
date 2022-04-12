<template>
  <div
    id="my-youtube-vue-player"
    ref="player"
  />
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  SetupContext,
  watch,
} from 'vue'
import PlayerFactory from 'youtube-player'
import useYoutube from '../composables/useYoutube'
import { useStore } from '../store/index'

const convertBooleanToIO = (v: boolean): 0 | 1 => {
  if (v) return 1
  return 0
}

export default defineComponent({
  name: 'MyPlayer',
  props: {
    width: { type: Number, default: 480 },
    height: { type: Number, default: 320 },
    autoplay: {
      type: Boolean,
      default: true,
    },
    videoId: { type: String, required: true },
    loop: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['ended', 'paused', 'played'],
  setup(props, context: SetupContext) {
    const { setPlayer } = useYoutube()
    const store = useStore()
    const player = computed(() => store.state.player)

    onMounted(() => {
      const playerVars = {
        autoplay: convertBooleanToIO(props.autoplay),
        loop: convertBooleanToIO(props.loop),
      }
      setPlayer(
        PlayerFactory('my-youtube-vue-player', {
          host: 'https://www.youtube.com',
          width: props.width,
          height: props.height,
          videoId: props.videoId,
          playerVars,
        })
      )

      player.value.on('stateChange', (e) => {
        if (e.data === window.YT.PlayerState.ENDED) {
          context.emit('ended')
        } else if (e.data === window.YT.PlayerState.PAUSED) {
          context.emit('paused')
        } else if (e.data === window.YT.PlayerState.PLAYING) {
          context.emit('played')
        }
      })
    })
    onUnmounted(() => {
      player.value.destroy()
      setPlayer(null)
    })

    watch(
      () => props.videoId,
      () => {
        player.value.loadVideoById(props.videoId)
        if (props.autoplay) {
          player.value.playVideo()
        } else {
          player.value.stopVideo()
        }
      }
    )
    return {
      player,
    }
  },
})
</script>
