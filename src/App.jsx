import { useState } from 'react'
import avengers from './assets/avengers.jpg'
import selectBoxSVG from './assets/selectBox.svg'
import './App.css'

function App() {
  const [xCoord, setXCoord] = useState(null)
  const [yCoord, setYCoord] = useState(null)

  document.addEventListener('click', (event)=>{
    const imagebox = document.querySelector('#imagebox')
    const selectbox = document.querySelector('#selectbox')
    if (!(event.target === imagebox)){
      selectbox.style.display = 'none'
    }
  })

  function captureCoordinates(event) {
    const imagebox = document.querySelector('#imagebox');
    const selectbox = document.querySelector('#selectbox');
    const searchList = document.querySelector('#search-list');
    const imageOffset = imagebox.getBoundingClientRect();
    const x = Math.round((event.pageX-imageOffset.left)*1280/imagebox.width);
    const y = Math.round((event.pageY-imageOffset.top)*853/imagebox.height);
    setXCoord(x)
    setYCoord(y)
    selectbox.style.left = event.pageX-(selectbox.width/2) + 'px';
    selectbox.style.top = event.pageY-(selectbox.height/2) + 'px';
    selectbox.style.transform = `scale(${imageOffset.width/1280})`;
    selectbox.style.display = 'block';
    searchList.style.visibility = 'visible';
  }

  function nameSelect(event){
    const searchList = document.querySelector('#search-list');
    console.log(event.target.value)
    console.log(xCoord,yCoord)
    searchList.style.visibility = 'hidden';
  }

  return (
    <div id='game-container'>
      <button id='imagebutton' onClick={captureCoordinates}>
        <img src={selectBoxSVG} id='selectbox' ></img>
        <img id='imagebox' src={avengers} ></img>
      </button>
      <div id='search-list'>
        <ul>
          <li><button onClick={nameSelect} value='thanos'>Thanos</button></li>
          <li><button onClick={nameSelect} className='names' value='hulk'>Hulk</button></li>
          <li><button onClick={nameSelect} className='names' value='ironman'>Ironman</button></li>
          <li><button onClick={nameSelect} className='names' value='spiderman'>Spiderman</button></li>
        </ul>
      </div>
    </div>
  )
}

export default App
