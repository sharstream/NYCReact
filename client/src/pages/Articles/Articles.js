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

  render() {
    return (
      <div>
        <Container fluid>
          <Row>
            <Col size="md-6">
              <Jumbotron>
                <h1> What Article should I search? </h1>
              </Jumbotron>
              <form class="form-search">
                <label for="title">Search Term (required)</label>
                <Input
                  value={this.state.search}
                  onChange={this.handleInputChange}
                  name="title"
                  placeholder="Search by title (required)"
                required = "true" />
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
              </form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Articles;