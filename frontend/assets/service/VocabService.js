import Vocab from '~/assets/data/Vocab.class'

const currentVocabs = []
const maxSizeCurrentWords = 20
const minRepeatedWords = 10
const maxWordsAddedPerday = 100
// const addedToday = 0
const currentRepeatedWords = 0
const today = new Date()

export default class VocabApi {
  constructor ($axios) {
    this.axios = $axios
    this.currentVocabs = []
    this.fillCurrentVocabs()
  }

  async fillCurrentVocabs () {
    console.log('constructor: fill current vocabs')
    const result = await Promise.all([this.anyDue(), this.anyUnseen()])

    if (result[0]) {
      // add due vocabs (max minRepeatedWords)
      this.findRandomDue(minRepeatedWords).then((v) => {
        v.forEach((vocab) => {
          console.log('fill due: ' + vocab.english)
          this.currentVocabs.push(vocab)
        })

        if (result[1]) {
          // fill rest with unseen vocabs
          this.findRandomUnseen(maxSizeCurrentWords - this.currentVocabs.length).then((v) => {
            v.forEach((vocab) => {
              console.log('fill unseen: ' + vocab.english)
              vocab.duedate = today
              vocab.addeddate = today
              this.currentVocabs.push(vocab)
              this.update(vocab)
            })
          })
        }
      })
    }
    if (result[0] === false && result[1] === true) {
      // fill rest with unseen vocabs
      this.findRandomUnseen(maxSizeCurrentWords - this.currentVocabs.length).then((v) => {
        v.forEach((vocab) => {
          console.log('fill unseen: ' + vocab.english)
          vocab.duedate = today
          vocab.addeddate = today
          this.currentVocabs.push(vocab)
        })
      })
    }
  }

  // select a new vocab either from currentVocabs
  // or fetch from the database either a seen or
  // unseen vocab
  async getNextVocab () {
    console.log('---- get next vocab ----')
    console.log('currentVocabs.length ' + this.currentVocabs.length)

    let conditionRandomDue = currentRepeatedWords < minRepeatedWords && this.currentVocabs.length < maxSizeCurrentWords
    let conditionRandomUnseen = this.currentVocabs.length < maxSizeCurrentWords
    const conditionGetFromCurrentVocabs = this.currentVocabs.length > 0

    const result = await Promise.all([this.anyDue(), this.anyUnseen(), this.countAddedToday()])

    console.log('anydue ' + result[0])
    console.log('anyunseen ' + result[1])
    console.log('addedToday ' + result[2])

    conditionRandomDue = conditionRandomDue && result[0]
    conditionRandomUnseen = conditionRandomUnseen && result[1] && result[2] < maxWordsAddedPerday

    if (conditionRandomDue) {
      console.log('get random due')
      let response
      try {
        response = this.getDueVocab(1)
      } catch (e) {
        console.log(e.message)
      }
      return response
    } else if (conditionRandomUnseen) {
      console.log('get random unseen')
      let response
      try {
        response = this.getUnseenVocab(1)
      } catch (e) {
        console.log(e.message)
      }
      return response
    } else if (conditionGetFromCurrentVocabs) {
      console.log('get from current vocabs')
      return this.getFromCurrentVocabs()
    }
  }

  getDueVocab (number) {
    return this.findRandomDue(1).then((v) => {
      // handle actions inside this object:
      // push to list of currentVocabs
      // update in database
      if (v !== undefined) {
        v.forEach((vocab) => {
          vocab.duedate = today
          vocab.addeddate = today
          this.currentVocabs.push(vocab)
          this.update(vocab)
        })
      }

      // return to UI (card.vue)
      return new Promise(function (resolve, reject) {
        if (v !== undefined) {
          if (number === 1) {
            resolve(v[0])
          }
        } else {
          reject(Error('reject: could not find random due vocab'))
        }
      })
    })
  }

  getUnseenVocab (number) {
    return this.findRandomUnseen(1).then((v) => {
      // handle actions inside this object:
      // push to list of currentVocabs
      // update in database
      if (v !== undefined) {
        v.forEach((vocab) => {
          vocab.duedate = today
          vocab.addeddate = today
          this.currentVocabs.push(vocab)
          this.update(vocab)
        })
      }
      // return to UI
      return new Promise(function (resolve, reject) {
        if (v !== undefined) {
          if (number === 1) {
            resolve(v[0])
          }
        } else {
          reject(Error('VocabService: could not get new Vocab.'))
        }
      })
    })
  }

  getFromCurrentVocabs () {
    const rand = Math.floor(Math.random() * this.currentVocabs.length)
    this.newVocab = this.currentVocabs[rand]
    const v = this.currentVocabs[rand]

    return new Promise(function (resolve, reject) {
      if (v !== undefined) {
        resolve(v)
      } else {
        reject(Error('VocabService: could not get word from currentVocabs.'))
      }
    })
  }

  countAddedToday () {
    return this.axios({
      method: 'get',
      url: 'vocab/countaddedtoday',
      withCredentials: true
    }).then((response) => {
      return response.data
    })
  }

  anyDue () {
    return this.axios({
      method: 'get',
      url: 'vocab/anydue',
      withCredentials: true
    }).then((response) => {
      return response.data
    })
  }

  anyUnseen () {
    return this.axios({
      method: 'get',
      url: 'vocab/anyunseen',
      withCredentials: true
    }).then((response) => {
      return response.data
    })
  }

  findAll () {
    return this.axios({
      method: 'get',
      url: 'vocab',
      withCredentials: true
    }).then((response) => {
      const vocabs = []
      response.data.forEach((vocab) => {
        vocabs.push(new Vocab(
          vocab.id,
          vocab.kanji,
          vocab.kana,
          vocab.type,
          vocab.english,
          vocab.note,
          vocab.duedate,
          vocab.addeddate,
          vocab.progress
        ))
      })
      return vocabs
    })
  }

  findRandomDue (number) {
    console.log('url ' + 'vocab/randomdue/' + number)
    return this.axios({
      method: 'get',
      url: ('vocab/randomdue/' + number),
      withCredentials: true
    }).then((response) => {
      const vocabs = []
      if (response.data) {
        return response.data
      }
      return vocabs
    })
  }

  findAllDue () {
    return this.axios({
      method: 'get',
      url: 'vocab/alldue',
      withCredentials: true
    }).then((response) => {
      if (response.data) {
        return this.responseToVocab(response)
      } else {
        return undefined
      }
    })
  }

  countDue () {
    return this.axios({
      method: 'get',
      url: 'vocab/countdue',
      withCredentials: true
    }).then((response) => {
      if (response.data) {
        return response.data
      } else {
        return undefined
      }
    })
  }

  findRandomUnseen (number) {
    console.log('try to get NEW = unseen from database')
    return this.axios({
      method: 'get',
      url: 'vocab/randomunseen/' + number,
      withCredentials: true
    }).then((response) => {
      console.log('response.data' + response.data)

      const vocabs = []
      if (response.data) {
        return response.data
      } else {
        console.log('no random unseen found')
      }
      return vocabs
    })
  }

  correctAnswer (vocab) {
    this.moveDueDateForward(vocab)
    vocab.progress = vocab.progress + 1
    this.update(vocab)
  }

  incorrectAnswer (vocab) {
    vocab.progress = 0
    this.update(vocab)
  }

  moveDueDateForward (vocab) {
    if (vocab.progress > 0 && vocab.progress % 3 === 0) {
      // compute how many days the duedate will be moved forward dependent on progress

      console.log('current progress = ' + vocab.progress)
      const steps = (vocab.progress / 3)
      const days = 2 ** steps // 2 ^ steps

      console.log('duedate was' + vocab.duedate)

      const date = new Date(vocab.duedate.valueOf())
      date.setDate(date.getDate() + days)
      vocab.duedate = date

      console.log('move ' + days + ' days forward new duedate = ' + vocab.duedate)

      this.update(vocab)

      // remove from currentVocabs
      for (let i = 0; i < currentVocabs.length; i++) {
        if (currentVocabs[i].id === vocab.id) {
          currentVocabs.splice(i, 1)
        }
      }
    }
  }

  responseToVocab (response) {
    if (response.data.duedate === undefined) {
      response.data.duedate = response.data.dueDate
    }
    return new Vocab(
      response.data.id,
      response.data.kanji,
      response.data.kana,
      response.data.type,
      response.data.english,
      response.data.note,
      response.data.duedate,
      response.data.addeddate,
      response.data.progress
    )
  }

  /* basic database methods */

  create (kanji, kana, type, english) {
    return this.axios({
      method: 'post',
      url: 'vocab',
      data: {
        kanji,
        kana,
        type,
        english,
        note: '',
        duedate: this.today,
        addeddate: this.today,
        progress: 0
      },
      withCredentials: true
    }).then((response) => {
      return response.data
    })
  }

  deleteItem (id) {
    return this.axios({
      method: 'delete',
      url: 'vocab/' + id,
      withCredentials: true
    })
  }

  update (vocab) {
    if (vocab.duedate === undefined) {
      vocab.duedate = vocab.dueDate
    }

    return this.axios({
      method: 'put',
      url: 'vocab/' + vocab.id,
      data: {
        id: vocab.id,
        kanji: vocab.kanji,
        kana: vocab.kana,
        type: vocab.type,
        english: vocab.english,
        note: vocab.note,
        duedate: vocab.duedate,
        addeddate: vocab.addeddate,
        progress: vocab.progress
      },
      withCredentials: true
    }).then((response) => {
      if (response.data) {
        console.log('Success: updated vocab ' +
        vocab.english + ' ' +
        vocab.kanji + ' ' +
        vocab.id +
        ' progress:' + vocab.progress +
        ' duedate: ' + vocab.duedate
        )
        return response.data
      } else {
        console.log('Error: could not update vocab ' + vocab.english)
      }
    })
  }
}
