export default class Vocab {
  constructor (
    id,
    kanji,
    kana,
    type,
    english,
    note,
    duedate,
    addeddate,
    progress
  ) {
    this.id = id
    this.kanji = kanji
    this.kana = kana
    this.type = type
    this.english = english
    this.note = note
    this.duedate = duedate
    this.addeddate = addeddate
    this.progress = progress
  }
}
