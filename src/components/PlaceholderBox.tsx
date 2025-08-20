import React from 'react'

const PlaceholderBox: React.FC = () => {
  const borderThickness = 0.04
  const centerSize = 0.15
  const cornerSize = 0.85
  const margin = 0.05

  const centerWithBorder = centerSize + borderThickness * 2
  const cornerWithBorder = cornerSize + borderThickness * 2
  const cornerOffset = 0.5 - margin

  const Face = ({ position, rotation = [0, 0, 0] }: { position: [number, number, number], rotation?: [number, number, number] }) => (
    <group position={position} rotation={rotation}>
      <group>
        <mesh position={[0, 0, -0.001]}>
          <planeGeometry args={[centerWithBorder - margin * 2, centerWithBorder - margin * 2]} />
          <meshBasicMaterial color="#000000" />
        </mesh>
        <mesh>
          <planeGeometry args={[centerSize - margin * 2, centerSize - margin * 2]} />
          <meshBasicMaterial color="#bfc2c4" />
        </mesh>
      </group>

      {[
        [-cornerOffset, cornerOffset],
        [cornerOffset, cornerOffset],
        [-cornerOffset, -cornerOffset],
        [cornerOffset, -cornerOffset]
      ].map(([x, y], i) => (
        <group key={i} position={[x, y, 0]}>
          <mesh position={[0, 0, -0.001]}>
            <planeGeometry args={[cornerWithBorder - margin * 2, cornerWithBorder - margin * 2]} />
            <meshBasicMaterial color="#000000" />
          </mesh>
          <mesh>
            <planeGeometry args={[cornerSize - margin * 2, cornerSize - margin * 2]} />
            <meshBasicMaterial color="#bfc2c4" />
          </mesh>
        </group>
      ))}
    </group>
  )

  return (
    <group>
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshBasicMaterial color="#cccccc" wireframe={true} />
      </mesh>

      <Face position={[0, 0, 1.02]} />
      <Face position={[0, 0, -1.02]} rotation={[0, Math.PI, 0]} />
      <Face position={[1.02, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
      <Face position={[-1.02, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
      <Face position={[0, 1.02, 0]} rotation={[-Math.PI / 2, 0, 0]} />
      <Face position={[0, -1.02, 0]} rotation={[Math.PI / 2, 0, 0]} />
    </group>
  )
}

export default PlaceholderBox
