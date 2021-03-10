<template>
  <div>
    <h1>Uh-oh!</h1>
    <h3>
      It's look like you're experiencing some network issues, please click the
      back button and try again
    </h3>
    <router-link :to="{ name: 'event-list' }"
      >Back to the home page</router-link
    >
  </div>
</template>

<script>
export default {}
</script>

<style scoped></style>
