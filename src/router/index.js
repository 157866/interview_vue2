import Vue from "vue";
import VueRouter from 'vue-router'

import Login from '../components/MyLogin.vue'
import Home from '../components/home/home.vue'
import SavePassword from '../components/home/savePassword.vue'
import HomePageLimit from '../components/home/homePageLimit.vue'
import HomeDiary from '../components/home/homeDiary.vue'
import ShowDiary from '../components/home/diary/showDiary.vue'
import WriteDiary from '../components/home/diary/writeDiary.vue'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: 'savePassword',
          components: {
            savePasswordView: SavePassword
          }
        },
        {
          path: 'homePageLimit',
          components: {
            savePasswordView: HomePageLimit,
          }
        },
        {
          path: 'homeDiary',
          components: {
            savePasswordView: HomeDiary,
          },
          children: [
            {
              path: "showDiary",
              components: {
                diaryCheangeView: ShowDiary,
              }
            },
            {
              path: 'writeDiary',
              components: {
                diaryCheangeView: WriteDiary,
              },
            }
          ]
        }
      ]
    }

  ]
})


// 全局前置守卫
// router.beforeEach(function(to,from,next){

//   if(to.path === '/home'){
//     const token = localStorage.getItem('token')
//     if(token){
//       next()
//     }else{
//       next('/login')
//     }
//   }else{
//     next()
//   }

// })
export default router