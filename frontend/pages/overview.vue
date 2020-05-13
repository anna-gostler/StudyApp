<template>
  <div class="container">
    <h1 class="title">
      Overview
    </h1>

    <router-link to="/card" tag="button" class="edit-button">
      study
    </router-link>
  </div>
</template>

<script>

// <router-link to="/edit" tag="button" class="edit-button">
//  edit
// </router-link>

export default {
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
  //position: absolute;
  //bottom: 0;
  font-size: 20px;
  outline: 2px solid black;
  height: 40px;
  width: 100px;
  margin: 5px;
}

</style>
