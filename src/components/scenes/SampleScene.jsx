import { ContactShadows, Loader, Sky } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

import Bgm from '../Bgm'
import Controller from '../Controller'
import Model from '../Model'

export default function SampleScene() {
  const objects = [
    {
      name: 'Box',
      position: [0, 0, -4],
      scale: [10, 4, 2],
      size: [10, 4, 2]
    },
    {
      name: 'Box',
      position: [-2, 0, -2],
      scale: [2, 2, 2],
      size: [2, 2, 2]
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
