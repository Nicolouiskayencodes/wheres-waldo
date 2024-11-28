import { useState, useEffect, useRef } from 'react';
import selectBoxSVG from '../assets/selectBox.svg';
import PropTypes from 'prop-types';

export default function SelectGame({imageId}) {
  const [xCoord, setXCoord] = useState(null)
  const [yCoord, setYCoord] = useState(null)
  const [canvas, setCanvas] = useState(null)
  const [gameId, setGameId] = useState(null)
  const [clickLeft, setClickLeft] = useState(null)
  const [clickTop, setClickTop] = useState(null)
  const [found, setFound] = useState([])
  const scoreName = useRef(null)

  useEffect(() => {
    fetch(`http://localhost:3000/image/${imageId}`, {mode: 'cors', method:"POST", headers:{
      "Content-Type": "application/json"
    }})
    .then(response=>{
      return response.json()
    })
    .then(response=>{
      console.log(response)
      setCanvas(response.image)
      setGameId(response.score)
    })
    .catch(error=>console.log(error))
  }, [imageId])

  document.addEventListener('click', (event)=>{
    const imagebox = document.querySelector('#imagebox')
    const selectbox = document.querySelector('#selectbox')
    const searchList = document.querySelector('#search-list');
    if (selectbox && (event.target !== imagebox)){
      selectbox.style.display = 'none'
      if (event.target !== searchList){
      searchList.style.visibility = 'hidden'
    }
    }
    
  })

  function captureCoordinates(event) {
    const imagebox = document.querySelector('#imagebox');
    const selectbox = document.querySelector('#selectbox');
    const searchList = document.querySelector('#search-list');
    const imageOffset = imagebox.getBoundingClientRect();
    const x = Math.round((event.pageX-imageOffset.left)*1280/imagebox.width);
    const y = Math.round((event.pageY-imageOffset.top)*853/imagebox.height);
    setClickLeft(event.pageX)
    setClickTop(event.pageY)
    setXCoord(x)
    setYCoord(y)
    selectbox.style.left = event.pageX-(selectbox.width/2) + 'px';
    selectbox.style.top = event.pageY-(selectbox.height/2) + 'px';
    selectbox.style.transform = `scale(${imageOffset.width/1280})`;
    selectbox.style.display = 'block';
    searchList.style.visibility = 'visible';
  }

  async function nameSelect(event){
    const searchList = document.querySelector('#search-list');
    searchList.style.visibility = 'hidden';
    await fetch(`http://localhost:3000/${imageId}/guess/${gameId.id}`, {mode: 'cors', method:"POST", headers: {
      "Content-Type": "application/json",
  },
    body: JSON.stringify({
      character: event.target.value,
      xguess: xCoord,
      yguess: yCoord
    })
    })
    .then(response=>{
      return response.json()
    })
    .then(response=>{
      if (response !== false){
      setCanvas(response.image)
      setGameId(response.score)
      setFound([...found, {left: clickLeft, top: clickTop}])
      }
    })
  }
  function closeModal() {
    const dialog = document.querySelector('#name-prompt')
    dialog.close()
  }
  function addName() {
    fetch(`http://localhost:3000/name/${gameId.id}`, {mode:'cors', method:"PUT", headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: scoreName.current.value
    })
  })
  .then(response=>{
    return response.json()
  })
  .then(response=>{
    setCanvas(response.image)
    setGameId(response.score)
  })
  }

  return (
    (gameId && gameId.completionTime !== null) ? (<>
    {(gameId.name === null) &&
      <dialog id='name-prompt' open>
        <p>Completed in {gameId.completionTime/1000} seconds</p>
        <label>Add your name to this score:
          <input ref={scoreName} type="text" />
        </label>
        <button id='skip' onClick={closeModal}>Skip</button>
        <button id='add-name' onClick={addName}>Add name</button>
      </dialog>
    }
      {canvas && <>
      <table>
      <caption>High Scores!</caption>
      <thead>
        <tr>
          <th>Place</th>
          <th>Name</th>
          <th>Time</th>
        </tr>
        </thead>
        <tbody>
      {canvas.scores.map(score => <tr key={score.id}>
        {(score.name !== null) ?(
          <><td>{canvas.scores.indexOf(score)+1}</td><td>{score.name}</td><td>{score.completionTime/1000}s</td></>
        ):(
        <><td>{canvas.scores.indexOf(score)+1}</td><td>Anonymous</td><td>{score.completionTime/1000}s</td></>
        )}
        </tr>)}
        </tbody>
      </table>
      </>}
    </>) : (
    (canvas) ? (
      <div id='game-container'>
      <button id='imagebutton' onClick={captureCoordinates}>
        <img src={selectBoxSVG} id='selectbox' ></img>
        <img id='imagebox' src={canvas.link} ></img>
        {found && found.map(element => <div className='found' key={found.indexOf(element)} style={{left: element.left, top: element.top}}></div>)}
      </button>
      <div id='search-list'>
        {canvas.characters.map(character => 
          (!gameId.found.includes(character.name)) ? (
            <button onClick={nameSelect} className='names' value={character.name} key={character.id}>{character.name}</button>
          ) : (<div key={character.id}></div>)
        )}
      </div>
    </div>
     ) : (
      <p>Loading...</p>
     )
  )
)
}

SelectGame.propTypes = {
  imageId: PropTypes.number
}
