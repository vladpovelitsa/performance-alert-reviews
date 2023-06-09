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
  modelValue: [String, Number]
});
</script>
<template>
  <label>
    <span class="label">
      {{ label }}
    </span>
    <input
      v-if="type !== 'textarea'"
      :class="[{ '--error': errorText }, 'input']"
      :disabled="disabled"
      :name="inputName"
      :placeholder="placeholder"
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <textarea
      v-else
      :class="[{ '--error': errorText }, 'input']"
      :disabled="disabled"
      :name="inputName"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    ></textarea>
    <span v-if="errorText" class="error">
      {{ errorText }}
    </span>
  </label>
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
