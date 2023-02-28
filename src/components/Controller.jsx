import { useRef, useState } from 'react'
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

  useFrame((state, delta) => {
    let speed = 0

    window.addEventListener('keydown', e => {
      if (e.key === 'ArrowUp' && !directions.includes('Up') && !directions.includes('Down')) {
        setDirections([...directions, 'Up'])
      } 
      
      if (e.key === 'ArrowDown' && !directions.includes('Down') && !directions.includes('Up')) {
        setDirections([...directions, 'Down'])
      } 
      
      if (e.key === 'ArrowLeft' && !directions.includes('Left') && !directions.includes('Right')) {
        setDirections([...directions, 'Left'])
      } 
      
      if (e.key === 'ArrowRight' && !directions.includes('Right') && !directions.includes('Left')) {
        setDirections([...directions, 'Right'])
      }

      if (e.key === ' ') {
        setDirections([])
      }
    })

    window.addEventListener('keyup', e => {
      if (e.key === 'ArrowUp') {
        setDirections(directions.filter(d => d !== 'Up'))
      }
      
      if (e.key === 'ArrowDown') {
        setDirections(directions.filter(d => d !== 'Down'))
      }
      
      if (e.key === 'ArrowLeft') {
        setDirections(directions.filter(d => d !== 'Left'))
      }
      
      if (e.key === 'ArrowRight') {
        setDirections(directions.filter(d => d !== 'Right'))
      }
    })

    window.addEventListener('keypress', e => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        setDirections([])
      }
    })

    if (directions && directions.length > 0) {
      speed = 10
    } else {
      speed = 0
    }

    if (directions && directions[directions.length - 1] === 'Up') {
      setZPosition(zPosition - delta * speed)
      setYRotation(-Math.PI / 1)
    }

    if (directions && directions[directions.length - 1] === 'Down') {
      setZPosition(zPosition + delta * speed)
      setYRotation(Math.PI * 2)
    }

    if (directions && directions[directions.length - 1] === 'Left') {
      setXPosition(xPosition - delta * speed)
      setYRotation(-Math.PI / 2)
    }

    if (directions && directions[directions.length - 1] === 'Right') {
      setXPosition(xPosition + delta * speed)
      setYRotation(Math.PI / 2)
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
      snap={<MaleDummy />}
      rotation={[Math.PI * 2.25, 0, 0]}
      polar={[-Math.PI * 0.25, Math.PI * 0.25]}
      azimuth={[-Math.PI * 0.5, Math.PI * 0.5]}
    >
      <Html fullscreen></Html>
      <PerspectiveCamera
        ref={cameraRef}
        position={[0, -0.5, 0]}
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
