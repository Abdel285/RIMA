import React, {Component} from "react";
import {BASE_URL_CONFERENCE} from "../../../Services/constants";
import {Graph} from "react-d3-graph";
import {
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  ModalFooter,
  InputGroup,
  InputGroupAddon,
  Input,
  Row,
  Col,
  Form,
  FormGroup,
} from "reactstrap";
import swal from "@sweetalert/with-react";
import Select from "react-select";
class AuthorNetwork extends Component {
  constructor(props) {
    super(props);

    this.selectInputRef = React.createRef();
    this.selectValue = this.selectValue.bind(this);
    this.selectyearValue = this.selectyearValue.bind(this);
    this.selectTopic = this.selectTopic.bind(this);
    
    this.onClickNode = this.onClickNode.bind(this);
    this.toggle = this.toggle.bind(this);
    this.setZoomIn = this.setZoomIn.bind(this);
    this.setZoomOut = this.setZoomOut.bind(this);
    this.cancelZoom = this.cancelZoom.bind(this);
    this.findText = this.findText.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);

    this.state = {
      filterNeighbours: "",
      keywords: [],
      selectVal: "",
      selectYear: "",
      url: "",
      imageTooltipOpen: false,
      count: "",
      key: "",
      papers: [],
      isLoaded: false,
      graphData: [],
      authors: [],
      titles: [],
      authorids: [],
      isModalLoader: false,
      noder: "",
      nodeval: "",
      active1: true,
      active2: false,

      myConfig: {
        nodeHighlightBehavior: true,
        linkHighlightBehavior: true,
        focusAnimationDuration: 0.1,
        highlightOpacity: 0.2,
        initialZoom: 1,
        d3: {
          gravity: -90,
          linkLength: 100,
        },
        node: {
          color: "gray",
          highlightStrokeColor: "green",
          fontSize: 10,
          fontWeight: "bold",
          fontColor: "black",
          highlightFontSize: 14,
          highlightFontWeight: "bold",
          size:50
        },
        link: {
          color: "#D4AF37",
          highlightColor: "green",
          type: "CURVE_SMOOTH",
          strokeWidth: 1,
        },
       
      },
    };
  }

  handleKeyDown(e) {
    if (e.key === "Enter") {
      var val = document.getElementById("searchkey").value;
      window.find(val);
    }
  }

  onClickNode(nodeId) {
    // window.alert(`Clicked node ${nodeId}`);
    fetch(
      BASE_URL_CONFERENCE +
      "getallauthorslist/" +
      nodeId +
      "/" +
      this.state.nodeval +
      "/" +
      this.state.selectYear
    )
      .then((response) => response.json())
      .then((json) => {
        //window.open(json.authors)
        this.setState({
          url: json.authors[0],
          count: json.authors[1],
          papers: json.authors[2],
          authors: json.authors[3],
          titles: json.authors[4],
          authorids: json.authors[5],
          isModalLoader: true,
          noder: nodeId,
        });
      });
    //window.open( url)
  }

  setZoomIn() {
    this.setState({
      myConfig: {
        ...this.state.myConfig,
        initialZoom: this.state.myConfig.initialZoom + 0.5,
      },
    });
    console.log(this.state.myConfig.initialZoom);
  }

  cancelZoom() {
    this.setState({
      myConfig: {
        ...this.state.myConfig,
        initialZoom: 1,
      },
    });
    console.log(this.state.myConfig.initialZoom);
  }

  setZoomOut() {
    this.setState({
      myConfig: {
        ...this.state.myConfig,
        initialZoom: this.state.myConfig.initialZoom - 0.5,
      },
    });
  }
  selectyearValue(e) {
    this.setState({
      selectYear: e.value,
    });
    
  }
  selectTopic(e) {
    console.log("tryyyyyy")
    fetch(BASE_URL_CONFERENCE + "getalltopics/topic/" + this.state.selectYear)
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          active1: true,
          active2: false,
          selectVal: null,
          keywords: json.keywords.sort((a, b) => (a.label > b.label ? 1 : -1)),
        });
      });
  }
  selectValue(e) {
    fetch(
      BASE_URL_CONFERENCE +
      "getalltitles/" +
      e.value +
      "/" +
      this.state.selectYear
    )
      .then((response) => response.json())
      .then((json) => {
        this.state.graphData = [];
        this.setState({
          selectVal: e.value,
          key: e.value,
          graphData: json.titles,
          isLoaded: true,
          nodeval: e.value,
        });
      });
  }
  
  toggle(id) {
    this.setState({
      isModalLoader: !this.state.isModalLoader,
    });
  }

  findText() {
    var val = document.getElementById("searchkey").value;
    window.find(val);
  }

  modalDetail = () => {
    swal(
      <div>
        <p>Click on researcher to view the details</p>
        <br/>
        <p>Hover on the researcher to highlight the connections</p>
      </div>
    );
  };
  handleToogle = (status) => {
    this.setState({imageTooltipOpen: status});
    console.log(this.state.imageTooltipOpen);
  };

  render() {
    var {
      keywords,
      authors,
      nodeval,
      graphData,
      selectVal,
      titles,
      isLoaded,
      count,
      isModalLoader,
      myConfig,
      selectYear,
      url,
      papers,
      noder,
      active1,
      active2,
      authorids,
    } = this.state;

    const highlighter = {
      ".highlight": {
        backgroundColor: "yellow",
      },
    };
    const yeardata = this.props.confEvents;

    if (isLoaded) {
      return (
        <div
          id="graph_div" 
        >
          <Label>Select a year</Label>

                  <Select style={{width: "200px"}}
                    placeholder="Select year"
                    options={yeardata}
                    value={yeardata.find((obj) => obj.value === selectYear)}
                    onChange={this.selectyearValue}
                  />

             
              
                <i
                  className="fas fa-question-circle text-blue"
                  onMouseOver={() => this.handleToogle(true)}
                  onMouseOut={() => this.handleToogle(false)}
                />
                {this.state.imageTooltipOpen && (
                  <div
                    className="imgTooltip"
                    style={{
                      marginTop: "5px",
                      position: "relative",
                      left: "20px",
                      width: "400px",
                      color: "#8E8E8E",
                      border: "1px solid #BDBDBD",
                    }}
                  >
                    <li>
                      Hover on the researcher to highlight the connections
                    </li>
                    <li> Click on researcher to view the details</li>
                  </div>
                )}
                <br/>
                <Label>Select a topic/keyword</Label>
                <div style={{width: "200px"}}>
                  <Select  
                    placeholder="Select Option"
                    options={keywords}
                    value={keywords.find((obj) => obj.value === selectVal)}
                    onChange={this.selectValue}

                  />
                  <br/>
               
            <Row>
              <Col>
                <div/>
                <Button color="primary" onClick={this.setZoomIn}>
                  {" "}
                  <i className="fas fa-search-plus text-white"/>
                </Button>
                <Button color="primary" onClick={this.setZoomOut}>
                  {" "}
                  <i className="fas fa-search-minus text-white"/>
                </Button>
                <Button color="primary" onClick={this.cancelZoom}>
                  {" "}
                  <i className="fas fa-home text-white"/>
                </Button>
              </Col>
              <Col>
                <div style={{marginRight: "15px", display: "none"}}>
                  <InputGroup>
                    <Input
                      id="searchkey"
                      placeholder="search researcher in graph"
                    />
                    <InputGroupAddon addonType="append">
                      <Button
                        color="primary"
                        onClick={this.findText}
                        onKeyDown={this.handleKeyDown}
                      >
                        <i className="fas fa-search text-white"/>
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                </div>
              </Col>
            

            </Row>

            <Graph 
              id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
              data={graphData}
              config={myConfig}
              onClickNode={this.onClickNode}
            />

          </div>

          <Modal isOpen={isModalLoader} toggle={this.toggle} size="lg">
            <div
              style={{
                backgroundColor: "#F7F7F7",
                padding: "20px",
                border: "0.5px solid #F7F7F7",
              }}
            >
              <ModalHeader toggle={this.toggle}>
                <h3> Details related to '{noder}'</h3>
              </ModalHeader>
            </div>
            <ModalBody>
              <div
                style={{
                  border: "0.5px solid #F7F7F7",
                  "border-radius": "50px",
                  padding: "20px",
                }}
              >
                <b>
                  {count} Publication(s) related to the topic '{nodeval}'
                </b>
                <br/>
                <br/>
                {papers.map((item, index) => {
                  const author = authors[index];
                  const alist = author.split(",");
                  const alistlen = alist.length;
                  const aids = authorids[index];
                  const idlist = aids.split(",");
                  const idlistlen = idlist.length;
                  const title = titles[index];
                  return (
                    <li style={{whiteSpace: "unset"}}>
                      <a
                        href={item}
                        title="click to view paper in semantic scholar"
                        target="_blank"
                      >
                        {title}
                      </a>
                      <br/>
                      <p>
                        <b>Researchers:</b>
                        {alist.map((item, index) => {
                          const aiditem = idlist[index];
                          return (
                            <a
                              title="click to view researcher profile in semantic scholar"
                              href={
                                "https://www.semanticscholar.org/author/" +
                                aiditem
                              }
                              target="_blank"
                            >
                              {item},
                            </a>
                          );
                        })}
                      </p>
                    </li>
                  );
                })}
              </div>
            </ModalBody>
            <ModalFooter>
              <Col>
                <Button color="info">
                  <a href={url} target="_blank" style={{color: "white"}}>
                    Researcher Profile in semantic scholar
                  </a>
                </Button>
              </Col>
              <Col/>
              <Col/>
              <Col/>
              <Col>
                <Button onClick={this.toggle}>Close</Button>
              </Col>{" "}
            </ModalFooter>
          </Modal>
        </div>
      );
    } else {
      return (
        <>
          <div
            style={{
              height: "1000px",
              width: "800px",
              backgroundColor: "#FAFAFA",
              
            }}
          >
            <div style={{}}>
              <Form>
                <FormGroup>
                  <Label>Select a year</Label>
                  <div style={{width: "200px"}}>
                    <Select
                      placeholder="Select Option"
                      options={yeardata}
                      value={yeardata.find((obj) => obj.value === selectYear)}
                      onChange={e => { this.selectValue(e);
                         this.selectTopic() }
                    }
                      
                    />
                  </div>
                 
                 
                  <br/>
                  <br/>
                  <Label>Select a topic</Label>
                  <br/>
                  <div style={{width: "200px"}}>
                    <Select
                      placeholder="Select Option"
                      options={keywords}
                      value={keywords.find((obj) => obj.value === selectVal)}
                      onChange={this.selectValue}
                    />
                   
                  </div>
                </FormGroup>
              </Form>
            </div>
          </div>
        </>
      );
    }
  }
}

export default AuthorNetwork;
