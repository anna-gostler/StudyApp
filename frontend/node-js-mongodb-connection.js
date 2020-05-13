//references: 
//https://www.twilio.com/blog/web-scraping-and-parsing-html-in-node-js-with-jsdom
//https://kb.objectrocket.com/mongo-db/how-to-delete-documents-with-mongoose-235

// run db 
// e.g. docker-compose -f docker-compose-backend-dev.yml up
// from frontend folder run
// node node-js-mongodb-connection.js 
var mongoose = require('mongoose');
var async = require("async");
const got = require('got');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const DEVMODE = true

// -------------- set up connection to mongodb
mongoose.connect('mongodb://localhost:27017/vocabdb', { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
 
db.once('open', function() {
  console.log("Connection Successful!");


const vocabSchema = new mongoose.Schema({
  kanji: String,
  kana: String,
  type: String,
  english: String,
  note: String, 
  duedate: Date,
  addedDate: Date,
  progress: Number 
})
const Vocab = mongoose.model('Vocab', vocabSchema)

// -------------- remove everything from database
deleteEverything = true;
if (deleteEverything) {
  Vocab.deleteMany({}, function (err) {
    if(err) console.log(err);
    console.log("Successful deletion");
  });
}

if (true) {
// -------------- insert into db
if (DEVMODE){
  urls = [
    'https://jlptsensei.com/jlpt-n4-vocabulary-list/page/1/'
  ]
}else{
  urls = [
  'https://jlptsensei.com/jlpt-n4-vocabulary-list/page/1/',
  'https://jlptsensei.com/jlpt-n4-vocabulary-list/page/2/',
  'https://jlptsensei.com/jlpt-n4-vocabulary-list/page/3/',
  'https://jlptsensei.com/jlpt-n4-kanji-list/page/1/',
  'https://jlptsensei.com/jlpt-n4-kanji-list/page/2/',
  'https://jlptsensei.com/jlpt-n4-grammar-list/page/1/',
  'https://jlptsensei.com/jlpt-n4-grammar-list/page/2/',
  'https://jlptsensei.com/jlpt-n4-grammar-list/page/3/',
  'https://jlptsensei.com/jlpt-n4-grammar-list/page/4/'
  ]
}

//let today = new Date()
//today = new Date(today.getFullYear(), today.getMonth() , today.getDate())


async.eachSeries(urls, function(url, done) {
  console.log('try to connect to ' + url)

  got(url).then(response => {
    console.log('connected to ' + url)

      const dom = new JSDOM(response.body);
      dom.window.document.querySelectorAll('tr').forEach(row => {
      if (row.querySelectorAll('td')[0] != undefined && 
          row.querySelectorAll('td')[1] != undefined &&
          row.querySelectorAll('td')[2] != undefined &&
          row.querySelectorAll('td')[3] != undefined
          ) 
        {

        if (url.includes('vocabulary')){
          const _kanji = row.querySelectorAll('td')[1].textContent;
          const _kana = row.querySelectorAll('td')[2].querySelectorAll('a')[0].querySelectorAll('p')[0].textContent;
          const _type = row.querySelectorAll('td')[3].textContent;
          const _english = row.querySelectorAll('td')[4].textContent;

          v = new Vocab({ 
            kanji: _kanji,
            kana: _kana,
            type: _type,
            english: _english,
            note: '', 
            duedate: null,
            addeddate: null,
            progress: 0 
          })
  
          v.save(function (err, v) {
          if (err) { return console.error(err) }
          })

        }else if(url.includes('kanji') ){
          const _kanji = row.querySelectorAll('td')[1].textContent;
          const _kana = '';
          const _type = 'kanji';
          const onyomi = row.querySelectorAll('td')[2].querySelectorAll('a')[0].querySelectorAll('p')[0].textContent;
          const kunyomi = row.querySelectorAll('td')[3].querySelectorAll('a')[0].querySelectorAll('p')[0].textContent;
          const _english = row.querySelectorAll('td')[4].textContent + '</br>' + onyomi + '</br>' + kunyomi;
        
          v = new Vocab({ 
            kanji: _kanji,
            kana: _kana,
            type: _type,
            english: _english,
            note: '', 
            duedate: null,
            addeddate: null,
            progress: 0 
          })
  
          v.save(function (err, v) {
          if (err) { return console.error(err) }
          })

        } else {
          const _kanji = '';
          const _kana = row.querySelectorAll('td')[2].textContent;
          const _type = 'grammar';
          const _english = row.querySelectorAll('td')[3].textContent; 
        
          v = new Vocab({ 
            kanji: _kanji,
            kana: _kana,
            type: _type,
            english: _english,
            note: '', 
            duedate: null,
            addeddate: null,
            progress: 0 
          })
  
          v.save(function (err, v) {
          if (err) { return console.error(err) }
          })
        }
      }
    });
    done();
  }).catch(err => {
    console.log(err);
  });

}, function(err) {
  if (err) {
    throw err;
  }
  console.log("All requests are done");
});


}

}); // open db

/*
console.log('find all')
Vocab.find(function (err, vocabs) {
    if (err) { return console.error(err) }
    console.log(vocabs)
})*/