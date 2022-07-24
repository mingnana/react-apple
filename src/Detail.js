import { useContext, useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from 'styled-components'
import {Context1} from './App.js'
import {addItem} from './store';

let YellowBtn = styled.button`
    background :  ${props => props.bg};
    color:${props =>props.bg == 'blue' ? 'white' : 'black'};
    padding : 10px;
`
let Box = styled.div`
    background : gray;
    padding:20px;
`
function Detail(props){
    let {재고} = useContext(Context1)
    let {id} = useParams();
    let 상품 = props.shoes.find((x)=>x.id == id)
    let [count, setCount] = useState(0)
    let [alert, setalert] = useState(true)
    let [tab, settab] = useState(0)
    let dispatch = useDispatch()
    
    useEffect(()=>{
        let a = setTimeout(()=>{ setalert(false) }, 2000 );
        return ()=>{
            clearTimeout(a)
        }
    })

    
    return (
        <div className="container">
            {
                alert == true
                    ? <div className="alert alert-warning">
                        2초이내 구매시 할인
                    </div>
                    : null
            }
            <Box>
                {count} &nbsp;
                <YellowBtn bg="orange" onClick={()=>{ setCount(count+1) }}>버튼</YellowBtn>
            </Box>
            <div className="row">
                <div className="col-md-6">
                    <img src={'https://codingapple1.github.io/shop/shoes'+[id]+'.jpg'} width="100%" />
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{상품.title}</h4>
                    <p>{상품.content}</p>
                    <p>{상품.price}원</p>
                    <button className="btn btn-danger" onClick={()=>{
                        dispatch(addItem({id:[id], name :[상품.title], count : 1}))
                    }}>주문하기</button>
                </div>
            </div>
            <Nav variant = "tabs" defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link onClick={()=>{settab(0)}} eventKey="link0">버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={()=>{settab(1)}} eventKey="link1">버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={()=>{settab(2)}} eventKey="link2">버튼2</Nav.Link>
                </Nav.Item>
            </Nav>
            <TabContent tab={tab}></TabContent>
        </div> 
    )
}

function TabContent({tab}){
    let [fade, setFade] = useState('')
    let {재고} = useContext(Context1)
    useEffect(()=>{
        let a = setTimeout(()=>{setFade('end')},100)
        
        return ()=>{
            clearTimeout(a)
            setFade('')
        }
    }, [tab])
    return <div className={'start ' + fade}>
      { [<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tab] }
    </div>
}

export default Detail;