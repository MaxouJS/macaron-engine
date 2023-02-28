import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, PerspectiveCamera, PresentationControls } from '@react-three/drei'

import MaleDummy from './characters/maleDummy/MaleDummy'

export default function Controller(props) {
  const [directions, setDirections] = useState([])
  const [animation, setAnimation] = useState('Idle')

  const [mouseXPosition, setMouseXPosition] = useState(-5)
  const [mouseZPosition, setMouseZPosition] = useState(5)
  const [userXPosition, setUserXPosition] = useState(0.25)
  const [userZPosition, setUserZPosition] = useState(0.25)
  const [userYRotation, setUserYRotation] = useState(0)

  const cameraRef = useRef()

  useFrame(({ state, delta, mouse, viewport }) => {
    let speed = 10

    window.addEventListener('dblclick', e => {
      // setMouseXPosition(mouse.x)
      // setMouseZPosition(mouse.y)
    })

    if (userXPosition !== mouseXPosition) {
      console.table({mouseXPosition, mouseZPosition, userXPosition, userZPosition})
      if (mouseXPosition < 0) {
        setUserXPosition(userXPosition - 0.05)
      } else if (mouseXPosition > 0) {
        setUserXPosition(userXPosition + 0.05)
      }
    }

    if (userZPosition < mouseZPosition + 0.5 && userZPosition > mouseZPosition - 0.5) {
      console.table({mouseXPosition, mouseZPosition, userXPosition, userZPosition})
      if (mouseZPosition < 0) {
        setUserZPosition(userZPosition + 0.05)
      } else {
        setUserZPosition(userZPosition - 0.05)
      }
    }

    cameraRef.current.position.x = -userXPosition
    cameraRef.current.position.z = -userZPosition
  })

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
          position={[userXPosition, 0, userZPosition]}
          rotation={[0, userYRotation, 0]}
        />
        {props.children}
      </PerspectiveCamera>
    </PresentationControls>
  )
}
