<template>
  <div
    id="my-youtube-vue-player"
    ref="player"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PlayerFactory from 'youtube-player'
import { YouTubePlayer } from 'youtube-player/dist/types'

const convertBooleanToIO = (v: boolean): 0 | 1 => {
  if(v) return 1
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
  data(): { player: null | YouTubePlayer } {
    return {
      player: null
    }
  },
  watch: {
    videoId() {
      this.player.loadVideoById(this.videoId)
      if (this.autoplay) {
        this.player.playVideo()
      } else {
        this.player.stopVideo()
      }
    },
  },
  mounted() {
    const playerVars = {
      autoplay: convertBooleanToIO(this.autoplay),
      loop: convertBooleanToIO(this.loop),
    }
    this.player = PlayerFactory('my-youtube-vue-player', {
      host: 'https://www.youtube.com',
      width: this.width,
      height: this.height,
      videoId: this.videoId,
      playerVars,
    })

    this.player.on('stateChange', (e) => {
      if (e.data === window.YT.PlayerState.ENDED) {
        this.$emit('ended')
      } else if (e.data === window.YT.PlayerState.PAUSED) {
        this.$emit('paused')
      } else if (e.data === window.YT.PlayerState.PLAYING) {
        this.$emit('played')
      }
    })
  },
  unmounted() {
    this.player.destroy()
    delete this.player
  },
})
</script>
