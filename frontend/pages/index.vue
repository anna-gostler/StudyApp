<template>
  <div class="container">
    <h1 class="title">
      Login
    </h1>
    <form action="post" @submit.prevent="performLogin">
      <p>
        <input
          id="username"
          v-model="username"
          type="text"
          name="username"
          placeholder="Username"
          required
          autofocus
        >
      </p>
      <p>
        <input
          id="password"
          v-model="password"
          type="password"
          name="password"
          placeholder="Password"
          required
        >
      </p>
      <button type="submit">
        Sign in
      </button>
      <div id="infobox">
        Test Account <br> Username: user <br> Password: password
      </div>
    </form>
  </div>
</template>
<script>

export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async performLogin () {
      if (await this.$services.login.performLogin(this.username, this.password)) {
        this.$router.push('overview')
      } else {
        this.username = ''
        this.password = ''
      }
    }
  }
}
</script>
<style>
form {
  width: 200px;
  margin: auto;
  text-align: center;
}

input {
  width: 100%;
  border: 2px black solid;
  background: none;
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-weight: 300;
  padding-left: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  outline: none;
}

button {
  width: 100%;
  height: 50px;
  border: none;
  background-color: #ABE188;
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  outline: none;
  margin-top: 20px;
}

#infobox {
  margin-top: 10px;
  padding: 10px;
  background-color: #f2f2f2;;
}
</style>
