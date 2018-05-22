const express = require('express');
const router = express.Router();
const elasticsearch = require('elasticsearch')
const escapeHTML = require('escape-html')


if (!process.env.ES_URL) {
  console.error("Env var missing: ES_URL")
  process.exit(1)
}

const es = new elasticsearch.Client({
  host: process.env.ES_URL
});

/**
 * send back a random list of lucken tests
 */
router.get('/lt/random', (req, res) => {

  es
    .search({
      index: 'lt',
      body: {
        "size": 1,
        "query": {
          "function_score": {
            "functions": [
              {
                "random_score": {
                  "seed": new Date().getTime()
                }
              }
            ]
          }
        }
      }
    })
    .then(function (body) {

      let entireText = ''
      body.hits.hits[0]._source.text.forEach((v, i) => {

        entireText += v.isInput ? `
          <app-lt-input explanation="${escapeHTML(JSON.stringify({
            example: `Du mußt trainieren, um Deutsch zu lernen.`,
            table: {
              time: 'infinitive',
              plural: false,
              type: 'verb'
            },
            info: `The actual answer is '${v.value}'. In fact, this is a verb, in this case an auxiliary that is conjugated in the past in preterit and so should take the form AUX mode... Yeah man!`
          }))}" index="${i}">
            ${v.value}
          </app-lt-input>` :
          v.value
      })

      res.send({
        es_resp: body,
        entire_text: entireText
      });

    })
    .catch(function (error) {
      console.trace(error.message);
      res.send(error)
    });
});

module.exports = router;
