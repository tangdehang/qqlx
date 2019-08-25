import Vue from 'vue'
import Router from 'vue-router'

const Login = (resolve) => {
  import('@/pages/login').then((module) => {
    resolve(module)
  })
}

const News = (resolve) => {
  import('@/pages/news').then((module) => {
    resolve(module)
  })
}

const Message = (resolve) => {
  import('@/pages/message').then((module) => {
    resolve(module)
  })
}
const Room = (resolve) => {
  import('@/pages/room').then((module) => {
    resolve(module)
  })
}
const Person = (resolve) => {
  import('@/pages/person').then((module) => {
    resolve(module)
  })
}
const Group = (resolve) => {
  import('@/pages/group').then((module) => {
    resolve(module)
  })
}
const GroupRoom = (resolve) => {
  import('@/pages/groupRoom').then((module) => {
    resolve(module)
  })
}

const Dynamic = (resolve) => {
  import('@/pages/dynamic').then((module) => {
    resolve(module)
  })
}
const Upload = (resolve) => {
  import('@/base/upload').then((module) => {
    resolve(module)
  })
}

Vue.use(Router)
const router = new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      redirect: '/news'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/upload',
      component: Upload
    },
    {
      path: '/news',
      component: News,
      redirect: '/news/message',
      children: [
        {
          path: 'message',
          component: Message,
          meta: {
            url: '/news/message'
          },
          children: [
            {
              path: 'room',
              component: Room
            },
          ]
        },
        {
          path: 'person',
          component: Person,
          children: [
            {
              path: 'room',
              component: Room
            },
          ]
        },
        {
          path: 'group',
          component: Group,
          meta: {
            url: '/news/group'
          },
          children: [
            {
              path: 'groupRoom',
              component: GroupRoom,
            },
          ]
        },
        {
          path: 'dynamic',
          component: Dynamic,
          meta: {
            url: '/news/dynamic'
          },
        }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    next()
  } else {
    if (!localStorage.getItem('token')) {
      next({path: '/login'})
    } else {
      next()
    }
  }

})
export default router

