import Vocab from '~/assets/data/Vocab.class'

const currentVocabs = []
const maxSizeCurrentWords = 10
const minRepeatedWords = 5
const maxWordsAddedPerday = 50
const currentRepeatedWords = 0
const today = new Date()

export default class VocabApi {
  constructor ($axios) {
    this.axios = $axios
  }

  async fillCurrentVocabs () {
    const result = await Promise.all([this.anyDue(), this.anyUnseen(), this.countAddedToday()])

    const anyDue = result[0]
    const anyUnseen = result[1]
    const numAddedToday = result[2]
    console.log('fill current vocabs')
    console.log('any due ' + anyDue)
    console.log('any unseen ' + anyUnseen)

    if (anyDue) {
      // add due vocabs (max minRepeatedWords)
      this.findRandomDue(Math.min(minRepeatedWords, maxSizeCurrentWords - currentVocabs.length)).then((v) => {
        v.forEach((vocab) => {
          console.log('fill due: ' + vocab.english)
          currentVocabs.push(vocab)
        })

        if (anyUnseen) {
          // fill rest with unseen vocabs
          const numAddUnseen = Math.min((maxSizeCurrentWords - currentVocabs.length), (maxWordsAddedPerday - numAddedToday))

          this.findRandomUnseen(numAddUnseen).then((v) => {
            v.forEach((vocab) => {
              console.log('fill unseen: ' + vocab.english)
              vocab.duedate = today
              vocab.addeddate = today
              currentVocabs.push(vocab)
              this.update(vocab)
            })
          })
        }
      })
    } else if (anyUnseen) {
      // fill rest with unseen vocabs
      const numAddUnseen = Math.min((maxSizeCurrentWords - currentVocabs.length), (maxWordsAddedPerday - numAddedToday))
      this.findRandomUnseen(numAddUnseen).then((v) => {
        v.forEach((vocab) => {
          console.log('fill unseen: ' + vocab.english)
          vocab.duedate = today
          vocab.addeddate = today
          currentVocabs.push(vocab)
        })
      })
    }
  }

  // select a new vocab either from currentVocabs
  // or fetch from the database either a seen or
  // unseen vocab
  async getNextVocab () {
    console.log('---- get next vocab ----')
    console.log('currentVocabs.length ' + currentVocabs.length)

    let conditionRandomDue = currentRepeatedWords < minRepeatedWords && currentVocabs.length < maxSizeCurrentWords
    let conditionRandomUnseen = currentVocabs.length < maxSizeCurrentWords
    const conditionGetFromCurrentVocabs = currentVocabs.length > 0

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
          currentVocabs.push(vocab)
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
          currentVocabs.push(vocab)
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
    const rand = Math.floor(Math.random() * currentVocabs.length)
    this.newVocab = currentVocabs[rand]
    const v = currentVocabs[rand]

    return new Promise(function (resolve, reject) {
      if (v !== undefined) {
        console.log('return from current vocab' + ' english: ' + v.english + ' due: ' + v.duedate)
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

  countSeen () {
    return this.axios({
      method: 'get',
      url: 'vocab/countseen',
      withCredentials: true
    }).then((response) => {
      return response.data
    })
  }

  countTotal () {
    return this.axios({
      method: 'get',
      url: 'vocab/counttotal',
      withCredentials: true
    }).then((response) => {
      return response.data
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
        vocabs.push(
          this.responseToVocab(vocab)
        )
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
        response.data.forEach((vocab) => {
          vocabs.push(
            this.responseToVocab(vocab)
          )
        })
        return vocabs
      } else {
        console.log('no random due found')
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
        return this.responseToVocab(response.data)
      } else {
        return undefined
      }
    })
  }

  findRandomUnseen (number) {
    // if (number > 0) {
    return this.axios({
      method: 'get',
      url: 'vocab/randomunseen/' + number,
      withCredentials: true
    }).then((response) => {
      const vocabs = []
      if (response.data) {
        response.data.forEach((vocab) => {
          vocabs.push(
            this.responseToVocab(vocab)
          )
        })
        return vocabs
      } else {
        console.log('no random unseen found')
      }
      return vocabs
    })
    // } else {
    //  return []
    // }
  }

  correctAnswer (vocab) {
    vocab.progress = vocab.progress + 1
    this.moveDueDateForward(vocab)
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
          console.log('remove from current vocabs ' + vocab.english)
          currentVocabs.splice(i, 1)
          i--
          // break //potentially remove doubles
        }
      }

      console.log('after removing: ' + currentVocabs.length)

      // after removing a word add a new one to current vocabs
      this.fillCurrentVocabs()
    }
  }

  responseToVocab (data) {
    if (data.duedate === undefined) {
      data.duedate = data.dueDate
    }
    if (data.addeddate === undefined && data.addDate !== undefined) {
      data.addeddate = data.addDate
    }

    if (data.kanji == null) {
      data.kanji = ''
    } else {
      data.kanji = data.kanji.trim()
    }

    if (data.kana == null) {
      data.kana = ''
    } else {
      data.kana = data.kana.trim()
    }

    if (data.type == null) {
      data.type = ''
    } else {
      data.type = data.type.trim()
    }

    if (data.english == null) {
      data.english = ''
    } else {
      data.english = data.english.trim().toLowerCase()
    }

    return new Vocab(
      data.id,
      data.kanji,
      data.kana,
      data.type,
      data.english,
      data.note,
      data.duedate,
      data.addeddate,
      data.progress
    )
  }

  /* getter, setter */
  getMaxWordsAddedPerday () {
    return maxWordsAddedPerday
  }

  getMaxSizeCurrentWords () {
    return maxSizeCurrentWords
  }

  getMinRepeatedWords () {
    return minRepeatedWords
  }

  getCurrentRepeatedWords () {
    return currentRepeatedWords
  }

  getCurrentVocabs () {
    return currentVocabs
  }

  setMaxWordsAddedPerday (maxWordsAddedPerday) {
    this.maxWordsAddedPerday = maxWordsAddedPerday
  }

  setMaxSizeCurrentWords (maxSizeCurrentWords) {
    this.setMaxSizeCurrentWords = maxSizeCurrentWords
  }

  setMinRepeatedWords (minRepeatedWords) {
    this.minRepeatedWords = minRepeatedWords
  }

  setCurrentRepeatedWords (currentRepeatedWords) {
    this.currentRepeatedWords = currentRepeatedWords
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
      return this.responseToVocab(response.data)
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
    if (vocab.addeddate === undefined && vocab.addDate !== undefined) {
      vocab.addeddate = vocab.addDate
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
        ' duedate: ' + vocab.duedate +
        ' addeddate: ' + vocab.addeddate
        )
        return this.responseToVocab(response.data)
      } else {
        console.log('Error: could not update vocab ' + vocab.english)
      }
    })
  }
}
