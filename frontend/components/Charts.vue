<template>
  <div class="charts-container">
    <div id="addedTodayContainer">
      {{ addedToday }} words added today / {{ maxAddedToday }} maximum number of words added per day
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

// TODO use fontsize prop

export default {
  props: {
    fontsize: {
      type: Number,
      default () {
        return 10
      }
    }
  },
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
  height: 170px;
  margin-bottom: 10px;
  width: 700px;
  margin: auto;

}
#addedTodayContainer {
  position: relative;
  width: 100%;
  margin-top:20px;
}

#seenContainer {
  position: relative;
  width: 100%;
  margin-top:50px;
}

#dueContainer {
  position: relative;
  width: 100%;
  margin-top: 50px;
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
