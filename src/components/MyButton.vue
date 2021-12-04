<template>
  <button
    class="button"
    :type="nativeType"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'MyButton',
  props: {
    nativeType: {
      type: String,
      required: false,
    },
  },
}
</script>

<style scoped>
.button {
  border: solid 1px;
  border-radius: 9999px;
  padding-left: 10px;
  padding-right: 10px;
}
</style>
