<template>
  <div>
    <h1>Events Listing</h1>
    <h3>Events for {{ user.user.name }}</h3>
    <div class="controls-wrapper">
      <label>
        events per page
        <select v-model="perPage">
          <option
            v-for="option in perPageOptions"
            :key="option"
            :value="option"
            >{{ option }}</option
          >
        </select>
      </label>

      <div class="pagination">
        <router-link
          v-show="page !== 1"
          :to="{ name: 'event-list', query: { page: page - 1 } }"
          rel="prev"
          >prev</router-link
        >
        |
        <router-link
          v-if="showNextPage"
          :to="{ name: 'event-list', query: { page: page + 1 } }"
          rel="next"
          >next</router-link
        >
      </div>
    </div>

    <event-card v-for="event in event.events" :key="event.id" :event="event" />
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import { mapState } from 'vuex'
import store from '@/store'
import nprogress from 'nprogress'

function getEvents(to, next) {
  const currentPage = parseInt(to.query.page) || 1
  store
    .dispatch('event/fetchEvents', {
      page: currentPage
    })
    .then(() => {
      to.params.page = currentPage
      next()
    })
}

export default {
  name: 'event-list',
  components: {
    EventCard
  },
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      perPageOptions: [2, 3, 4]
    }
  },
  computed: {
    ...mapState(['event', 'user']),
    perPage: {
      get() {
        return this.$store.state.event.perPage
      },
      set(perPage) {
        this.$store.dispatch('event/setperPage', perPage)
        nprogress.start()
        this.$store
          .dispatch('event/fetchEvents', {
            perPage: perPage,
            page: this.page
          })
          .then(() => {
            nprogress.done()
          })
      }
    },
    showNextPage() {
      return this.page * this.event.perPage < this.event.eventsTotal
    }
  },
  created() {
    this.$store.dispatch('event/fetchEvents', {
      perPage: this.perPage,
      page: this.page
    })
  },
  beforeRouteEnter(to, from, next) {
    getEvents(to, next)
  },
  beforeRouteUpdate(to, from, next) {
    getEvents(to, next)
  }
}
</script>

<style scoped>
.controls-wrapper {
  display: flex;
  margin: 0 0 2vh;
  justify-content: space-between;
  flex-direction: row-reverse;
}

label {
  display: flex;
  justify-content: center;
  align-items: center;
}
select {
  width: min-content;
  height: 30px;
  margin-left: 10px;
}
</style>
