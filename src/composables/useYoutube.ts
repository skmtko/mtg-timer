import { reactive, Ref } from "vue"

export default function useYoutube(
  youtube: Ref<{ player: YT.Player }>,
  defaultId = '4EAwzCoAViI'
) {
  const state = reactive({
    temp: { video_id: defaultId, loop: 1 },
    play: { video_id: defaultId, loop: 1 },
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
  return {
    state,
    applyConfig,
    playCurrentVideo,
    stopCurrentVideo,
    pauseCurrentVideo,
  }
}
