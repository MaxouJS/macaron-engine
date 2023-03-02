import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, PerspectiveCamera, PresentationControls } from '@react-three/drei'

import MaleDummy from './characters/maleDummy/MaleDummy'

export default function Controller(props) {
  const [directions, setDirections] = useState([])
  const [animation, setAnimation] = useState('Idle')
  const [isRunning, setIsRunning] = useState(false)

  const [userXPosition, setUserXPosition] = useState(0)
  const [userZPosition, setUserZPosition] = useState(0)
  const [userYRotation, setUserYRotation] = useState(0)

  const HandleKeyDown = () => {
    window.addEventListener('keydown', e => {
      if (e.defaultPrevented) {
        return
      } else if ((e.key === 'ArrowUp' || e.key === 'z')) {
        setDirections([...directions, 'Up'])
      } else if ((e.key === 'ArrowDown' || e.key === 's')) {
        setDirections([...directions, 'Down'])
      } else if ((e.key === 'ArrowLeft' || e.key === 'q')) {
        setDirections([...directions, 'Left'])
      } else if ((e.key === 'ArrowRight' || e.key === 'd')) {
        setDirections([...directions, 'Right'])
      } else if (e.key === ' ') {
        setIsRunning(true)
      }
    }, false)
  }

  const HandleKeyUp = () => {
    window.addEventListener('keyup', e => {
      if (e.defaultPrevented) {
        return
      } else if (e.key === 'ArrowUp' || e.key === 'z') {
        setDirections(directions.filter(d => d !== 'Up'))
      } else if (e.key === 'ArrowDown' || e.key === 's') {
        setDirections(directions.filter(d => d !== 'Down'))
      } else if (e.key === 'ArrowLeft' || e.key === 'q') {
        setDirections(directions.filter(d => d !== 'Left'))
      } else if (e.key === 'ArrowRight' || e.key === 'd') {
        setDirections(directions.filter(d => d !== 'Right'))
      } else if (e.key === ' ') {
        setIsRunning(false)
      }
    }, false)
  }

  useEffect(() => {  
    HandleKeyDown()
    HandleKeyUp()
  })

  useFrame((state, delta) => {  
    let speed = 0

    if (!isRunning) {
      speed = 5
    } else {
      speed = 10
    }

    if (directions.includes('Up')) {
      setUserZPosition(userZPosition - delta * speed)
    } 
    
    if (directions.includes('Down')) {
      setUserZPosition(userZPosition + delta * speed)
    } 
    
    if (directions.includes('Left')) {
      setUserXPosition(userXPosition - delta * speed)
    } 
    
    if (directions.includes('Right')) {
      setUserXPosition(userXPosition + delta * speed)
    }
    
    if (directions.includes('Up') && directions.length === 1) {
      setUserYRotation(-Math.PI / 1)
    } else if (directions.includes('Down') && directions.length === 1) {
      setUserYRotation(Math.PI * 2)
    } else if (directions.includes('Left') && directions.length === 1) {
      setUserYRotation(-Math.PI / 2)
    } else if (directions.includes('Right') && directions.length === 1) {
      setUserYRotation(Math.PI / 2)
    } else if (directions.includes('Up') && directions.includes('Left')) {
      setUserYRotation(-Math.PI / 1.5)
    } else if (directions.includes('Up') && directions.includes('Right')) {
      setUserYRotation(Math.PI / 1.5)
    } else if (directions.includes('Down') && directions.includes('Left')) {
      setUserYRotation(Math.PI * 1.75)
    } else if (directions.includes('Down') && directions.includes('Right')) {
      setUserYRotation(-Math.PI * 1.75)
    }
    
    if (directions.length === 0) {
      setAnimation('Idle')
    }

    if (directions.length > 0) {
      if (!isRunning) {
        setAnimation('Walk')
      } else {
        setAnimation('Run')
      }
    }
  })

  return (
    <PresentationControls
      enabled={false}
      snap={<MaleDummy />}
      rotation={[Math.PI * 2, 0, 0]}
    >
      <Html fullscreen>
      </Html>
      <PerspectiveCamera
        position={[-userXPosition, -2, -userZPosition]}
      >
        <MaleDummy
          animation={animation}
          position={[userXPosition, 0, userZPosition]}
          rotation={[0, userYRotation, 0]}
        />
        {props.children}
      </PerspectiveCamera>
    </PresentationControls>
  )
}
