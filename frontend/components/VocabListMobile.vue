<template>
  <div class="vocab-list-container">
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>
              <div class="svg-container">
                english
                <br>
                <img src="../icons/arrow.svg" alt="arrow up" class="up" @click="setOption('english', 'desc')">
                <img src="../icons/arrow.svg" alt="arrow down" class="down" @click="setOption('english', 'asc')">
              </div>
            </th>

            <th>
              <div class="svg-container">
                kanji
                <br>
                <img src="../icons/arrow.svg" alt="arrow up" class="up" @click="setOption('kanji', 'desc')">
                <img src="../icons/arrow.svg" alt="arrow down" class="down" @click="setOption('kanji', 'asc')">
              </div>
            </th>
            <th>
              <div class="svg-container">
                kana
                <br>
                <img src="../icons/arrow.svg" alt="arrow up" class="up" @click="setOption('kana', 'desc')">
                <img src="../icons/arrow.svg" alt="arrow down" class="down" @click="setOption('kana', 'asc')">
              </div>
            </th>
            <th>
              <div class="svg-container">
                progress
                <br>
                <img src="../icons/arrow.svg" alt="arrow up" class="up" @click="setOption('progress', 'desc')">
                <img src="../icons/arrow.svg" alt="arrow down" class="down" @click="setOption('progress', 'asc')">
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          <vocab-item v-for="vocab in orderedVocabs" :key="vocab.id" :vocab="vocab" />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
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
  data () {
    return {
      option: 'progress',
      order: 'desc'
    }
  },
  computed: {
    orderedVocabs () {
      return _.orderBy(this.vocabs, this.option, this.order)
    }
  },
  methods: {
    createItem (item) {
      this.vocabs.push(item)
    },
    deleteItem (item) {
      this.vocabs.splice(this.vocabs.indexOf(item), 1)
    },
    setOption (selection, order) {
      this.option = selection
      this.order = order
    }

  }
}
</script>

<style lang="scss">

.table-container {
  border: solid black 2px;
  width: 100%
}
table {
  border: 0px;
  border-collapse:collapse;
  width: 100%
}

th, td {
  padding: 3px;
  //min-width: 10px;
  //max-width: 20px;
}

th {
  text-align: left;
  background-color: var(--knew-it-color);
  font-weight: normal;
  height: 30px;
}

.narrow-column {
  width: 10px;
}
tr:nth-child(odd) {background-color: #f2f2f2;}

.vocab-list-container {
  width: 100%;
  //margin: auto;
  margin-top: 0px;
  display: block;
  font-size: 9px;
}

.down {
  transform: rotate(-90deg);
  position: absolute;
  top: 11px;
  //margin-left: 5px;
  width: 10px;
}

.up {
  transform: rotate(90deg);
  position: absolute;
  top: 11px;
  margin-left: 12px;
  width: 10px;
}

.svg-container {
  margin-top: -11px;
  position: relative;
}
</style>
