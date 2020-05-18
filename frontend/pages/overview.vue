<template>
  <div class="container">
    <router-link v-if="isMobile()" to="/cardmobile" tag="button" class="edit-button">
      Level 4
    </router-link>

    <router-link v-else to="/card" tag="button" class="edit-button">
      Level 4
    </router-link>
  </div>
</template>

<script>

export default {
  methods: {
    isMobile () {
      if (process.browser) {
        const UA = navigator.userAgent
        return (
          /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
                /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA))
      } else {
        console.log('could not identify device')
        return false
      }
    }
  }
}
</script>

<style lang="scss">
.container {
  width: 400px;
  margin: auto;
  margin-top: 50px;
  //outline: 2px solid black;
  //background-color: white;
  height: 100px;
  display: block;
  text-align: center;
  position: relative;
}

.edit-button {
  border: none;
  font-size: 20px;
  outline: 2px solid black;
  height: 40px;
  width: 100px;
  margin: 5px;
  cursor: pointer;
}

</style>
