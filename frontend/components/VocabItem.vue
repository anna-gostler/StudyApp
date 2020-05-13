<template>
  <div class="vocab-item">
    <span>{{ vocab.question }} {{ vocab.answer }}</span>
    <div class="controls">
      <span @click="deleteItem">🗑</span>
    </div>
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
  },
  methods: {
    deleteItem () {
      this.$services.vocab.deleteItem(this.vocab.id).then(() => {
        this.$emit('delete', this.vocab)
      })
    }

  }
}
</script>

<style lang="scss">
.vocab-item {
  width: 100%;
  display: block;
  height: 50px;
  &.completed {
    opacity: 0.2;
  }
  span {
    height: 50px;
    padding-left: 20px;
    line-height: 50px;
    width: 300px;
    display: inline-block;
  }
  .controls {
    display: inline-block;
    height: 50px;
    line-height: 50px;
    span {
      line-height: 50px;
      height: 50px;
      display: inline-block;
      width: 45px;
      text-align: center;
      padding: 0;
      cursor: pointer;
    }
  }
}
</style>
