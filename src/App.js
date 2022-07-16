/*eslint-disable*/

import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function Modal(props){
  return (
    <div className="modal" style={{background : props.color}}>
      <h4>{props.글제목[props.title]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button onClick={()=>{
        props.글제목변경(['여자 코트 추천', '맛집추천', '파이썬독학'])
      }}>글수정</button>
    </div>
  ) 
}


function App() {

  let [글제목, 글제목변경] = useState(['남자 코트 추천', '맛집추천', '파이썬독학']);
  let [따봉,따봉변경] = useState([0, 0, 0]);
  let [modal, setModal] = useState(false);
  let [title,setTitle] = useState(0);
  let [입력값, 입력값변경] = useState('');

  [1,2,3].map(function(a){
    return '123211'
  })
  return (
    <div className="App">
      <div className="black-nav">
        <h4>ReactBlog</h4>
      </div>

      <button onClick={()=>{
        let copy = [...글제목]
        글제목변경(copy.sort())
      }}>가나다순정렬</button>
      <button onClick={()=>{
        let copy = [...글제목];
        copy[0] = '여자 코트 추천';
        글제목변경(copy)
      }}>글수정</button>

      {
        글제목.map(function(a, i){
          return (
            <div className="list">
              <h4 onClick={()=>{
                setModal(!modal);
                setTitle(i);
              }}>{글제목[i]}
              <span onClick={(e)=>{
                e.stopPropagation();
                let copy = [...따봉];
                copy[i] = copy[i] + 1;
                따봉변경(copy)
              }}>👍</span>{따봉[i]}
              </h4>
              <p>2월 17일 발행</p>
              <button onClick={()=>{
                let copy = [...글제목];
                copy.splice(i, 1);
                글제목변경(copy)
              }}>글삭제</button>
            </div>
          )
        })
      }
      
      <input onChange={(e)=>{
        입력값변경(e.target.value);
      }}></input>
      <button onClick={()=>{
        let copy = [...글제목];
        copy.unshift((입력값));
        글제목변경(copy)
      }}>글발행</button>
      

        {
          // 조건식 ? 참일때 실행할 코드 : 거짓일때 실행할 코드
          modal == true ? <Modal title={title} 글제목변경={글제목변경} color={'skyblue'} 글제목={글제목}/> : ''
        }
    </div>
  );
}

export default App;
