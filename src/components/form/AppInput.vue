<script setup>
defineProps({
  label: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: "text"
  },
  placeholder: {
    type: String,
    required: true
  },
  errorText: {
    type: String
  },
  inputName: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  value: {
    type: String
  }
});
</script>
<template>
  <label>
    <span class="label">
      {{ label }}
    </span> <input :disabled="disabled" :value="value"
                   :class="[{'--error': errorText}, 'input']"
                   :type="type"
                   :name="inputName"
                   :placeholder="placeholder"
                   @input="$emit('custom-input', $event.target.value)"
                   v-if="type !== 'textarea'"
  > <textarea :disabled="disabled" :value="value"
              :class="[{'--error': errorText}, 'input']"
              :name="inputName"
              :placeholder="placeholder"
              @input="$emit('custom-input', $event.target.value)"
              v-else></textarea> <span class="error" v-if="errorText">
      {{ errorText }}
    </span> </label>
</template>
<style scoped>
label {
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 10px;
  max-width: 100%;
  margin-bottom: 0;
}

input {
  padding: 10px;
}

textarea {
  resize: none;
  height: 100px;
}

.--error {
  border: 5px solid red;
}

.label {
  font-weight: 500;
}

.error {
  color: red;
  position: absolute;
  top: 100%;
  left: 10px;
}
</style>