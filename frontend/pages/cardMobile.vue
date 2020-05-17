<template>
  <div>
    <Menu />
    mobile version
    <div class="card-container">
      <div v-if="show">
        <Answer :vocab="currentVocab" />
        <button class="good-button button" @click="answerKnown">
          <img src="../icons/happy.svg" alt="arrow down" width="30px">
        </button>
        <button class="bad-button button" @click="answerNotKnown">
          <img src="../icons/confused.svg" alt="arrow down" width="30px">
        </button>
      </div>
      <div v-if="!show">
        <Question :vocab="currentVocab" />
        <button class="show-button button" @click="showAnswer">
          <img src="../icons/eye.svg" alt="arrow down" width="30px">
        </button>
      </div>
    </div>
  </div>
</template>

<script>

import Answer from '~/components/Answer.vue'
import Question from '~/components/Question.vue'
import Menu from '~/components/Menu.vue'

export default {
  components: {
    Answer,
    Question,
    Menu
  },
  async asyncData (ctx) {
    return {
      currentVocab: await ctx.app.$services.vocab.getNextVocab()
    }
  },
  data () {
    return {
      currentVocab: {
        type: Object
      },
      nextVocab: {
        type: Object
      },
      show: false
    }
  },
  methods: {
    async showAnswer () {
      console.log('show answer')
      this.show = true
      this.nextVocab = await this.$services.vocab.getNextVocab()
    },
    answerKnown () {
      this.$services.vocab.correctAnswer(this.currentVocab)
      this.showNextQuestion()
    },
    answerNotKnown () {
      this.$services.vocab.incorrectAnswer(this.currentVocab)
      this.showNextQuestion()
    },
    showNextQuestion () {
      this.currentVocab = this.nextVocab
      this.show = false
    }
  }
}
</script>

<style lang="scss">
.card-container {
  width: 90%;
  margin: auto;
  margin-top: 50px;
  outline: 2px solid black;
  background-color: white;
  height: 90%;
  display: block;
  text-align: center;
  position: relative;
}

.button {
  border: none;
  position: absolute;
  bottom: 0;
  font-size: 20px;
  outline: 2px solid black;
  margin: 0px;
  cursor: pointer;
}

.show-button {
  /*
  width: 20%;
  background-color: lightgray;
  left: 100%;
  height: 100%;
  */
  width: 100%;
  //background-color: white;
  left: 0%;
  height: 20%
}

.good-button {
  width: 50%;
  height: 20%;
  background-color: var(--knew-it-color);
  left: 50%;
  /*
  padding-left: 6px;
  padding-right: 4px;
  padding-top: 4px;
  padding-bottom: 4px;
  background-image:
  linear-gradient(to bottom, #ABE188 0%, #ABE188 100%),
  linear-gradient(to bottom, #DFF2D8 0%, #DFF2D8 100%);
  background-clip: content-box, padding-box;
  */
}

.bad-button {
  width: 50%;
  height: 20%;
  left: 0%;
  /*
  padding-left: 4px;
  padding-right: 4px;
  padding-top: 4px;
  padding-bottom: 4px;
  background-image:
  linear-gradient(to bottom, #FAC1F2 0%, #FAC1F2 100%),
  linear-gradient(to bottom, white 0%, white 100%);
  background-clip: content-box, padding-box;
  */
}
</style>
