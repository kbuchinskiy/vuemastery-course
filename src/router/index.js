import Vue from 'vue'
import VueRouter from 'vue-router'
import EventList from '../views/EventList'
import EventCreate from '../views/EventCreate'
import EventShow from '../views/EventShow'
import nprogress from 'nprogress'
import store from '@/store/'
import NotFound from '@/views/NotFound'
import NetworkIssue from '@/views/NetworkIssue'
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventList,
      props: true
    },
    {
      path: '/event/create',
      name: 'event-create',
      component: EventCreate
    },
    {
      path: '/event/:id',
      name: 'event-show',
      component: EventShow,
      props: true,
      beforeEnter(to, from, next) {
        store
          .dispatch('event/fetchEvent', to.params.id)
          .then(event => {
            to.params.event = event
            next()
          })
          .catch(error => {
            if (error.response && error.response.status === 404) {
              next({ name: '404', params: { resource: 'event' } })
            } else {
              next({ name: 'network-issue' })
            }
          })
      }
    },
    {
      path: '/404',
      name: '404',
      component: NotFound,
      props: true
    },
    {
      path: '/network-issue',
      name: 'network-issue',
      component: NetworkIssue
    },
    {
      path: '*',
      redirect: { name: '404', params: { resource: 'page' } }
    }
  ]
})

router.beforeEach((routeTo, routeFrom, next) => {
  nprogress.start()
  next()
})

router.afterEach(() => {
  nprogress.done()
})

export default router
