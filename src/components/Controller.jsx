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
        setIsRunning(true)
      }
    }, false)

    document.addEventListener('keyup', e => {
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
    keyControls()
  })

  useFrame((state, delta) => {    
    let speed = 0

    if (directions.length === 1) {
      speed = 5
    } else if (directions.length > 1) {
      speed = 4
    }

    if (directions.includes('Up')) {
      setUserZPosition(userZPosition - delta * speed)
    } else if (directions.includes('Down')) {
      setUserZPosition(userZPosition + delta * speed)
    } else if (directions.includes('Left')) {
      setUserXPosition(userXPosition - delta * speed)
    } else if (directions.includes('Right')) {
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
          rotation={[0, userYRotation, 0]}
        />
        {props.children}
      </PerspectiveCamera>
    </PresentationControls>
  )
}
