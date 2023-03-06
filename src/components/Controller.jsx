import { useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, PerspectiveCamera, PresentationControls } from '@react-three/drei';

import MaleDummy from './characters/maleDummy/MaleDummy';
import DevUi from './ui/DevUi';

export default function Controller(props) {
  const [directions, setDirections] = useState([]);
  const [animation, setAnimation] = useState('Idle');
  const [isRunning, setIsRunning] = useState(false);

  const [cameraXPosititon, setCameraXPosition] = useState(0);
  const [cameraZPosititon, setCameraZPosition] = useState(0);
  const [userXPosition, setUserXPosition] = useState(0);
  const [userZPosition, setUserZPosition] = useState(0);
  const [userYRotation, setUserYRotation] = useState(0);
  const [userLayer, setUserLayer] = useState(0);

  function HandleKeyDown() {
    const onKeyDown = e => {
      if (e.defaultPrevented) {
        return
      } else if ((e.key === 'ArrowUp' || e.key === 'z' || e.key === 'w') && !directions.includes('Down')) {
        setDirections([...directions, 'Up'])
      } else if ((e.key === 'ArrowDown' || e.key === 's') && !directions.includes('Up')) {
        setDirections([...directions, 'Down'])
      } else if ((e.key === 'ArrowLeft' || e.key === 'q' || e.key === 'a') && !directions.includes('Right')) {
        setDirections([...directions, 'Left'])
      } else if ((e.key === 'ArrowRight' || e.key === 'd') && !directions.includes('Left')) {
        setDirections([...directions, 'Right'])
      } else if (e.key === ' ') {
        setIsRunning(true)
      };
    };
  
    window.addEventListener('keydown', onKeyDown, false);
  
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  };
  
  function HandleKeyUp() {
    const onKeyUp = e => {
      if (e.defaultPrevented) {
        return
      } else if (e.key === 'ArrowUp' || e.key === 'z' || e.key === 'w') {
        setDirections(directions.filter(d => d !== 'Up'))
      } else if (e.key === 'ArrowDown' || e.key === 's') {
        setDirections(directions.filter(d => d !== 'Down'))
      } else if (e.key === 'ArrowLeft' || e.key === 'q' || e.key === 'a') {
        setDirections(directions.filter(d => d !== 'Left'))
      } else if (e.key === 'ArrowRight' || e.key === 'd') {
        setDirections(directions.filter(d => d !== 'Right'))
      } else if (e.key === ' ') {
        setIsRunning(false);
      };
    };
  
    window.addEventListener('keyup', onKeyUp, false);
  
    return () => {
      window.removeEventListener('keyup', onKeyUp);
    };
  };

  useEffect(() => {  
    HandleKeyDown();
    HandleKeyUp();
  });

  useFrame((state, delta) => {
    const speed = isRunning ? 10 : 5;
    const distance = speed * delta;
    let userNewXPosition = userXPosition;
    let userNewZPosition = userZPosition;
    let isColliding = false;

    if (directions.includes('Up')) {
      userNewZPosition -= distance;
    };

    if (directions.includes('Down')) {
      userNewZPosition += distance;
    };

    if (directions.includes('Left')) {
      userNewXPosition -= distance;
    };

    if (directions.includes('Right')) {
      userNewXPosition += distance;
    };

    props.objects.forEach((o) => {
      if (!o.isSolid) {
        return;
      };

      const length = [o.position[2] + o.size[2] / 2 + 0.2, o.position[2] - o.size[2] / 2 - 0.2];
      const width = [o.position[0] + o.size[0] / 2 + 0.2, o.position[0] - o.size[0] / 2 - 0.2];

      if (userNewZPosition <= length[0] && userNewZPosition >= length[1] && userNewXPosition <= width[0] && userNewXPosition >= width[1] && userLayer === o.layer) {
        isColliding = true;

        if (o.isStairs) {
          if (o.stairsDirection === 'Up') {
            setUserZPosition(userNewZPosition - 2)
            setUserLayer(1)
          };
        };
      };
    });

    if (!isColliding) {
      setUserXPosition(userNewXPosition);
      setUserZPosition(userNewZPosition);
      setCameraXPosition(-userNewXPosition);
      setCameraZPosition(-userNewZPosition);
    };
    
    if (directions.includes('Up') && !directions.includes('Left') && !directions.includes('Right')) {
      setUserYRotation(-Math.PI / 1);
    } else if (directions.includes('Down') && !directions.includes('Left') && !directions.includes('Right')) {
      setUserYRotation(Math.PI * 2);
    } else if (directions.includes('Left') && !directions.includes('Up') && !directions.includes('Down')) {
      setUserYRotation(-Math.PI / 2);
    } else if (directions.includes('Right') && !directions.includes('Up') && !directions.includes('Down')) {
      setUserYRotation(Math.PI / 2);
    } else if (directions.includes('Up') && directions.includes('Left')) {
      setUserYRotation(-Math.PI / 1.5);
    } else if (directions.includes('Up') && directions.includes('Right')) {
      setUserYRotation(Math.PI / 1.5);
    } else if (directions.includes('Down') && directions.includes('Left')) {
      setUserYRotation(Math.PI * 1.75);
    } else if (directions.includes('Down') && directions.includes('Right')) {
      setUserYRotation(-Math.PI * 1.75);
    };
    
    if (directions.length === 0) {
      setAnimation('Idle');
    };

    if (directions.length > 0) {
      !isRunning ? setAnimation('Walk') : setAnimation('Run');
    };
  });

  return (
    <>
      <Html fullscreen>
        <DevUi />
      </Html>
      <PresentationControls
        enabled={false}
        rotation={[0, 0, 0]}
      >
        <PerspectiveCamera
          position={[cameraXPosititon, -2 + (userLayer * -2), cameraZPosititon]}
        >
          <MaleDummy
            animation={animation}
            position={[userXPosition, userLayer * 2, userZPosition]}
            rotation={[0, userYRotation, 0]}
          />
          {props.children}
        </PerspectiveCamera>
      </PresentationControls>
    </>
  );
};
