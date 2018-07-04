import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import SaveBtn from "../../components/SaveBtn";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";

class Articles extends Component {
  state = {
    articles: [],
    search: "",
    startYear: "",
    endYear: "",
    date: "",
    url: ""
  };

  componentDidMount() {
    this.loadSavedArticles();
  };

  handleFormSubmit = e => {
    e.preventDefault();
    console.log('onClick loaded');
    API.getArticles(this.state.search)
      .then(res => this.setState({ articles: res.data}))
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { target: { name, value } } = event;
    this.setState({
      [name]: value
    });
  };

  loadSavedArticles = () => {
    API.getArticles()
      .then(res =>
        this.setState({
          articles: res.data,
          search: "",
          date: "",
          url: ""
        })
      )
      .catch(err => console.log(err));
  };

  handleSaveSubmit = e => {
    e.preventDefault();
    if (this.state.search) {
      API.saveArticle({
        title: this.state.search,
        date: Date.now,
        url: this.state.url
      })
        .then(res => this.loadSavedArticles())
        .cathc(err => console.log(err));
    }
  };

  render() {
    return (
      <div>
        <Container fluid>
          <Row>
            <div class="col" />
            <Col size="md-6">
              <Jumbotron>
                <h1> What Article should I search? </h1>
              </Jumbotron>
              <div class="panel panel-default">
                <div class="panel-heading">
                  <h3 class="panel-title"> Search NYT article </h3>
                </div>
                <div class="panel-body">
                  <form class="form-search">
                    <label for="title">Search Term (required)</label>
                    <Input
                      value={this.state.search}
                      onChange={this.handleInputChange}
                      name="search"
                      placeholder="Search by title (required)"
                    />
                    <label for="size">Number of Records to Display</label>
                    <select class = "span1">
                      <option>1</option>
                      <option>5</option>
                      <option>10</option>
                    </select>
                    <br/>
                    <label for="startYear">Start Year (optional)</label>
                    <Input
                      value={this.state.startYear}
                      onChange={this.handleInputChange}
                      name="startYear"
                      placeholder="Start Year is (optional)"
                    />
                    <label for="endYear">End Year (optional)</label>
                    <Input
                      value={this.state.endYear}
                      onChange={this.handleInputChange}
                      name="endYear"
                      placeholder="End Year is (optional)"
                    />
                    <FormBtn
                      disable={!(this.state.title)}
                      onClick={this.handleFormSubmit}
                    >
                      Search
                    </FormBtn>
                    <button type="button" class="btn btn-success" style={{ margin: "center", marginBottom: 10, marginLeft: 5 }}>
                      Clear
                      <i className="icon-search"></i>
                    </button>
                  </form>
                </div>
              </div>
            </Col>
            <div class="col" />
          </Row>
          <Row>
            <div class="col" />
            <Col size="md-6">
              <div class="panel panel-default">
                <div class="panel-heading">Top Articles</div>
                <div class="panel-body">
                  {!this.state.articles.length ? (
                    <h3 className="text-center">No Articles to Display</h3>
                  ) : (
                    <List>
                      {this.state.articles.map(article => {
                        return (
                          <ListItem
                            key={article.title}
                            title={article.title}
                            date={article.date}
                            href={article.url}
                          >
                            <SaveBtn onClick={() => this.handleSaveSubmit} />
                          </ListItem>
                        );
                      })}
                    </List>
                  )}
                </div>
              </div>
            </Col>
            <div class="col" />
          </Row>
        </Container>
      </div>
    );
  }
}

export default Articles;