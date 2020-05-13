<template>
  <div class="vocab-container">
    <vocab-create @create="createItem" />
    <div class="vocab-list-container">
      <vocab-item v-for="vocab in vocabs" :key="vocab.id" :vocab="vocab" @delete="deleteItem" />
    </div>
  </div>
</template>

<script>
import VocabItem from '~/components/VocabItem.vue'

export default {
  components: {
    VocabItem
  },
  props: {
    vocabs: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    createItem (item) {
      this.vocabs.push(item)
    },
    deleteItem (item) {
      this.vocabs.splice(this.vocabs.indexOf(item), 1)
    }
  }
}
</script>

<style lang="scss">
.vocab-container {
  width: 400px;
  margin: auto;
  margin-top: 100px;
  display: block;

  .create-container {
    width: 100%;
    height: 50px;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);

    input {
      height: 50px;
      width: 250px;
      border: none;
      padding-left: 10px;
      font-family: "Quicksand", "Source Sans Pro", -apple-system,
        BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,
        sans-serif;
      font-size: 18px;
      &:focus {
        outline: none;
      }
    }

    button {
      height: 45px;
      width: 145px;
      border: none;
      cursor: pointer;
      text-align: right;
      padding-right: 20px;
      font-size: 18px;
      &:focus {
        outline: none;
      }
    }
  }
}
.vocab-list-container {
  width: 400px;
  margin: auto;
  margin-top: 120px;
  display: block;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
}
</style>
