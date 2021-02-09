<template>
  <div>
    <h1>Events Listing</h1>
    <event-card v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService.js'
export default {
  name: 'event-list',
  components: {
    EventCard
  },
  data() {
    return {
      events: []
    }
  },
  created() {
    EventService.getEvents()
      .then(response => {
        this.events = response.data
      })
      .catch(error => {
        console.log('An error occurred ' + error.response)
      })
  }
}
</script>

<style></style>
