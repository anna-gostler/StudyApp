<template>
  <div class="container">
    <router-link to="/card" tag="button" class="edit-button">
      study
    </router-link>
    <br>
    <router-link to="/progress" tag="button" class="edit-button">
      progress
    </router-link>
  </div>
</template>

<script>

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
  font-size: 20px;
  outline: 2px solid black;
  height: 40px;
  width: 100px;
  margin: 5px;
  cursor: pointer;
}

</style>
