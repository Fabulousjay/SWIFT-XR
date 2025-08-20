import React from 'react'

const PlaceholderBox: React.FC = () => {
  return (
    <group>
      <mesh>
        <boxGeometry args={[8, 8, 8]} />
        <meshStandardMaterial color="#ecf0f1" wireframe={true} />
      </mesh>
      
      <mesh position={[0, 0, 4.01]}>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#bdc3c7" transparent opacity={0.3} />
      </mesh>
      <mesh position={[0, 0, 4.02]} rotation={[0, 0, 0]}>
        <planeGeometry args={[2, 2]} />
        <meshStandardMaterial color="#3498db" />
      </mesh>
      
      <mesh position={[0, 0, -4.01]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#bdc3c7" transparent opacity={0.3} />
      </mesh>
      <mesh position={[0, 0, -4.02]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[2, 2]} />
        <meshStandardMaterial color="#3498db" />
      </mesh>
      
      <mesh position={[4.01, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#bdc3c7" transparent opacity={0.3} />
      </mesh>
      <mesh position={[4.02, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[2, 2]} />
        <meshStandardMaterial color="#3498db" />
      </mesh>
      
      <mesh position={[-4.01, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#bdc3c7" transparent opacity={0.3} />
      </mesh>
      <mesh position={[-4.02, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[2, 2]} />
        <meshStandardMaterial color="#3498db" />
      </mesh>
      
   
      <mesh position={[0, 4.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#bdc3c7" transparent opacity={0.3} />
      </mesh>
      <mesh position={[0, 4.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2, 2]} />
        <meshStandardMaterial color="#3498db" />
      </mesh>
      
      <mesh position={[0, -4.01, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#bdc3c7" transparent opacity={0.3} />
      </mesh>
      <mesh position={[0, -4.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2, 2]} />
        <meshStandardMaterial color="#3498db" />
      </mesh>
    </group>
  )
}

export default PlaceholderBox