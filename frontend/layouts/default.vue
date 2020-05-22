<template>
  <div>
    <nuxt />
  </div>
</template>

<style>

:root {
  --knew-it-color: #ABE188;
  --nope-color: #FF8360;
  --light-gray: #f2f2f2;
}

html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.container {
  margin: 0 auto;
  min-height: 100vh;
}

.title {
  font-family:  "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: normal;
  font-size: 40px;
  color: black;
  letter-spacing: 1px;
  margin-top: 20px;
  text-align: center;
}

.button {
  background-color: var(--light-gray);
  margin: 0px;
  border-radius: 0px;
}

</style>
