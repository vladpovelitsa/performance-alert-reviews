<script setup>
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import AppInput from "@/components/form/AppInput.vue";
import AppButton from "@/components/form/AppButton.vue";

let uid = useRoute().params.id;
let router = useRouter();
let user = ref({});
onMounted(async () => {
  let userData = await getDoc(doc(db, "users", uid));
  user.value = userData.data();
});
let isEditing = ref(false);
const updateUser = async () => {
  await setDoc(doc(db, "users", uid), {
    ...user.value
  });
};
const deleteUser = async () => {
  await deleteDoc(doc(db, "users", uid)).then(() => {
    router.push("/");
  });
};
</script>
<template>
  <form class="user-form">
    <app-input
      input-name="name"
      label="Name"
      placeholder="Enter your name"
      v-model="user.name"
      :disabled="!isEditing"
    />
    <app-input
      input-name="email"
      label="E-mail"
      placeholder="enter your email"
      :disabled="!isEditing"
      v-model="user.email"
    />
    <app-input
      input-name="position"
      label="Position"
      placeholder="enter your position"
      :disabled="!isEditing"
      v-model="user.position"
    />
    <app-input
      input-name="lastReview"
      label="Last review"
      placeholder=""
      type="date"
      :disabled="!isEditing"
      v-model="user.lastReview"
    />
    <app-input
      input-name="nextReview"
      label="Next review"
      placeholder=""
      type="date"
      :disabled="!isEditing"
      v-model="user.nextReview"
    />
    <app-input
      input-name="lastReviewNotice"
      label="Last review notice"
      placeholder="Enter notice about last review"
      type="textarea"
      :disabled="!isEditing"
      v-model="user.lastReviewNotice"
    />
    <app-input
      input-name="nextReviewGoals"
      label="Next review goals"
      placeholder="Enter goals for next review"
      type="textarea"
      :disabled="!isEditing"
      v-model="user.nextReviewGoals"
    />
    <app-button
      :button-label="isEditing ? 'Save' : 'Edit'"
      :class="[{'--warning': !isEditing}]"
      @click.prevent="[(isEditing = !isEditing), !isEditing ? updateUser() : null]"
    />
    <app-button
      button-label="Delete user"
      @click.prevent="deleteUser"
      class="--danger"
    />
  </form>
</template>
<style>
.user-form {
    max-width: 700px;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    margin: 50px auto;
}

label:first-child,
button {
    grid-column: 1 / -1;
}
</style>
