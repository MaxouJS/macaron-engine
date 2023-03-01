import Animation from '../../Animation'
import Model from '../../Model'

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
            />
          :
            null
      }
      <Model
        name='Shadow'
        position={[props.position[0], 0.01, props.position[2]]}
      />
    </>
  )
}
