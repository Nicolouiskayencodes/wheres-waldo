import avengers from './assets/avengers.jpg'
import selectBoxSVG from './assets/selectBox.svg'
import { useRef, useState, useEffect } from 'react'
import './App.css'

function App() {
  const imageref = useRef(null)
  const [imagewidth, setImageWidth] = useState(null);

  useEffect(() => {
    setTimeout(()=>{
     getWidth();}
    , 0
    )
    function getWidth() {
      setImageWidth(imageref.current.getBoundingClientRect().width/1280)
    }
    window.addEventListener('resize', getWidth);
    addEventListener('load', getWidth)
    return window.removeEventListener('resize', getWidth);
  }, [])

  document.addEventListener('click', (event)=>{
    const imagebox = document.querySelector('#imagebox')
    const selectbox = document.querySelector('#selectbox')
    if (!(event.target === imagebox)){
      selectbox.style.display = 'none'
    }
  })
  
  function captureCoordinates(event) {
    const imagebox = document.querySelector('#imagebox')
    const selectbox = document.querySelector('#selectbox')
    const imageOffset = imagebox.getBoundingClientRect()
    const x = Math.round((event.pageX-imageOffset.left)*1280/imagebox.width);
    const y = Math.round((event.pageY-imageOffset.top)*853/imagebox.height);
    console.log(x,y)
    selectbox.style.left = event.pageX-(selectbox.width/2) + 'px'
    selectbox.style.top = event.pageY-(selectbox.height/2) + 'px'
    selectbox.style.display = 'block'
  }

  return (
    <>
      <button id='imagebutton' onClick={captureCoordinates}>
        <img src={selectBoxSVG} id='selectbox' style={{transform: `scale(${imagewidth})`}}></img>
        <img id='imagebox' src={avengers} ref={imageref}></img>
      </button>
    </>
  )
}

export default App
