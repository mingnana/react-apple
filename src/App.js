import 'bootstrap/dist/css/bootstrap.min.css';
import { createContext, useState } from 'react';
import './App.css';
import {Navbar, Container, Nav} from 'react-bootstrap';
import data from './data.js';
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom';
import Detail from './Detail.js'
import Cart from './Cart.js'
import axios from 'axios'
import { useQuery } from "react-query";

export let Context1 = createContext()

function App() {
  let [shoes, setShoes] = useState(data);
  let [재고] = useState([10, 11, 12])
  let navigate = useNavigate();

  let result = useQuery('작명', ()=>
    axios.get('https://codingapple1.github.io/userdata.json').then((a)=>{ 
    console.log('요청됨')
    return a.data
   }),
)

  return (
    <div className="App">

      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">Ming shop</Navbar.Brand>
          <Nav className="me-auto">
          <Nav.Link onClick={()=>{ navigate('/') }}>Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('./detail/0') }}>detail</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('./cart') }}>cart</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {result.isLoading ? '로딩중입니다' : 'kim님 반갑습니다.'}
            {result.error && '에러남'}
            {result.data && 'kim님'}
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={
          <>
            <div className="main-bg"></div>
            <div className="container">
              <div className="row">
                {
                  shoes.map((e, i) => {
                    return (
                      <Card shoes={shoes[i]} num={i}></Card>
                    )
                  })
                }
              </div>
            </div>
            <button onClick={()=>{
              axios.get('https://codingapple1.github.io/shop/data2.json')
              .then((result)=>{
                let copy = [...shoes, ...result.data];
                setShoes(copy)
              })
            }}>더보기</button>
          </>
        }></Route>
        <Route path="/detail/:id" element={
          <Context1.Provider value={{재고, shoes}}>
            <Detail shoes={shoes}/>
          </Context1.Provider>
        }></Route>
        <Route path="/cart" element={<Cart></Cart>}></Route>
      </Routes>

      
    </div>
  );
}
function Card(props){
  return (
    <div className="col-md-4">
      <img src={'https://codingapple1.github.io/shop/shoes'+(props.num+1)+'.jpg'} width="80%" />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </div>
  )
}
export default App;
