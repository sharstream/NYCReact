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
    topic: "",
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
    API.getArticles(this.state.topic)
      .then(res => this.setState({ articles: res.data}))
      .catch(err => console.log(err));
  };

  loadSavedArticles = () => {
    API.getArticles()
      .then(res =>
        this.setState({ articles: res.data, title: "", date: "", url:""})
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
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Articles;