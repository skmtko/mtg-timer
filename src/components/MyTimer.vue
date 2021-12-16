<template>
  <div>
    <div class="timerDisplay flex items-center justify-center">
      <div>
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

    <div class="p-4 flex items-center justify-center">
      <MyPlayer
        ref="youtube"
        class="video flex-shrink-0"
        :videoid="state.play.video_id"
        :loop="state.play.loop"
        :width="480"
        :height="320"
      />
      <div class="ml-8 text-left editor">
        <div>
          <span class="mr-2">video_id :</span>
          <input v-model="state.temp.video_id" class="input" type="text" />
        </div>
        <div class="mt-2">
          <MyButton @click="applyConfig"> Apply video_id </MyButton>
        </div>

        <div class="mt-8">
          <textarea
            v-model="memo"
            class="textarea w-full"
            name="memo"
            rows="10"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, Ref, watch } from 'vue'
import TimeDisplay from './TimeDisplay.vue'
import MyPlayer from './MyPlayer.vue'
import MyButton from './MyButton.vue'
import useTimer from '../composables/useTimer'
import useYoutube from '../composables/useYoutube'

const defaultMemo = `パワーホール（長州力の入場曲）
4EAwzCoAViI

軽快なJazz
MNENa7PTmQY

タブラ演奏
nCBHZ9NbCLM

X JAPAN - 紅 (Tokyo Dome 2009.05.03)
xR4qXUwsp9Q
`

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

    const memo = ref(defaultMemo)

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

      // memo
      memo,
    }
  },
})
</script>
<style scoped>
.timerDisplay {
  height: 65vh;
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
</style>
