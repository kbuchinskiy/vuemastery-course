<template>
  <div class="notification-bar" :class="notificationTypeClass">
    <p>{{ notification.message }}</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      timeout: null
    }
  },
  computed: {
    notificationTypeClass() {
      return `-text-${this.notification.type}`
    }
  },
  methods: mapActions('notification', ['remove']),
  beforeDestroy() {
    clearTimeout(this.timeout)
  },
  mounted() {
    this.timeout = setTimeout(() => {
      this.remove(this.notification.id)
    }, 5000)
  }
}
</script>

<style scoped>
.notification-bar {
  margin: 1em 0 1em;
}
</style>
