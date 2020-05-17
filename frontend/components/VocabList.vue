<template>
  <div class="vocab-list-container">
    <!--
    <div class="dropdown">
      <p>
        order by: {{ this.option }}
      </p>
      <div class="dropdown-content">
        <p class="dropdown-option" @click="setOption('progress', 'desc')">
          progress
        </p>
        <p class="dropdown-option" @click="setOption('english', 'asc')">
          english
        </p>
      </div>
    </div>
    <br>-->

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>
              <div class="svg-container">
                english
                <img src="../icons/arrow.svg" alt="arrow up" width="20px" class="up" @click="setOption('english', 'desc')">
                <img src="../icons/arrow.svg" alt="arrow down" width="20px" class="down" @click="setOption('english', 'asc')">
              </div>
            </th>

            <th>
              <div class="svg-container">
                kanji
                <img src="../icons/arrow.svg" alt="arrow up" width="20px" class="up" @click="setOption('kanji', 'desc')">
                <img src="../icons/arrow.svg" alt="arrow down" width="20px" class="down" @click="setOption('kanji', 'asc')">
              </div>
            </th>
            <th>
              <div class="svg-container">
                kana
                <img src="../icons/arrow.svg" alt="arrow up" width="20px" class="up" @click="setOption('kana', 'desc')">
                <img src="../icons/arrow.svg" alt="arrow down" width="20px" class="down" @click="setOption('kana', 'asc')">
              </div>
            </th>
            <th>
              <div class="svg-container">
                progress
                <img src="../icons/arrow.svg" alt="arrow up" width="20px" class="up" @click="setOption('progress', 'desc')">
                <img src="../icons/arrow.svg" alt="arrow down" width="20px" class="down" @click="setOption('progress', 'asc')">
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
}
table {
  border: 0px;
  border-collapse:collapse;
}

th, td {
  padding: 15px;
  min-width: 135px;
}

th {
  text-align: left;
  background-color: var(--knew-it-color);
  font-weight: normal;
  cursor: pointer;
}

tr:nth-child(odd) {background-color: #f2f2f2;}

.vocab-list-container {
  width: 700px;
  margin: auto;
  margin-top: 50px;
  display: block;
}

.dropdown {
  position: relative;
  display: inline-block;
  margin-bottom: 20px;
  padding: 10px;
  padding-left: 15px;

  margin-left: 500px;
  border: solid black 2px;
  width: 180px;
  height: 50px;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: white;
  top: 49px;
  right: -1.5px;
  width: 180px;
  border: solid black 2px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 10px;
  padding-top: 10px;
  z-index: 1;
  cursor: pointer;
}

.dropdown-option {
  padding-top: 5px;
  padding-left: 5px;
  padding-bottom: 5px;
}

.dropdown-option:hover {
  background-color: var(--knew-it-color);
  padding-left:-10px;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.down {
  transform: rotate(-90deg);
  position: absolute;
  top: 2px;
  margin-left: 10px;
}

.up {
  transform: rotate(90deg);
  position: absolute;
  top: 2px;
  margin-left: 30px;
}

.svg-container {
  margin-top: 10px;
  position: relative;
}
</style>
