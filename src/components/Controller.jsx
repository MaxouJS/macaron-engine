import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, PerspectiveCamera, PresentationControls } from '@react-three/drei'

import MaleDummy from './characters/maleDummy/MaleDummy'

export default function Controller(props) {
  const [direction, setDirection] = useState(null)
  const [animation, setAnimation] = useState('Idle')

  const [xPosition, setXPosition] = useState(0)
  const [zPosition, setZPosition] = useState(0)
  const [yRotation, setYRotation] = useState(0)

  const cameraRef = useRef()

  useEffect(() => {
    window.addEventListener('keydown', e => {
      if (e.key === 'ArrowUp') {
        setAnimation('Walk')
        setDirection('Up')
      }

      if (e.key === 'ArrowDown') {
        setAnimation('Walk')
        setDirection('Down')
      }

      if (e.key === 'ArrowLeft') {
        setAnimation('Walk')
        setDirection('Left')
      }

      if (e.key === 'ArrowRight') {
        setAnimation('Walk')
        setDirection('Right')
      }
    })

    window.addEventListener('keyup', e => {
      if (e.key === 'ArrowUp') {
        setAnimation('Idle')
        setDirection('')
      }

      if (e.key === 'ArrowDown') {
        setAnimation('Idle')
        setDirection('')
      }

      if (e.key === 'ArrowLeft') {
        setAnimation('Idle')
        setDirection('')
      }

      if (e.key === 'ArrowRight') {
        setAnimation('Idle')
        setDirection('')
      }
    })

  })

  useFrame((state, delta) => {
    if (direction === 'Up') {
      setZPosition(zPosition - delta * 10)
      setYRotation(-Math.PI / 1)
    }

    if (direction === 'Down') {
      setZPosition(zPosition + delta * 10)
      setYRotation(Math.PI * 2)
    }

    if (direction === 'Left') {
      setXPosition(xPosition - delta * 10)
      setYRotation(-Math.PI / 2)
    }

    if (direction === 'Right') {
      setXPosition(xPosition + delta * 10)
      setYRotation(Math.PI / 2)
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
