import { computed, reactive } from 'vue'
import { YouTubePlayer } from 'youtube-player/dist/types'
import { useStore } from '../store'

const StorageKey = {
  video_id: 'video_id',
} as const
type StorageKey = typeof StorageKey[keyof typeof StorageKey]

const defaultId = 'RBjJc8o--tE'

export default function useYoutube() {
  const store = useStore()
  const player = computed(() => store.state.player)
  const setPlayer = (player: YouTubePlayer | null) =>
    store.commit('setPlayer', player)

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
    player.value.playVideo()
  }
  const stopCurrentVideo = () => {
    player.value.stopVideo()
  }
  const pauseCurrentVideo = () => {
    player.value.pauseVideo()
  }
  return {
    state,
    setPlayer,
    applyConfig,
    playCurrentVideo,
    stopCurrentVideo,
    pauseCurrentVideo,
  }
}
