import { reactive, Ref } from 'vue'

const StorageKey = {
  video_id: 'video_id',
} as const
type StorageKey = typeof StorageKey[keyof typeof StorageKey]

export default function useYoutube(
  youtube: Ref<{ player: YT.Player }>,
  defaultId = 'RBjJc8o--tE'
) {
  const localStorageVId = localStorage.getItem(StorageKey.video_id) ?? ''

  const initialVideoId =
    localStorageVId.length > 10 ? localStorageVId : defaultId

  const state = reactive({
    temp: { video_id: initialVideoId },
    play: { video_id: initialVideoId },
  })

  const applyConfig = () => {
    state.play = Object.assign(state.play, state.temp)
    localStorage.setItem(StorageKey.video_id, state.play.video_id)
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
