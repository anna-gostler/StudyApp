<template>
  <div>
    <Menu />
    <vocab-list-mobile :vocabs="vocabs" />
  </div>
</template>

<script>
import VocabListMobile from '~/components/VocabListMobile.vue'
import Menu from '~/components/Menu.vue'

export default {
  components: {
    VocabListMobile,
    Menu
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
