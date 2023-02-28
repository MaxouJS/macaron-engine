import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, PerspectiveCamera, PresentationControls } from '@react-three/drei'

import MaleDummy from './characters/maleDummy/MaleDummy'

export default function Controller(props) {
  const [direction, setDirection] = useState([])
  const [animation, setAnimation] = useState('Idle')

  const [xPosition, setXPosition] = useState(0)
  const [zPosition, setZPosition] = useState(0)
  const [yRotation, setYRotation] = useState(0)

  const cameraRef = useRef()

  useEffect(() => {
    window.addEventListener('keydown', e => {
      if (e.key === 'ArrowUp') {
        setDirection([...direction, 'Up'])
      }

      if (e.key === 'ArrowDown') {
        setDirection([...direction, 'Down'])
      }

      if (e.key === 'ArrowLeft') {
        setDirection([...direction, 'Left'])
      }

      if (e.key === 'ArrowRight') {
        setDirection([...direction, 'Right'])
      }

      if (e.key === ' ') {
        setDirection([...direction, 'Run'])
      }
    })

    window.addEventListener('keyup', e => {
      if (direction && e.key === 'ArrowUp') {
        setDirection(direction.filter(d => d !== 'Up'))
      }

      if (direction && e.key === 'ArrowDown') {
        setDirection(direction.filter(d => d !== 'Down'))
      }

      if (direction && e.key === 'ArrowLeft') {
        setDirection(direction.filter(d => d !== 'Left'))
      }

      if (direction && e.key === 'ArrowRight') {
        setDirection(direction.filter(d => d !== 'Right'))
      }

      if (direction && e.key === ' ') {
        setDirection(direction.filter(d => d !== 'Run'))
      }
    })
  })

  useFrame((state, delta) => {
    let speed = 10

    if (animation === 'Run') {
      speed = 20
    } else {
      speed = 10
    }

    if (direction.includes('Up')) {
      setZPosition(zPosition - delta * speed)
      setYRotation(-Math.PI / 1)
    }

    if (direction.includes('Down')) {
      setZPosition(zPosition + delta * speed)
      setYRotation(Math.PI * 2)
    }

    if (direction.includes('Left')) {
      setXPosition(xPosition - delta * speed)
      setYRotation(-Math.PI / 2)
    }

    if (direction.includes('Right')) {
      setXPosition(xPosition + delta * speed)
      setYRotation(Math.PI / 2)
    }
    
    if (direction && direction.length === 0) {
      setAnimation('Idle')
    }

    if (direction && direction.length > 0) {
      if (direction.includes('Run')) {
        setAnimation('Run')
      } else {
        setAnimation('Walk')
      }
    }

    cameraRef.current.position.z = -zPosition
    cameraRef.current.position.x = -xPosition
  }, [])

  return (
    <PresentationControls
      snap={<MaleDummy />}
      rotation={[Math.PI * 2.25, 0, 0]}
      polar={[-Math.PI * 0.25, Math.PI * 0.25]}
      azimuth={[-Math.PI * 0.5, Math.PI * 0.5]}
    >
      <Html fullscreen>
        
      </Html>
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
