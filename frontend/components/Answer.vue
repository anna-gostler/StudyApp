<template>
  <div class="answer-container">
    <div id="answertext" v-html="vocab.english" />
    <textarea id="note" v-model="vocab.note" rows="9" cols="50" />
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
  height:400px;
  height: 320px;
  padding-top: 50px;
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

#progressbar {
  height: 12px;
  background-color:  #ABE188;
  position: absolute;
  left: 0;
  bottom: 0px;
}

</style>
