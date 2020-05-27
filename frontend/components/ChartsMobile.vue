<template>
  <div class="charts-container">
    <div id="addedTodayContainer">
      {{ addedToday }} words added today / {{ maxAddedToday }}
      <div class="total" />
      <div class="part" :style="{ width: ((addedToday/maxAddedToday)*100) + '%' }" />
    </div>

    <div id="seenContainer">
      {{ seen }} seen / {{ total }} total number of words
      <div class="total" />
      <div class="part" :style="{ width: ((seen/total)*100) + '%' }" />
    </div>

    <div id="dueContainer">
      {{ due }} due today / {{ total }} total number of words
      <div class="total" />
      <div class="part" :style="{ width: ((due/total)*100) + '%' }" />
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      addedToday: {
        type: Number
      },
      maxAddedToday: {
        type: Number
      },
      total: {
        type: Number
      },
      seen: {
        type: Number
      },
      due: {
        type: Number
      }
    }
  },
  async beforeMount () {
    this.addedToday = await this.$services.vocab.countAddedToday()
    this.total = await this.$services.vocab.countTotal()
    this.seen = await this.$services.vocab.countSeen()
    this.due = await this.$services.vocab.countDue()

    this.maxAddedToday = this.$services.vocab.getMaxWordsAddedPerday()
  }

}
</script>

<style lang="scss">

.charts-container {
  height: 120px;
  margin-bottom: 10px;
  width: 100%;
  margin: auto;
}

#addedTodayContainer {
  position: relative;
  width: 100%;
  margin-top:15px;
  height: 10px;
}

#seenContainer {
  position: relative;
  width: 100%;
  margin-top:40px;
  height: 10px;
}

#dueContainer {
  position: relative;
  width: 100%;
  margin-top: 40px;
  height: 10px;
}

.part {
  height: 100%;
  background-color: var(--knew-it-color);
  position: absolute;
}

.total {
  height: 100%;
  background-color: var(--light-gray);
  position: absolute;
  width:100%;
}

</style>
