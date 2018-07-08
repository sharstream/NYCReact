import axios from "axios";

export default {
  getNYTarticles: function(search, startDate, endDate) {
    const authKey="ad4988018f54406eb8c6e276f88f074e";
    //query result
    let queryURL = "";

    queryURL+= "&q=" + search;

    queryURL += "&begin_date=" + startDate + "0101";

    queryURL += "&end_date=" + endDate + "1201";
    // URL Base
    let queryURLBase="https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey;

    queryURLBase += queryURL;

    return axios.get(queryURLBase)
      //docs.article.title
      //docs.article.pub_date
      //docs.article.url
      .then(function (res) {
        console.log("articles: " + res.data.response.docs);
        console.log(res.data);
        // req.send({articles: articles});
      })
      .catch(function (res) {
        if (res instanceof Error) {
          console.log(res.message);
        } else {
          console.log(res.data);
        }
      });
  },

  // gets all articles
  getArticles: function(query) {
    console.log("passed query: " + query);
    if (query !== "") {
      return axios.get("/api/articles", {params: {q: query} });
    }
    return "";
  },
  // gets the article with given id
  getArticle: function(id) {
    return axios.get("/api/articles/" + id);
  },
  // delete the article with given id
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  // save an article
  saveArticle: function(articleData) {
    return axios.post("/api/articles", articleData);
  }
};