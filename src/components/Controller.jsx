import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, PerspectiveCamera, PresentationControls } from '@react-three/drei'

import MaleDummy from './characters/maleDummy/MaleDummy'

export default function Controller(props) {
  const [directions, setDirections] = useState([])
  const [animation, setAnimation] = useState('Idle')

  const [userXPosition, setUserXPosition] = useState(0)
  const [userZPosition, setUserZPosition] = useState(0)
  const [yRotation, setYRotation] = useState(0)
  const [cameraXPosition, setCameraXPosition] = useState(0)
  const [cameraZPosition, setCameraZPosition] = useState(0)

  const keyControls = () => {
    document.addEventListener('keydown', e => {
      if (e.defaultPrevented) {
        return
      } else if  ((e.key === 'ArrowUp' || e.key === 'z') && !directions.includes('Up') && !directions.includes('Down')) {
        setDirections([...directions, 'Up'])
      } else if  ((e.key === 'ArrowDown' || e.key === 's') && !directions.includes('Down') && !directions.includes('Up')) {
        setDirections([...directions, 'Down'])
      } else if  ((e.key === 'ArrowLeft' || e.key === 'q') && !directions.includes('Left') && !directions.includes('Right')) {
        setDirections([...directions, 'Left'])
      } else if  ((e.key === 'ArrowRight' || e.key === 'd') && !directions.includes('Right') && !directions.includes('Left')) {
        setDirections([...directions, 'Right'])
      } else if (e.key === ' ') {
        setDirections([])
      }
    }, false)

    document.addEventListener('keyup', e => {
      if (e.defaultPrevented) {
        return
      } else if (e.key === 'ArrowUp' || e.key === 'z') {
        setDirections(directions.splice(directions.indexOf('Up')))
        // setDirections(directions.filter(d => d !== 'Up'))
      } else if (e.key === 'ArrowDown' || e.key === 's') {
        setDirections(directions.splice(directions.indexOf('Down')))
        // setDirections(directions.filter(d => d !== 'Down'))
      } else if (e.key === 'ArrowLeft' || e.key === 'q') {
        setDirections(directions.splice(directions.indexOf('Left')))
        // setDirections(directions.filter(d => d !== 'Left'))
      } else if (e.key === 'ArrowRight' || e.key === 'd') {
        setDirections(directions.splice(directions.indexOf('Right')))
        // setDirections(directions.filter(d => d !== 'Right'))
      }
    }, false)
  }

  useEffect(() => {
    keyControls()
  })

  useFrame((state, delta) => {    
    let speed = 0

    if (directions && directions.length === 1) {
      speed = 5
    } else if (directions && directions.length > 1) {
      speed = 4
    } else {
      speed = 0
    }

    if (directions && directions.includes('Up')) {
      setUserZPosition(userZPosition - delta * speed)
    }
    
    if (directions && directions.includes('Down')) {
      setUserZPosition(userZPosition + delta * speed)
    }
    
    if (directions && directions.includes('Left')) {
      setUserXPosition(userXPosition - delta * speed)
    }
    
    if (directions && directions.includes('Right')) {
      setUserXPosition(userXPosition + delta * speed)
    }

    if (directions && directions.includes('Up') && directions.length === 1) {
      setYRotation(-Math.PI / 1)
    } else if (directions && directions.includes('Down') && directions.length === 1) {
      setYRotation(Math.PI * 2)
    } else if (directions && directions.includes('Left') && directions.length === 1) {
      setYRotation(-Math.PI / 2)
    } else if (directions && directions.includes('Right') && directions.length === 1) {
      setYRotation(Math.PI / 2)
    } else if (directions && directions.includes('Up') && directions.includes('Left')) {
      setYRotation(-Math.PI / 1.5)
    } else if (directions && directions.includes('Up') && directions.includes('Right')) {
      setYRotation(Math.PI / 1.5)
    } else if (directions && directions.includes('Down') && directions.includes('Left')) {
      setYRotation(Math.PI * 1.75)
    } else if (directions && directions.includes('Down') && directions.includes('Right')) {
      setYRotation(-Math.PI * 1.75)
    }
    
    if (directions && directions.length === 0) {
      setAnimation('Idle')
    }

    if (directions && directions.length > 0) {
      setAnimation('Run')
    }

    setTimeout(() => {
      setCameraXPosition(-userXPosition)
      setCameraZPosition(-userZPosition)
    }, 200)
  })

  return (
    <PresentationControls
      enabled={false}
      snap={<MaleDummy />}
      speed={2}
      zoom={2.5}
      rotation={[Math.PI * 2, 0, 0]}
      polar={[-Math.PI * 0.25, Math.PI * 0.25]}
      azimuth={[-Math.PI * 0.5, Math.PI * 0.5]}
    >
      <Html fullscreen>
      </Html>
      <PerspectiveCamera
        position={[cameraXPosition, -2, cameraZPosition]}
      >
        <MaleDummy
          animation={animation}
          position={[userXPosition, 0, userZPosition]}
          rotation={[0, yRotation, 0]}
        />
        {props.children}
      </PerspectiveCamera>
    </PresentationControls>
  )
}
