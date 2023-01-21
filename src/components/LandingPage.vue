<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>Redirecting to the dashboard in 5 seconds...<br>
      <router-link to="/dashboard">If you are not redirected automatically click here.</router-link>
    </p>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
  props: {
    msg: String
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
