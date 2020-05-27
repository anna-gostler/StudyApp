<template>
  <div>
    <Menu />
    <Charts :fontsize="12" />
    <vocab-list :vocabs="vocabs" />
  </div>
</template>

<script>
import VocabList from '~/components/VocabList.vue'
import Menu from '~/components/Menu.vue'
import Charts from '~/components/Charts.vue'

export default {
  components: {
    VocabList,
    Menu,
    Charts
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
