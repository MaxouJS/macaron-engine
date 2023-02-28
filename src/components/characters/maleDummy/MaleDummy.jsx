import Animation from '../../Animation'

export default function MaleDummy(props) {
  return (
    <>
      {
        props.animation === 'Idle'
          ?
            <Animation
              name='MaleDummyIdle'
              position={props.position}
              rotation={props.rotation}
              scale={[1, 1, 1]}
            />
          :
            null
      }
      {
        props.animation === 'Run'
          ?
            <Animation
              name='MaleDummyRun'
              position={props.position}
              rotation={props.rotation}
              scale={[1, 1, 1]}
            />
          :
            null
      }
      {
        props.animation === 'Walk'
          ?
            <Animation
              name='MaleDummyWalk'
              position={props.position}
              rotation={props.rotation}
              scale={[1, 1, 1]}
            />
          :
            null
      }
    </>
  )
}
