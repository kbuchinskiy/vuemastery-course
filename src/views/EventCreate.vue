<template>
  <div>
    <h1>Create an Event</h1>
    <form @submit.prevent="createEvent">
      <label>Select a category</label>
      <select v-model="event.category">
        <option v-for="cat in categories" :key="cat">{{ cat }}</option>
      </select>

      <h3>Name & describe your event</h3>

      <base-input
        v-model="event.title"
        type="text"
        placeholder="Add a title"
        label="Title"
        class="field"
      />

      <base-input
        v-model="event.description"
        type="text"
        placeholder="Add a description"
        label="Description"
        class="field"
      />

      <h3>Where is your event?</h3>

      <base-input
        v-model="event.location"
        type="text"
        placeholder="Add a location"
        label="Location"
        class="field"
      />
      <h3>When is your event?</h3>

      <div class="field">
        <label>Date</label>
        <datepicker v-model="event.date" placeholder="Select a date" />
      </div>

      <div class="field">
        <label>Select a time</label>
        <select v-model="event.time">
          <option v-for="time in times" :key="time">{{ time }}</option>
        </select>
      </div>

      <input type="submit" class="button -fill-gradient" value="Submit" />
    </form>
  </div>
</template>

<script>
import nprogress from 'nprogress'
import Datepicker from 'vuejs-datepicker'
export default {
  name: 'event-create',
  components: {
    Datepicker
  },
  data() {
    const times = []
    for (let i = 0; i <= 24; i++) {
      times.push(i + ':00')
    }
    return {
      times,
      categories: this.$store.state.categories,
      event: this.createFreshEventObject()
    }
  },
  methods: {
    createEvent() {
      nprogress.start()
      this.$store
        .dispatch('event/createEvent', this.event)
        .then(() => {
          this.$router.push({
            name: 'event-show',
            params: { id: this.event.id }
          })
          this.event = this.createFreshEventObject()
        })
        .catch(() => {
          nprogress.done()
        })
    },
    createFreshEventObject() {
      const { user } = this.$store.state.user.user
      const id = Math.floor(Math.random() * 10000000)
      return {
        id,
        user,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: []
      }
    }
  }
}
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
