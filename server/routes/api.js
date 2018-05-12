const express = require('express');
const router = express.Router();
const elasticsearch = require('elasticsearch')


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

      res.send(body);

    })
    .catch(function (error) {
      console.trace(error.message);
      res.send(error)
    });
});

module.exports = router;
