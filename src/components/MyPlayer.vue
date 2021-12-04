<template>
  <div>
    <div>
      video_id : <input
        v-model="state.temp.video_id"
        type="text"
      ><br>
      <MyButton @click="applyConfig">
        Apply
      </MyButton>
      <MyButton @click="playCurrentVideo">
        Play
      </MyButton>
      <MyButton @click="stopCurrentVideo">
        Stop
      </MyButton>
      <MyButton @click="pauseCurrentVideo">
        Pause
      </MyButton>
    </div>
    <YoutubeVue3
      ref="youtube"
      :videoid="state.play.video_id"
      :loop="state.play.loop"
      :width="480"
      :height="320"
      @ended="log('onEnded')"
      @paused="log('onPaused')"
      @played="log('onPlayed')"
    />
  </div>
</template>

<script lang="ts">
import MyButton from './MyButton.vue'
import { YoutubeVue3 } from 'youtube-vue3'
import {
  defineComponent,
  onMounted,
  reactive,
  Ref,
  ref,
} from '@vue/runtime-core'
type YT = any

export default defineComponent({
  name: 'MyPlayer',
  components: {
    MyButton,
    YoutubeVue3,
  },
  setup() {
    const state = reactive({
      temp: { video_id: '3P1CnWI62Ik', loop: 1 },
      play: { video_id: '3P1CnWI62Ik', loop: 1 },
    })

    const youtube: Ref<{ player: YT.Player }> = ref(null)

    onMounted(() => {
      console.log(youtube.value) // <div/>
    })

    const applyConfig = () => {
      state.play = Object.assign(state.play, state.temp)
    }
    const playCurrentVideo = () => {
      youtube.value.player.playVideo()
    }
    const stopCurrentVideo = () => {
      youtube.value.player.stopVideo()
    }
    const pauseCurrentVideo = () => {
      youtube.value.player.pauseVideo()
    }
    const log = (m: string) => {
      console.log(m)
    }

    return {
      state,
      youtube,
      applyConfig,
      playCurrentVideo,
      stopCurrentVideo,
      pauseCurrentVideo,

      log,
    }
  },
})
</script>
