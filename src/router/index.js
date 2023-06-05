import { createRouter, createWebHistory, useRoute } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { app, db } from '@/firebase'
import { onMounted, ref } from 'vue'
import { doc, getDoc } from 'firebase/firestore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/EmployeesTableView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/registration',
      name: 'registration',
      component: () => import('../views/RegistrationView.vue')
    },
    {
      path: '/employees/:id',
      name: 'employee',
      component: () => import('../views/EmployeeView.vue')
    }
  ]
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListeners = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListeners()
        resolve(user)
      },
      reject
    )
  })
}
router.beforeEach(async (to, from, next) => {
  if (to.matched.some((route) => route.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      let userData = await getDoc(doc(db, 'users', getAuth().currentUser.uid))
      if ((to.name === 'home' && !userData.data().admin) || to.name === 'login') {
        alert('You don`t have access to this page!')
        next(from)
      } else {
        next()
      }
    } else {
      alert('Please log in!')
      next('/login')
    }
  } else {
    next()
  }
})
export default router
