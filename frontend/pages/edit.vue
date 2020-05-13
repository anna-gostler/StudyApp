<template>
  <div class="container">
    <h1 class="title">
      Q
    </h1>
    <vocab-list :vocabs="vocabs" />
  </div>
</template>

<script>
import VocabList from '~/components/VocabList.vue'

export default {
  components: {
    VocabList
  },
  async asyncData (ctx) {
    return {
      vocabs: await ctx.app.$services.vocab.findAll()
    }
  },
  data () {
    return {
      vocabs: {
        type: Array
      }
    }
  }
}
</script>
