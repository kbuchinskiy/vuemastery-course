<template>
  <div>
    <h1>Events Listing</h1>
    <h3>Events for {{ user.user.name }}</h3>
    <div class="controls-wrapper">
      <label>
        events per page
        <select v-model="eventsPerPage">
          <option
            v-for="option in eventsPerPageOptions"
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
export default {
  name: 'event-list',
  components: {
    EventCard
  },
  data() {
    return {
      eventsPerPageOptions: [2, 3, 4]
    }
  },
  computed: {
    ...mapState(['event', 'user']),
    eventsPerPage: {
      get() {
        return this.$store.state.event.eventsPerPage
      },
      set(eventsPerPage) {
        this.$store.dispatch('event/setEventsPerPage', eventsPerPage)
        this.$store.dispatch('event/fetchEvents', {
          perPage: eventsPerPage,
          page: this.page
        })
      }
    },
    page() {
      return parseInt(this.$route.query.page) || 1
    },
    showNextPage() {
      return this.page * this.eventsPerPage < this.event.eventsTotal
    }
  },
  created() {
    this.$store.dispatch('event/fetchEvents', {
      perPage: this.eventsPerPage,
      page: this.page
    })
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
