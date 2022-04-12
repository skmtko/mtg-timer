import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { YouTubePlayer } from 'youtube-player/dist/types'

// ストアのステートに対して型を定義します
export interface State {
  count: number
  player: null | YouTubePlayer
}

// インジェクションキーを定義します
export const playerKey: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    count: 0,
    player: null,
  },
  mutations: {
    setPlayer(state, payload: YouTubePlayer | null) {
      state.player = payload
    },
  },
})

export function useStore() {
  return baseUseStore(playerKey)
}
