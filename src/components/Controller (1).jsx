import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, PerspectiveCamera, PresentationControls } from '@react-three/drei'

import MaleDummy from './characters/maleDummy/MaleDummy'

export default function Controller(props) {
  const [directions, setDirections] = useState([])
  const [animation, setAnimation] = useState('Idle')

  const [xPosition, setXPosition] = useState(0)
  const [zPosition, setZPosition] = useState(0)
  const [yRotation, setYRotation] = useState(0)

  const cameraRef = useRef()

  const keyControls = () => {
    document.addEventListener('keydown', e => {
      if (e.defaultPrevented) {
        return
      }
      
      if ((e.key === 'ArrowUp' || e.key === 'z') && !directions.includes('Up') && !directions.includes('Down')) {
        setDirections([...directions, 'Up'])
      }
      
      if ((e.key === 'ArrowDown' || e.key === 's') && !directions.includes('Down') && !directions.includes('Up')) {
        setDirections([...directions, 'Down'])
      }
      
      if ((e.key === 'ArrowLeft' || e.key === 'q') && !directions.includes('Left') && !directions.includes('Right')) {
        setDirections([...directions, 'Left'])
      }
      
      if ((e.key === 'ArrowRight' || e.key === 'd') && !directions.includes('Right') && !directions.includes('Left')) {
        setDirections([...directions, 'Right'])
      }

      if (e.key === ' ') {
        setDirections([])
      }
    }, false)

    document.addEventListener('keyup', e => {
      if (e.defaultPrevented) {
        return
      }

      if (e.key === 'ArrowUp' || e.key === 'z') {
        setDirections(directions.filter(d => d !== 'Up'))
      }
      
      if (e.key === 'ArrowDown' || e.key === 's') {
        setDirections(directions.filter(d => d !== 'Down'))
      }
      
      if (e.key === 'ArrowLeft' || e.key === 'q') {
        setDirections(directions.filter(d => d !== 'Left'))
      }
      
      if (e.key === 'ArrowRight' || e.key === 'd') {
        setDirections(directions.filter(d => d !== 'Right'))
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
      setZPosition(zPosition - delta * speed)
    }
    
    if (directions && directions.includes('Down')) {
      setZPosition(zPosition + delta * speed)
    }
    
    if (directions && directions.includes('Left')) {
      setXPosition(xPosition - delta * speed)
    }
    
    if (directions && directions.includes('Right')) {
      setXPosition(xPosition + delta * speed)
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

    cameraRef.current.position.z = -zPosition
    cameraRef.current.position.x = -xPosition
  })

  return (
    <PresentationControls
      enabled={true}
      snap={<MaleDummy />}
      speed={2}
      zoom={2.5}
      rotation={[Math.PI * 2.25, 0, 0]}
      polar={[-Math.PI * 0.25, Math.PI * 0.25]}
      azimuth={[-Math.PI * 0.5, Math.PI * 0.5]}
    >
      <Html fullscreen>
      </Html>
      <PerspectiveCamera
        ref={cameraRef}
        position={[0, -1, 0]}
        rotation={[0, 0, 0]}
      >
        <MaleDummy
          animation={animation}
          position={[xPosition, 0, zPosition]}
          rotation={[0, yRotation, 0]}
        />
        {props.children}
      </PerspectiveCamera>
    </PresentationControls>
  )
}
