<template>
  <div class="charts-container">
    <!--
    words added today: {{ addedToday }} / {{ maxAddedToday }}
      -->
  </div>
</template>

<script>

export default {
  async asyncData (ctx) {
    return {
      addedToday: await ctx.app.$services.vocab.countAddedToday()
    }
  },
  data () {
    return {
      addedToday: {
        type: Number
      },
      maxAddedToday: this.$services.vocab.getMaxWordsAddedPerday()
    }
  }

}
</script>

<style lang="scss">

</style>
