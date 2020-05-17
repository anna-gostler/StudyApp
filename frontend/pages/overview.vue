<template>
  <div class="container">
    <router-link v-if="isMobile()" to="/cardmobile" tag="button" class="edit-button">
      study
    </router-link>

    <router-link v-else to="/card" tag="button" class="edit-button">
      study
    </router-link>

    <br>
    <router-link v-if="isMobile()" to="/progressmobile" tag="button" class="edit-button">
      progress
    </router-link>

    <router-link v-else to="/progress" tag="button" class="edit-button">
      progress
    </router-link>
  </div>
</template>

<script>

export default {
  methods: {
    isMobile () {
      if (process.browser) {
        let hasTouchScreen = false
        if ('maxTouchPoints' in navigator) {
          hasTouchScreen = navigator.maxTouchPoints > 0
        } else if ('msMaxTouchPoints' in navigator) {
          hasTouchScreen = navigator.msMaxTouchPoints > 0
        } else {
          const mQ = window.matchMedia && matchMedia('(pointer:coarse)')
          if (mQ && mQ.media === '(pointer:coarse)') {
            hasTouchScreen = !!mQ.matches
          } else if ('orientation' in window) {
            hasTouchScreen = true // deprecated, but good fallback
          } else {
          // Only as a last resort, fall back to user agent sniffing
            const UA = navigator.userAgent
            hasTouchScreen = (
              /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
                /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
            )
          }
        }
        return hasTouchScreen
      }
      return false
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
