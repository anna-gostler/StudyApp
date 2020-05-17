<template>
  <div id="menu">
    <router-link to="/card" tag="div" class="menu-button">
      Study
    </router-link>
    <router-link to="/progress" tag="div" class="menu-button">
      Progress
    </router-link>
  </div>
</template>

<script>

export default {
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
  }

.menu-button {
  cursor: pointer;
  margin-right: 20px;
  font-size: 14px;
  padding: 7px;
  padding-right: 40px;
}
</style>
