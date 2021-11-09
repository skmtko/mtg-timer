<template>
  <div>
    <TimeDisplay :time="current" />

    <div class="mt-1">
      <MyButton @click="countStart">Start</MyButton>
      <MyButton class="ml-2 button" @click="countStop">Stop</MyButton>
    </div>

    <div class="mt-1">
      <MyButton @click="countRest">reset</MyButton>
    </div>

    <div class="mt-1">
      <MyButton @click="addCount(3)">3+</MyButton>
    </div>

    <hr />

    <Player />
  </div>
</template>

<script>
import { ref } from "vue";
import TimeDisplay from "./TimeDisplay.vue";
import Player from "./Player.vue";
import MyButton from "./MyButton.vue";
export default {
  name: "Timer",
  components: {
    TimeDisplay,
    Player,
    MyButton,
  },
  setup() {
    const limit = 10;
    const current = ref(limit);
    const isCounting = ref(false);

    const addCount = (s = 10) => {
      current.value = current.value + s;
    };

    const countStart = () => {
      isCounting.value = true;
    };
    const countStop = () => {
      isCounting.value = false;
    };
    const countRest = () => {
      if (!isCounting.value) {
        current.value = limit;
      }
    };

    const countDown = () => {
      if (current.value <= 0) {
        countStop();
        return;
      }
      current.value = current.value - 1;
    };

    const flame = 1000;
    const handleTimer = () => {
      setTimeout(() => {
        if (isCounting.value) {
          countDown();
        }
        handleTimer();
      }, flame);
    };
    handleTimer();

    return {
      current,
      countStart,
      countStop,
      isCounting,
      countRest,
      addCount,
    };
  },
};
</script>