import axios from "axios";

export default {
  // gets all articles
  getArticles: function() {
    return axios.get("/api/articles");
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
}