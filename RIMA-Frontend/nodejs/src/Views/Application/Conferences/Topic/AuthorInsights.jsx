import React, {useState,useEffect } from "react";
import RestAPI from "../../../../Services/api";
import PopularTopics from '../../../components/AuthorsDashboardInsights/PopularTopics.js'
import AuthorsNodeLinkDiagram from '../../../components/AuthorsDashboardInsights/AuthorsNodeLinkDiagram'
import AuthorNetwork from '../../../components/AuthorsDashboardInsights/AuthorNetwork'
import {BASE_URL_CONFERENCE} from "../../../../Services/constants"
import { Grid,Box,Paper } from "@material-ui/core";
import {Card, CardHeader, CardBody, Container, Row, Col, Label} from "reactstrap";
import Select from 'react-select';





const AuthorInsights = () => {
 const [availableConferences, setavailableConferences] = useState([]);
 const [selectedOption, setselectedOption] = useState("");
 const [available, setavailable] = useState([{ label: 'edm', value: 'edm' },{ label: 'lak', value: 'lak' },{ label: 'aied', value: 'aied' }]);

    const [conference, setconference] = useState([]);
    const [confEvents, setconfEvents] = useState([
      {
        value: "2011",
        label: "2011"
      },
      {
        value: "2012",
        label: "2012"
      },
      {
        value: "2013",
        label: "2013"
      },
      {
        value: "2014",
        label: "2014"
      },
      {
        value: "2015",
        label: "2015"
      },
      {
        value: "2016",
        label: "2016"
      },
      {
        value: "2017",
        label: "2017"
      },
      {
        value: "2018",
        label: "2018"
      },
      {
        value: "2019",
        label: "2019"
      },
      {
        value: "2020",
        label: "2020"
      }
    ],);
    

   const handleChange = (selectedOption) => {
    setselectedOption(selectedOption);
    fetch(`${BASE_URL_CONFERENCE}confEvents/${selectedOption.value}`)
    .then(response => response.json())
    .then(json => {
      setconfEvents(json.events)
    });
  };

useEffect(() => {
      getConferencesNames();
      
    }, [])

  //** GET ALL CONFERENCES **//
  const getConferencesNames = () => {
    RestAPI.getConferencesNames()
      .then((response) => {
        setavailableConferences(response.data);
        console.log(response)
      })
     
  };
  return (
    <Box  sx={{display: 'flex',flexWrap:'wrap'}}>
    <Box> 
    <Paper  style={{
      height: "800px",
      width: "800px",
      backgroundColor: "#FAFAFA",
      
    }}> 
    <div style={{width: "200px"}}>   
    <Select 
          placeholder="Select conference"
         
            options={available}
                value={selectedOption}
                   onChange={handleChange}
                       />  
                       </div>                                                            
                   <AuthorNetwork conferenceName = {selectedOption.value} confEvents = {confEvents}/>
                   </Paper>
</Box>
{/* 
<Box style={{backgroundColor:'white'}}  >
    <PopularTopics  conferencesNames = {availableConferences}/>
    </Box>
    <Box style={{backgroundColor:'white'}}    >
    <AuthorsNodeLinkDiagram  conferencesNames = {availableConferences}/>
    </Box>
  */}

   
    </Box>
    
  )
}

export default AuthorInsights