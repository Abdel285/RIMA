import React, {Component} from "react";
import Select from "react-select";
import {BASE_URL_CONFERENCE} from "../../../Services/constants";
import "d3-transition";
import { FormGroup, Form, Row, Col,Badge} from "reactstrap";
import { ListItemText,List } from "@material-ui/core";
class AuthorsNodeLinkDiagram  extends Component {
  constructor(props) {
    super(props);
    this.state = {
        };
      }
      conferenceshandleChange = (e) =>{
        this.setState({
          selectedConferences: e,
          isLoading: true,
        }, function() {
          this.selectConfEvent();
        });
      }

      selectConfEvent = () => {
        fetch(BASE_URL_CONFERENCE + "confEvents/" + this.state.selectedConferences.value)
        .then((response) => response.json())
        .then((json) => {
          this.setState({
          confevents: json.events
        });
        });
      }
      handleEvent = (e) => {
        this.setState({
          selectedEvent: e,
          isLoading: true,
        }, function() {
          this.selectEventsAuthors();
        });  
      }
      selectEventsAuthors = () => {
        fetch(BASE_URL_CONFERENCE + "eventAuthors/" + this.state.selectedEvent.value)
        .then((response) => response.json())
        .then((json) => {
          this.setState({
            EventAuthors: json.EventAuthors.sort((a, b) => (a.label > b.label ? 1 : -1)),
        });
        console.log("AuthorsList:", this.state.EventAuthors)
        });
      }

      handelAuthorName  = (e) => {
        this.setState({
          selectedEventAuthor: e.value,
          isLoading: true,
        });
        console.log("here selected author",e)
      }
  render() {
      return (
        <div id="chart" className="box">
           <Form role="form" method="POST">
            <FormGroup>
          <Row>
            <Col>
              <Select
                placeholder="Select a conference"
                options={this.props.conferencesNames}
                value={this.state.selectedConferences}
                onChange={this.conferenceshandleChange}
                  />
            </Col>
            <Col>
              <Select
                placeholder="Select an Event"
                options={this.state.confevents}
                value={this.state.selectedEvent}
                onChange={this.handleEvent}
                  />
            </Col>
            <Col>
              <Select
                placeholder="Select an Author"
                options={this.state.EventAuthors}
                value={this.state.SelectedAuthor}
                onChange={this.handelAuthorName}/>
            </Col>
            <Col>
      
              </Col>
            
                 



          </Row>

            </FormGroup>
          </Form>
         

        </div>
      );
    } 
  }


export default AuthorsNodeLinkDiagram;
