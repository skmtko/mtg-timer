<template>
  <div>
    <div class="timerContainer flex items-center justify-center">
      <div class="sticky top-4">
        <TimeDisplay :time="current">
          <template #prefix>
            <div class="mr-4">
              <MyButton @click="addMinutes(1)">
                <span class="text-xl">+ 1</span>
              </MyButton>
            </div>
          </template>
          <template #suffix>
            <div class="ml-4">
              <MyButton @click="addMinutes(-1)">
                <span class="text-xl">- 1</span>
              </MyButton>
            </div>
          </template>
        </TimeDisplay>
        <div class="mt-1">
          <MyButton
            size="lg"
            v-if="!isCounting"
            :disabled="!current"
            @click="countStart"
          >
            START
          </MyButton>
          <MyButton size="lg" v-if="isCounting" @click="countStop">
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

        <div class="mt-2">
          <MyButton :disabled="isCounting" title="切り上げ" @click="roundUp">
            RoundUp
          </MyButton>
        </div>
      </div>
    </div>

    <!-- <div class="mt-1">
      <MyButton @click="addCount(3)"> +1sec </MyButton>
    </div> -->

    <hr class="my-8" />

    <div class="p-4 pb-24 flex items-center justify-center">
      <MyPlayer
        ref="youtube"
        class="video flex-shrink-0"
        :video-id="state.play.video_id"
        :loop="state.play.loop"
        :width="480"
        :height="320"
      />
      <div class="ml-8 text-left editor">
        <div>
          <span class="mr-2">video_id :</span>
          <input v-model="state.temp.video_id" class="idInput" type="text" />
        </div>
        <div class="mt-2">
          <MyButton @click="applyConfig"> Apply video_id </MyButton>
        </div>

        <div class="mt-8">
          <p class="text-xs mb-1">
            使えそうなyoutubeIdのメモです<br />localStorageに自動保存されます
          </p>
          <textarea
            v-model="note"
            class="textarea w-full text-sm p-2"
            name="note"
            rows="12"
            @input="onUpdateNote"
          />
          <MyButton @click="onClickInitNote">メモのリセット</MyButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, Ref, watch } from 'vue'
import { debounce } from 'throttle-debounce'

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
      roundUp,
    } = useTimer()

    const addMinutes = (minutes) => {
      addCount(minutes * 60)
    }

    handleTimer()

    // eslint-disable-next-line no-undef
    const youtube: Ref<{ player: YT.Player }> = ref(null)
    const {
      state,
      applyConfig,
      playCurrentVideo,
      stopCurrentVideo,
      pauseCurrentVideo,
    } = useYoutube(youtube)

    watch(
      () => isCounting.value,
      (current) => {
        if (current) {
          playCurrentVideo()
        } else {
          stopCurrentVideo()
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
      // timer
      current,
      countStart,
      countStop,
      isCounting,
      countReset,
      addCount,
      roundUp,
      addMinutes,

      // youtube
      state,
      youtube,
      applyConfig,
      playCurrentVideo,
      stopCurrentVideo,
      pauseCurrentVideo,

      // note
      note,
      onUpdateNote,
      onClickInitNote,
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
