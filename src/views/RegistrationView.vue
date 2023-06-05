<script setup>
import AppInput from "@/components/form/AppInput.vue";
import AppButton from "@/components/form/AppButton.vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
import {
  createUserWithEmailAndPassword,
  getAuth
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { db } from "@/firebase";

const router = useRouter();
const user = ref({
  email: "",
  pass: "",
  name: "",
  position: ""
});
let emailError = ref(null);
let passError = ref(null);
let nameError = ref(null);
let positionError = ref(null);
const register = function() {
  createUserWithEmailAndPassword(getAuth(), user.value.email, user.value.pass)
    .then((cred) => {
      setDoc(doc(db, "users", cred.user.uid), {
        uid: cred.user.uid,
        email: cred.user.email,
        lastReview: cred.user.metadata.createdAt,
        nextReview: +cred.user.metadata.createdAt + (86400000 * 90),
        name: user.value.name,
        position: user.value.position,
        admin: false,
        lastReviewNotice: "",
        nextReviewGoals: ""
      });
    }).then(() => {
    router.push({
      name: "employee",
      params: { id: getAuth().currentUser.uid }
    });

  }).catch((err) => {
    alert(err);
  });
};
</script>
<template>
  <form @submit.prevent>
    <h2>
      Create account
    </h2>
    <app-input :error-text="emailError"
               input-name="email"
               label="E-mail"
               placeholder="enter your email"
               @custom-input="(data) => user.email =
               data"
               type="email"
    />
    <app-input :error-text="passError"
               input-name="pass"
               label="Password"
               placeholder="enter your password"
               type="password"
               @custom-input="(data) => user.pass =
               data"
    />
    <app-input :error-text="nameError"
               input-name="name"
               label="Name"
               placeholder="enter your name"
               @custom-input="(data) => user.name =
               data"
    />
    <app-input :error-text="positionError"
               input-name="position"
               label="Position"
               placeholder="enter your position"
               @custom-input="(data) => user.position =
               data"
    />
    <app-button button-label="Register" @click.prevent="register" />
    <p>
      Already have account?
      <router-link :to="{name:'login'}">Log in</router-link>
    </p>
  </form>
</template>
<style scoped>
form {
  width: 100vw;
  max-width: 300px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #eee;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

button {
  margin-bottom: 20px;
}

h2 {
  text-align: center;
  margin: 0 0 25px;
  width: 100%;
}
</style>