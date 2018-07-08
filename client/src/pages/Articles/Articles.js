import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import SaveBtn from "../../components/SaveBtn";
// import DeleteBtn from "../../components/DeleteBtn";
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
    amount: 0,
    url: ""
  };

  componentDidMount() {
    this.loadSavedArticles();
  };

  handleFormSubmit = e => {
    e.preventDefault();
    console.log('onClick loaded');
    console.log('submit search: ' + this.state.search);
    console.log('submit startYear: ' + this.state.startYear);
    console.log('submit endYear: ' + this.state.endYear);

    API.getNYTarticles(this.state.search, this.state.startYear, this.state.endYear)
      .then(res => {
        this.setState({ articles: res.data.response.docs});
        console.log("articles from react: " + this.state.articles);
      })
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
            <div className="col" />
            <Col size="md-6">
              <Jumbotron>
                <h1> What Article should I search? </h1>
              </Jumbotron>
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title"> Search NYT article </h3>
                </div>
                <div className="panel-body">
                  <form className="form-search">
                    <label htmlFor="title">Search Term (required)</label>
                    <Input
                      value={this.state.search}
                      onChange={this.handleInputChange}
                      name="search"
                      placeholder="Search by title (required)"
                    />
                    <label htmlFor="size">Number of Records to Display</label>
                    <select className = "span1">
                      <option>1</option>
                      <option>5</option>
                      <option>10</option>
                    </select>
                    <br/>
                    <label htmlFor="startYear">Start Year (optional)</label>
                    <Input
                      value={this.state.startYear}
                      onChange={this.handleInputChange}
                      name="startYear"
                      placeholder="Start Year is (optional)"
                    />
                    <label htmlFor="endYear">End Year (optional)</label>
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
                    <button type="button" className="btn btn-success" style={{ margin: "center", marginBottom: 10, marginLeft: 5 }}>
                      Clear
                      <i className="icon-search"></i>
                    </button>
                  </form>
                </div>
              </div>
            </Col>
            <div className="col" />
          </Row>
          <Row>
            <div className="col" />
            <Col size="md-6">
              <div className="panel panel-default">
                <div className="panel-heading">Top Articles</div>
                <div className="panel-body">
                  {!this.state.articles.length ? (
                    <h3 className="text-center">No Articles to Display</h3>
                  ) : (
                    <List>
                      {this.state.articles.map(article => {
                        return (
                          <ListItem
                            key={article.abstract}
                            title={article.abstract}
                            date={article.pub_date}
                            href={article.web_url}
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
            <div className="col" />
          </Row>
        </Container>
      </div>
    );
  }
}

export default Articles;