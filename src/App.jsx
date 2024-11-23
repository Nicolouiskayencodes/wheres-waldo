import avengers from './assets/avengers.jpg'
import selectBoxSVG from './assets/selectBox.svg'
import './App.css'

function App() {
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
    selectbox.style.transform = `scale(${imageOffset.width/1280})`
    selectbox.style.display = 'block'
  }

  return (
    <>
      <button id='imagebutton' onClick={captureCoordinates}>
        <img src={selectBoxSVG} id='selectbox' ></img>
        <img id='imagebox' src={avengers} ></img>
      </button>
    </>
  )
}

export default App
