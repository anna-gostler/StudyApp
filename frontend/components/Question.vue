<template>
  <div class="question-container">
    <p v-html="vocab.kana" />
    <p v-html="vocab.kanji" />
  </div>
</template>

<script>
// import VocabList from '~/components/VocabList.vue'

export default {
  // components: {
  //  VocabList
  // },
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
  font-family: 'Kosugi', sans-serif;
  line-height: 200%;
  font-size: 25px;
  padding: 50px;
}
</style>
