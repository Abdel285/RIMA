import React, {Component,useState,useEffect} from "react";
import Loader from "react-loader-spinner";
import Select from "react-select";
import {BASE_URL_CONFERENCE} from "../../../Services/constants";
import "d3-transition";
import {Button, Label, FormGroup, Form, Row, Col, } from "reactstrap";
import ReactApexChart from "react-apexcharts";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

class totalNumberEvents  extends Component {
    constructor(props) {
      super(props);
      his.state = {
          
        series: [{
          data: [21, 22, 10, 28, 16, 21, 13, 30]
        }],
        options: {
          chart: {
            height: 350,
            type: 'bar',
            events: {
              click: function(chart, w, e) {
                // console.log(chart, w, e)
              }
            }
          },
          colors: colors,
          plotOptions: {
            bar: {
              columnWidth: '45%',
              distributed: true,
            }
          },
          dataLabels: {
            enabled: false
          },
          legend: {
            show: false
          },
          xaxis: {
            categories: [
              ['John', 'Doe'],
              ['Joe', 'Smith'],
              ['Jake', 'Williams'],
              'Amber',
              ['Peter', 'Brown'],
              ['Mary', 'Evans'],
              ['David', 'Wilson'],
              ['Lily', 'Roberts'], 
            ],
            labels: {
              style: {
                colors: colors,
                fontSize: '12px'
              }
            }
          }
        },
      
      
      };
    }
    render() {
        return (
          <div id="chart" className="box">
            <Form role="form" method="POST">
              <FormGroup>
              <h2>Number of Authors/Papers in Conferences over Years</h2>
                <br/>
                <p>
                This chart compares the evolution of the number of Authors/Papers over all
                  years of the selected conferences test
                </p>
                <br/>
  
              <Label>Select conferences</Label>
            <Row>
             <Col>
              <div style={{width: "550px"}}>
              <Select
                  ref={this.selectInputRef}
                  name="selectOptions"
                  isClearable
                  isMulti
                  placeholder="Select Option"
                  options={this.props.conferencesNames}
                  value={this.props.conferencesNames.find((obj) => obj.value === this.state.selectConference)}
                  onChange={this.conferenceshandleChange}
                  defaultValue={this.state.mulitSelectDefaultValues}
  
              />
              </div>
              </Col>
              <Col>
                <Button
                  outline
                  color="primary"
                  active={this.state.active2}
                  value="topic"                
                  onClick={this.selectSharedTopics}
                >
                  Authors
                </Button>
                </Col>
                <Col>
                <Button
                  outline
                  color="primary"
                  active={this.state.active2}
                  value="key"                
                  onClick={this.selectSharedKeywords}
                >
                  Papers
                </Button>
                </Col>
                <Col>
                <i
                  className="fas fa-question-circle text-blue"
                  onMouseOver={() => this.handleToogle(true)}
                  onMouseOut={() => this.handleToogle(false)}
                />
                {this.state.imageTooltipOpen && (
                  <div
                    className="imgTooltip"
                    style={{
                      marginTop: "0px",
                      position: "relative",
                      left: "10px",
                      width: "400px",
                      color: "#8E8E8E",
                      border: "1px solid #BDBDBD",
                    }}
                  >
                    <p>
                      {" "}
                      Hover over legend to highlight the evolution of the number of Authors/Papers over the years
                    </p>
                  </div>
                )}
                <br/>
                {this.state.words.length == 0  && !this.state.active4 ? (
                  <div style={{color: 'red'}}>No Authors/Papers found</div>
  
                ) : (<div/>)}
                <br/>
              </Col>
              
  
            </Row>
  <              br/>
  
                
                {/* <Label>Select a topic/keyword</Label>
                <br/>
                <div style={{width: "250px"}}>
                <Select
                  placeholder="Select conference"
                  options={this.state.words}
                  value={this.state.selectValue}
                  onChange={this.wordhandleChange}
               /> 
                  </div>
                <br/> */}
                
                {/* <Button
                  outline
                  active={this.state.active3}
                  color="primary"
                  onClick={this.clickEvent}
                >
                  Compare
                </Button>
                <Button
                  outline
                  active={this.state.active4}
                  color="primary"
                  onClick={this.onClear}
                >
                  Reset
                </Button> */}
                <div
                  style={{
                    marginLeft: "300px",
                    marginTop: "100px",
                    position: "absolute",
                  }}
                >
                  {/* <div style={{backgroundColor: "white", display: this.state.display}}>
                    <Loader
                      type="Bars"
                      visible={this.state.loader}
                      color="#00BFFF"
                      height={100}
                      width={100}
                    />
                  </div> */}
                </div>
              </FormGroup>
            </Form>
            <div style={{opacity: this.state.opacity}}>
              <ReactApexChart
                options={this.state.options}
                series={this.state.series}
                type="bar"
                height={350}
              />
            </div>
          </div>
        );
      } 
  }
  
  export default totalNumberEvents;