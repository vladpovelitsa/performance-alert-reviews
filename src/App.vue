<script setup>
import { onMounted, ref } from "vue";
import { RouterLink, RouterView, useRouter } from "vue-router";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

let router = useRouter();
const isLoggedIn = ref(false);
const userEmail = ref("");
let auth;
onMounted(() => {
  auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
      userEmail.value = user.email;
    } else {
      isLoggedIn.value = false;
      userEmail.value = "";
    }
  });
});

const logOutHandler = () => {
  signOut(auth).then(() => {
    router.push("/login");
  });
};
</script>
<template>
  <header>
    <nav>
      <RouterLink to="/"> Home</RouterLink>
      |
      <RouterLink :to="{ name: 'registration' }"> Add new user</RouterLink>
    </nav>
    <span v-if="isLoggedIn">
      <router-link :to="{ name: 'employee', params: { id: getAuth().currentUser.uid } }">
        {{ userEmail }}
      </router-link>
      <button @click="logOutHandler">log out</button>
    </span>
    <span v-else>
      <RouterLink
        to="/login"
        v-if="$route.name !== 'login'"
      > Log in </RouterLink>
    </span>
  </header>
  <RouterView />
</template>
<style scoped>
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

button {
    cursor: pointer;
}
</style>
