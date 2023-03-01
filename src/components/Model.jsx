import { useEffect, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { clone } from 'three/examples/jsm/utils/SkeletonUtils'

export default function Model(props) {
  let { scene } = useGLTF(`/models/${props.name}.glb`)
  
  scene = useMemo(() => clone(scene), [scene])
     
  useEffect(() => {
    scene.traverse((child) => {
      child.frustumCulled = false
    })
  }, [scene])
  
  return (
    <primitive
      ref={props.reference}
      onClick={props.handleMouseClick}
      position={props.position}
      rotation={props.rotation}
      scale={props.scale}
      object={scene}
    />
  )
}

useGLTF.preload('/models/Tile.glb')
