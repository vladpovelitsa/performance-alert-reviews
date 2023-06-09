<script setup>
defineProps({
  buttonType: {
    type: String,
    default: 'submit'
  },
  buttonLabel: {
    type: String,
    default: 'Send'
  }
})
</script>

<template>
  <button :type="buttonType">
    {{ buttonLabel }}
  </button>
</template>

<style scoped>
button {
  display: block;
  width: min-content;
  white-space: nowrap;
  margin: 0 auto;
  padding: 10px 25px;
  text-transform: uppercase;
  border-radius: 20px;
  background: forestgreen;
  color: #fff;
  font-weight: 700;
  border: none;
  transition: 0.3s;
  cursor: pointer;
}
button:hover {
  opacity: 0.7;
}
</style>
