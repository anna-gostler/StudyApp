<template>
  <div id="menu">
    <router-link v-if="isMobile()" to="/cardmobile" tag="div" class="menu-button menu-button-left">
      Study
    </router-link>
    <router-link v-else to="/card" tag="div" class="menu-button menu-button-left">
      Study
    </router-link>

    <router-link v-if="isMobile()" to="/progressmobile" tag="div" class="menu-button">
      Progress
    </router-link>
    <router-link v-else to="/progress" tag="div" class="menu-button">
      Progress
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
#menu {
  //background-color: var(--knew-it-color);
  border-bottom: solid lightgrey 1px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.07);
  display: flex;
  justify-content: right;
  height:35px;
  position: relative;
  }

.menu-button {
  cursor: pointer;
  margin-right: 20px;
  font-size: 14px;
  padding: 7px;
  padding-right: 40px;
  right: 0;
  position: absolute;
}

.menu-button-left {
  right: 80px;
}
</style>
