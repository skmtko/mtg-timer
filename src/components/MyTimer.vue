<template>
  <div>
    <div class="timerContainer flex items-center justify-center">
      <div class="sticky top-4">
        <TimeDisplay :time="current">
          <template #prefix>
            <div class="mr-4 flex flex-col">
              <span
                class="bg-gray-700 block rounded text-white px-4 mb-1 text-xs"
              >1min</span>
              <MyButton @click="addMinutes(1)">
                <span class="text-md">＋</span>
              </MyButton>
              <MyButton
                class="mt-1"
                @click="addMinutes(-1)"
              >
                <span class="text-md">−</span>
              </MyButton>
            </div>
          </template>
          <template #suffix>
            <div class="ml-4 flex flex-col">
              <span
                class="bg-gray-700 block rounded text-white px-4 mb-1 text-xs"
              >30sec</span>
              <MyButton @click="addMinutes(0.5)">
                <span class="text-md">＋</span>
              </MyButton>
              <MyButton
                class="mt-1"
                @click="addMinutes(-0.5)"
              >
                <span class="text-md">−</span>
              </MyButton>
            </div>
          </template>
        </TimeDisplay>
        <div class="mt-1">
          <MyButton
            v-if="!isCounting"
            size="lg"
            :disabled="!current"
            @click="countStart"
          >
            START
          </MyButton>
          <MyButton
            v-if="isCounting"
            size="lg"
            @click="onClickStop"
          >
            STOP
          </MyButton>

          <MyButton
            size="lg"
            class="ml-2"
            :disabled="isCounting"
            @click="countReset"
          >
            RESET
          </MyButton>
        </div>
      </div>
    </div>

    <!-- <div class="mt-1">
      <MyButton @click="addCount(3)">
        +3sec
      </MyButton>
    </div> -->

    <div class="flex items-center justify-center text-base">
      <label class="cursor-pointer mr-4">
        <input
          type="checkbox"
          :checked="isChimeActive"
          @input="toggleChime"
        >
        終了チャイム
      </label>
      <audio
        ref="chime"
        :class="{'opacity-40': !isChimeActive}"
        :src="chimeAsset"
        controls
      />
    </div>

    <hr class="my-8">

    <div class="p-4 pb-24 flex items-center justify-center">
      <MyPlayer
        class="video flex-shrink-0"
        :video-id="state.play.video_id"
        :autoplay="isCounting"
        :width="480"
        :height="320"
      />
      <div class="ml-8 text-left editor">
        <div>
          <span class="mr-2">video_id :</span>
          <input
            v-model="state.temp.video_id"
            class="idInput"
            type="text"
          >
        </div>
        <div class="mt-2">
          <MyButton @click="applyConfig">
            Apply video_id
          </MyButton>
        </div>

        <div class="mt-8">
          <p class="text-xs mb-1">
            使えそうなyoutubeIdのメモです<br>localStorageに自動保存されます
          </p>
          <textarea
            v-model="note"
            class="textarea w-full text-sm p-2"
            name="note"
            rows="12"
            @input="onUpdateNote"
          />
          <MyButton @click="onClickInitNote">
            メモのリセット
          </MyButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { debounce } from 'throttle-debounce'

import chimeAsset from '@/assets/audio/chime.mp3'

import TimeDisplay from './TimeDisplay.vue'
import MyPlayer from './MyPlayer.vue'
import MyButton from './MyButton.vue'
import useTimer from '../composables/useTimer'
import useYoutube from '../composables/useYoutube'
import useNote from '../composables/useNote'

export default defineComponent({
  name: 'MyTimer',
  components: {
    TimeDisplay,
    MyPlayer,
    MyButton,
  },
  setup() {
    const {
      handleTimer,
      current,
      countStart,
      countStop,
      isCounting,
      countReset,
      addCount,
    } = useTimer()

    const addMinutes = (minutes) => {
      addCount(minutes * 60)
    }

    handleTimer()
    const { state, applyConfig, playCurrentVideo, stopCurrentVideo } =
      useYoutube()

    const isChimeActive = ref(true)
    const chime = ref<HTMLAudioElement | null>()
    const toggleChime = () => {
      isChimeActive.value = !isChimeActive.value
    }
    const playChime = () => {
      if (chime.value && isChimeActive.value) {
        chime.value.load()
        chime.value.play()
      }
    }
    const flagClickStop = ref(false)
    const onClickStop = () => {
      flagClickStop.value = true
      countStop()
    }

    watch(
      () => isCounting.value,
      (current) => {
        if (current) {
          playCurrentVideo()
        } else {
          stopCurrentVideo()
          if (!flagClickStop.value) {
            playChime()
          }
          flagClickStop.value = false
        }
      }
    )

    const { note, initNote, resetNote, updateStorageNote } = useNote()

    initNote()

    const onUpdateNote = debounce(1500, false, () => {
      updateStorageNote()
    })

    const onClickInitNote = () => {
      if (confirm('メモをリセットしますか？')) {
        resetNote()
        updateStorageNote()
      }
    }

    return {
      chimeAsset,

      onClickStop,
      isChimeActive,
      toggleChime,
      // timer
      current,
      countStart,
      countStop,
      isCounting,
      countReset,
      addCount,
      addMinutes,

      // youtube
      state,
      applyConfig,

      // note
      note,
      onUpdateNote,
      onClickInitNote,

      // chime
      chime,
    }
  },
})
</script>
<style scoped>
.timerContainer {
  height: 60vh;
}
.video {
  width: 480px;
}
.editor {
  width: 480px;
}
.textarea {
  border-style: solid;
  border-width: 1px;
}
.idInput {
  border-style: solid;
  border-width: 1px;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  border-radius: 9999px;
}
</style>
