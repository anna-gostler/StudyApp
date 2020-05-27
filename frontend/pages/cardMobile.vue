<template>
  <div :class="{ 'portrait-mode': this.isPortrait }">
    <Menu />
    <div class="card-container" :class="{'portrait-mode': this.isPortrait}">
      <div v-if="done">
        <Done />
      </div>

      <div v-if="show && !done">
        <Answer-mobile :vocab="currentVocab" :rows="this.currentRows" />
        <button class="good-button button" @click="answerKnown">
          <img src="../icons/happy.svg" alt="arrow down" width="30px">
        </button>
        <button class="bad-button button" @click="answerNotKnown">
          <img src="../icons/confused.svg" alt="arrow down" width="30px">
        </button>
      </div>
      <div v-if="!show && !done" style="height:100%">
        <Question :vocab="currentVocab" />
        <button class="show-button button" @click="showAnswer">
          <img src="../icons/eye.svg" alt="arrow down" width="30px">
        </button>
      </div>
    </div>
    <!--
    <ol id="example-1">
      <li v-for="c in currentVocabs" :key="c.id" :style="{'display':'none'}">
        {{ c.english }} {{ c.duedate }} progress: {{ c.progress }}
      </li>
    </ol>
    -->
  </div>
</template>

<script>

import AnswerMobile from '~/components/AnswerMobile.vue'
import Question from '~/components/Question.vue'
import Done from '~/components/Done.vue'
import Menu from '~/components/Menu.vue'

export default {
  components: {
    AnswerMobile,
    Question,
    Done,
    Menu
  },
  async asyncData (ctx) {
    return {
      currentVocab: await ctx.app.$services.vocab.getNextVocab()
      // currentVocabs: await ctx.app.$services.vocab.getCurrentVocabs() // TEST
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
      currentRows: 10,
      show: false,
      orientation: this.setOrientation(),
      isPortrait: true,
      done: false
    }
  },
  async beforeMount () {
    window.addEventListener('resize', this.resizeHandler)
    await this.$services.vocab.fillCurrentVocabs()
  },
  created () {
    if (this.currentVocab === undefined) {
      console.log('done')
      this.done = true
    }
  },
  destroyed () {
    window.removeEventListener('resize', this.resizeHandler)
  },
  methods: {
    async showAnswer () {
      console.log('show answer')
      this.show = true
      this.nextVocab = await this.$services.vocab.getNextVocab()
      // this.currentVocabs = await this.$services.vocab.getCurrentVocabs() // TEST
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
      if (this.currentVocab === undefined) {
        this.done = true
      }
    },
    resizeHandler (e) {
      this.setOrientation()
    },
    setOrientation () {
      if (process.browser) {
        console.log('changed screen orientation to: ')
        console.log(window.innerWidth > window.innerHeight ? 'Landscape' : 'Portrait')
        if (window.innerWidth > window.innerHeight) {
          this.isPortrait = false
          this.currentRows = 3
        } else {
          this.isPortrait = true
          this.currentRows = 10
        }
        return window.innerWidth > window.innerHeight ? 'Landscape' : 'Portrait'
      }
    }
  }
}
</script>

<style lang="scss">
.card-container {
  width: 90%;
  height: 90%;
  margin: auto;
  margin-top: 50px;
  outline: 2px solid black;
  background-color: white;
  display: block;
  text-align: center;
  position: relative;
}

.portrait-mode {
  height: 70vh;
  min-height: 70vh;
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
