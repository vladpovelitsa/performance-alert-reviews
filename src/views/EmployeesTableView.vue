<script setup>
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import { onMounted, ref } from "vue";
import { getAuth } from "firebase/auth";

let users = ref([]);

onMounted(async () => {
  const usersRes = await getDocs(collection(db, "users"));
  usersRes.forEach(user => {
    users.value.push(user.data());
  });
});
</script>
<template>
  <section class="user-table">
    <div class="user-table__row">
      <div class="user-table__cell">
        Name
      </div>
      <div class="user-table__cell">
        Position
      </div>
      <div class="user-table__cell">
        Last review
      </div>
      <div class="user-table__cell">
        Next review
      </div>
    </div>
    <div
      class="user-table__row"
      v-for="(user, index) in users"
      :key="index">
      <router-link :to="{name:'employee', params: {id: user.uid }}"
                   class="user-table__cell">
        {{ user.name }}
      </router-link>
      <div class="user-table__cell">
        {{ user.position }}
      </div>
      <div class="user-table__cell">
        {{ user.lastReview ? user.lastReview : "-"
        }}
      </div>
      <div class="user-table__cell">
        {{ user.nextReview ? user.nextReview : "-"
        }}
      </div>
      <div class="user-table__cell">
        <a :href="`mailto:${user.email}`"> Send email -> </a>
      </div>
    </div>
  </section>
  <!--  3. Создать страницу с таблицей всех сотрудников 3.1 Имя | Дата-->
  <!--  следующего ревью | Ссылка на страницу сотрудника 3.2 Сортировка по-->
  <!--  имени или дате-->
</template>
<style scoped>
.user-table {
  padding: 15px;
  border: 1px solid #ccc;
  margin: 40px 0;
}

.user-table__row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 90px;
  padding: 10px 5px;
  border-bottom: 1px solid rgba(255, 255, 255, .3);
  cursor: pointer;
  color: #fff;
  text-decoration: none;
  font-size: 14px;
  gap: 10px;
}

a.user-table__row:hover {
  opacity: .7;
}

.user-table__row:first-child {
  font-size: 12px;
}

.user-table__row:last-child {
  border-bottom: none;
}
</style>