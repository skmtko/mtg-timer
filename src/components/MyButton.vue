<template>
  <button
    class="button"
    :class="{
      'px-4 text-base': size === 'base',
      'px-6 py-1 text-xl': size === 'lg',
    }"
    :type="nativeType"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

type Size = 'base' | 'lg'

export default defineComponent({
  name: 'MyButton',
  props: {
    nativeType: {
      type: String,
      required: false,
      default: undefined,
    },
    disabled: {
      type: Boolean,
      default: undefined,
    },
    size: {
      type: String as PropType<Size>,
      default: 'base',
    },
  },
})
</script>

<style scoped>
.button {
  border: solid 1px;
  border-radius: 9999px;
}
.button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
