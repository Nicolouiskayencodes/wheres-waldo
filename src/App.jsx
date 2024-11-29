import { Link } from 'react-router-dom'
import './App.css'
import { useEffect, useState } from 'react'

function App() {
  const [images, setImages] = useState(null)

  useEffect(() => {
    fetch(`https://wheres-waldo-backend-gpoc.onrender.com/`, {mode: 'cors', method:"GET", headers:{
      "Content-Type": "application/json"
    }})
    .then(response=>{
      return response.json()
    })
    .then(response=>{
      setImages(response)
    })
  }, [])
  return(
    <>
    <h1>Where{"'"}s Waldo / I Spy</h1>
    <p>Pick an image to play</p>
    {images && images.map(image => <Link to={`/${image.id}`} key={image.id}><img className='image-link' src={image.link}/></Link>)}
    </>
  )
}

export default App
