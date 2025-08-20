import React from 'react'

interface RectangleProps {
  position: [number, number, number]
  rotation?: [number, number, number]
}


const Rectangle: React.FC<RectangleProps> = ({ position }) => {
  return (
    <mesh position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="gray" />
    </mesh>
  )
}

export default Rectangle
