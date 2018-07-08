const axios = require("axios");
const router = require("express").Router();

const authKey = "ad4988018f54406eb8c6e276f88f074e";
// URL Base
var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey;

router.get("/articles", (req, res) => {
  console.log('response: ' + req.body);
  axios
    .get(queryURLBase, { params: req.query })
    .then(({ data: { results } }) =>  res.json(results))
    .catch(err => res.status(422).json(err));
});

module.exports = router;