<template>
  <div class="question-container">
    <p v-html="vocab.kana" />
    <p :class="{ kanji: vocab.type === 'kanji' }" v-html="vocab.kanji" />
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

.kanji {
  font-size: 60px;
  margin-top: 20px;
}

.question-container {
  font-family: 'Kosugi', 'MS Gothic', sans-serif;
  line-height: 200%;
  font-size: 25px;
  padding: 50px;
}
</style>
