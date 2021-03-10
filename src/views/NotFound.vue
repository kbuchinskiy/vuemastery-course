<template>
  <div>
    <h1>Ops</h1>
    <h2>The {{ resource }} you`re loking for is not here.</h2>
    <router-link :to="{ name: 'event-list' }"
      >Back to the home page</router-link
    >
  </div>
</template>

<script>
export default {
  props: {
    resource: {
      type: String,
      default: 'page'
    }
  }
}
</script>
