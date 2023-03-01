import { ContactShadows, Loader, Sky } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

import Bgm from '../Bgm'
import Controller from '../Controller'
import Model from '../Model'

export default function SampleScene() {
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
        <Controller>
          <Model
            name='Tile'
            scale={[10, 1, 10]}
          />
          <Sky sunPosition={[0, 90, 0]} />
        </Controller>
      </Canvas>
      <Loader />
    </>
  )
}
