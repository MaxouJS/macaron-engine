import { Loader } from '@react-three/drei'
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
        <Bgm />
        <Controller>
          <Model
            name='Floor'
          />
        </Controller>
      </Canvas>
      <Loader />
    </>
  )
}
