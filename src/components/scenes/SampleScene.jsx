import { ContactShadows, Loader, Sky } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

import Bgm from '../Bgm'
import Controller from '../Controller'
import Model from '../Model'

export default function SampleScene() {
  const objects = [
    {
      name: 'Box',
      isSolid: true,
      position: [-2, 0, -2],
      scale: [2, 2, 2],
      size: [2, 2, 2]
    },
    {
      name: 'Box',
      isSolid: true,
      position: [0, -0.5, -5.25],
      scale: [11, 0.5, 0.5],
      size: [11, 0.5, 0.5]
    },
    {
      name: 'Box',
      isSolid: true,
      position: [-5.25, -0.5, 0],
      scale: [0.5, 0.5, 10],
      size: [0.5, 0.5, 10]
    },
    {
      name: 'Box',
      isSolid: true,
      position: [5.25, -0.5, 0],
      scale: [0.5, 0.5, 10],
      size: [0.5, 0.5, 10]
    },
    {
      name: 'Box',
      isSolid: true,
      position: [0, -0.5, 5.25],
      scale: [11, 0.5, 0.5],
      size: [11, 0.5, 0.5]
    },
  ]

  return (
    <>
      <Canvas>
        <ambientLight />
        <directionalLight position={[5, 20, 10]} />
        <ContactShadows
          position={[0, 0, 0]}
          opacity={0.75}
          scale={25}
          blur={0.1}
          far={100}
          resolution={2048}
        />
        <Bgm />
        <Controller
          objects={objects}
        >
          <Model
            name='Tile'
            scale={[10, 5, 10]}
          />
          {
            objects.map((o, index) => (
              <Model
                key={index}
                name={o.name}
                position={o.position}
                scale={o.scale}
              />
            ))
          }
          <Sky sunPosition={[0, 90, 0]} />
        </Controller>
      </Canvas>
      <Loader />
    </>
  )
}
