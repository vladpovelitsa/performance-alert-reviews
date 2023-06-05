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
    routerllllllllllllll.push("/");
  });
};
</script>
<template>
  <form class="user-form">
    <app-input
      input-name="name"
      label="Name"
      placeholder="Enter your name"
      @custom-input="(data) => user.name = data"
      :disabled="!isEditing"
      :value="user.name"
    />
    <app-input
      input-name="email"
      label="E-mail"
      placeholder="enter your email"
      @custom-input="(data) => user.email = data"
      :disabled="!isEditing"
      :value="user.email"
    />
    <app-input
      input-name="position"
      label="Position"
      placeholder="enter your position"
      @custom-input="(data) => user.position = data"
      :disabled="!isEditing"
      :value="user.position"
    />
    <app-input
      input-name="lastReview"
      label="Last review"
      placeholder=""
      @custom-input="(data) => user.lastReview = data"
      type="date"
      :disabled="!isEditing"
      :value="user.lastReview"
    />
    <app-input
      input-name="nextReview"
      label="Next review"
      placeholder=""
      @custom-input="(data) => user.nextReview = data"
      type="date"
      :disabled="!isEditing"
      :value="user.nextReview"
    />
    <app-input
      input-name="lastReviewNotice"
      label="Last review notice"
      placeholder="Enter notice about last review"
      @custom-input="(data) => user.lastReviewNotice = data"
      type="textarea"
      :disabled="!isEditing"
      :value="user.lastReviewNotice"
    />
    <app-input
      input-name="nextReviewGoals"
      label="Next review goals"
      placeholder="Enter goals for next review"
      @custom-input="(data) => user.nextReviewGoals = data"
      type="textarea"
      :disabled="!isEditing"
      :value="user.nextReviewGoals"
    />
    <app-button :button-label="isEditing ? 'Save' : 'Edit' "
                @click.prevent="isEditing = !isEditing, !isEditing ? updateUser() : null" />
    <app-button button-label="Delete user"
                @click.prevent="deleteUser" />
  </form>
</template>
<style>
.user-form {
  max-width: 700px;
  width: 100%;
  display: grid;
  grid-template-columns:1fr 1fr;
  gap: 30px;
  margin: 50px auto;

}

label:first-child,
button {
  grid-column: 1 / -1;
}
</style>