<template>
  <div class="answer-container">
    <div id="answertext" v-html="vocab.english" />
    <textarea id="note" v-model="vocab.note" :rows="rows" cols="50" />
    <div class="link-container">
      <a :href="'https://jisho.org/search/' + linkTo" target="_blank" rel="noopener noreferrer">
        <img id="jisho-link" src="../icons/jisho-neutral.png" alt="jisho link">
      </a>
    </div>
    <div id="progressbar" :style="{ width: ((vocab.progress % 3) / 3)*100 + '%' }" />
  </div>
</template>

<script>

export default {
  props: {
    vocab: {
      type: Object,
      default () {
        return {}
      }
    },
    rows: {
      type: Number
    }
  },
  computed: {
    linkTo () {
      if (this.vocab.kanji !== undefined && this.vocab.kanji.trim() !== '') {
        return this.vocab.kanji
      } else if (this.vocab.kana !== undefined && this.vocab.kana.trim() !== '') {
        return this.vocab.kana
      } else if (this.vocab.english !== undefined && this.vocab.english.trim() !== '') {
        return this.vocab.english
      } else {
        return ''
      }
    }
  }
}
</script>

<style lang="scss">
.answer-container {
  line-height: 150%;
  font-size: 20px;
  display: block;
  position: relative;
  //height:400px;
  //height: 320px;
  height:56vh;
  padding-top: 50px;
}

.link-container {
    position: absolute;
    top: 91%;
    right: 50px;
}

#answertext {
  position: absolute;
  width: 100%;
  left: 0px;
}

#note {
  width: 80%;
  resize: none;
  position: absolute;
  left: 10%;
  bottom: 10%;
  padding: 10px;
}

#jisho-link {
  width:42px;
  border:0;
}

#progressbar {
  height: 12px;
  background-color:  #ABE188;
  position: absolute;
  left: 0;
  bottom: 0px;
}

</style>
