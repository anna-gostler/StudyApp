<template>
  <div class="question-container">
    <p v-html="vocab.kana" />
    <p v-html="vocab.kanji" />
  </div>
</template>

<script>

export default {
  props: {
    vocab: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style lang="scss">

.question-container {
  font-family: 'Kosugi', 'MS Gothic', sans-serif;
  line-height: 200%;
  font-size: 25px;
  padding: 50px;
}
</style>
