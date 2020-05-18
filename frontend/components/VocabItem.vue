<template>
  <tr>
    <td>{{ vocab.english }}</td>
    <td>{{ vocab.kanji }} </td>
    <td>{{ vocab.kana }}</td>
    <td>{{ vocab.progress }}</td>
    <!--<td>{{ vocab.duedate }}</td>-->
  </tr>
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
  },
  methods: {
  }
}
</script>

<style lang="scss">
.vocab-item {
  width: 100%;
  display: block;
  height: 50px;

  span {
    height: 50px;
    padding-left: 20px;
    line-height: 50px;
    width: 100%;
    display: inline-block;
  }
}
</style>
