import React,{useState,useEffect} from 'react';
import Content from "./Content";
import {Form,FormControl,Button,Col} from 'react-bootstrap';
import './App.css';

function App() {
  const Key="2f331346524b0f732e98a8d5e50b0a58"


  const [temp,settemp]=useState(100);
  const [desc,setdesc]=useState("None");
  const [bg,setbg]=useState("");
  const [search,setsearch]=useState('');
  const [city,setcity]=useState("Delhi");
  
  useEffect(()=>{
    getbg();
    getweatherdata();
  },[city,bg]);

  const getbg=async ()=>{
    const response=await fetch(`https://api.unsplash.com/search/photos?query=${city}&client_id=ygW-jEo1t03oSMyRZMYVURUv_nP3msiWK6Xko5i81XQ`);
    const data=await response.json();
    setbg(data.results[0].links.download);
  }

  const getweatherdata=async ()=>{
    const res=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Key}&units=metric`);
    const fetchedData=await res.json();
    const gottemp=fetchedData.main.temp;
    const gotdesc=fetchedData.weather[0].description;
    updatevalues(gottemp,gotdesc);
  }

  const updatevalues= (gottemp,gotdesc)=>{
    settemp(gottemp);
    setdesc(gotdesc);
  }

  const updateSearch=e=>{
    setsearch(e.target.value);
  }

  const getSearch=e=>{
    e.preventDefault();
    setcity(search);
    setsearch('');
  }

 
  return (
    <div className="App"
    style={{ backgroundImage: `url(${bg})`}}>
    
      <Form onSubmit={getSearch}>

      <Form.Row className="justify-content-center">
      <Col xs="auto">
      <FormControl
      className="mb-2"
      type="text" 
      value={search}
      placeholder="Enter City Name"
      onChange={updateSearch} />
      </Col>

      <Col xs="auto">
      <Button type="submit" 
      className="mb-2" 
      variant="primary">Check Weather</Button>
      </Col>
      </Form.Row>
      
      </Form>

        <Content
        temp={temp}
        desc={desc}
        city={city}/>
    </div>
  );
}

export default App;
