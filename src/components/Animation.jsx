import { useEffect, useMemo } from 'react';
import { useAnimations, useGLTF } from '@react-three/drei';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils';

export default function Animation(props) {
  let { scene, animations } = useGLTF(`/animations/${props.name}.glb`);
  
  scene = useMemo(() => clone(scene), [scene]);
  
  const { actions } = useAnimations(animations, scene);
   
  useEffect(() => {
    scene.traverse((child) => {
      child.frustumCulled = true;
    });
    
    actions.ArmatureAction.play();
  }, [actions, scene]);
  
  return (
    <primitive
      position={props.position}
      rotation={props.rotation}
      scale={props.scale}
      object={scene}
    />
  );
};

useGLTF.preload('/animations/MaleDummyIdle.glb');
useGLTF.preload('/animations/MaleDummyRun.glb');
useGLTF.preload('/animations/MaleDummyWalk.glb');

