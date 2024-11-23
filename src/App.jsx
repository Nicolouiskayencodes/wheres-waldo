import avengers from './assets/avengers.jpg'
import './App.css'

function App() {
  function captureCoordinates(event) {
    const imagebox = document.querySelector('#imagebox')
    const imageOffset = imagebox.getBoundingClientRect()
    let x = 0
    let y = 0
    if (window.matchMedia("(max-width: 650px)").matches){
      x =(event.pageX-imageOffset.left)*1280/400
      y =(event.pageY-imageOffset.top)*1280/400
    } else if (window.matchMedia("(max-width: 1050px)").matches){
      x =(event.pageX-imageOffset.left)*1280/600
      y =(event.pageY-imageOffset.top)*1280/600
    } else if (window.matchMedia("(max-width: 1300px)").matches){
      x =(event.pageX-imageOffset.left)*1280/1000
      y =(event.pageY-imageOffset.top)*1280/1000
    } else {
      x =(event.pageX-imageOffset.left)
      y =(event.pageY-imageOffset.top)
    }
   return console.log(x,y)
  }

  return (
    <>
      <button onClick={captureCoordinates}>
        <img id='imagebox' src={avengers}></img>
      </button>
    </>
  )
}

export default App
