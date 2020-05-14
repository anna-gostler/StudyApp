<template>
  <div>
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
