import React, { useRef, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Rectangle from './Rectangle'
import '../styles.css'

interface Hotspot {
  id: string
  position: THREE.Vector3
}

interface ModelCanvasProps {
  modelUrl?: string
  hotspots?: Hotspot[]
  onHotspotPositionChange?: (id: string, position: THREE.Vector3) => void
}

const ModelCanvas: React.FC<ModelCanvasProps> = ({ modelUrl, hotspots = [], onHotspotPositionChange }) => {
  const groupRef = useRef<THREE.Group>(null)
  const [labels, setLabels] = useState<{ position: THREE.Vector3; text: string }[]>([])
  const [sceneObject, setSceneObject] = useState<THREE.Group | null>(null)

  useEffect(() => {
    if (!modelUrl) {
      setSceneObject(null)
      return
    }
    const loader = new GLTFLoader()
    loader.load(
      modelUrl,
      (gltf) => {
        const model = gltf.scene
        const box = new THREE.Box3().setFromObject(model)
        const center = box.getCenter(new THREE.Vector3())
        model.position.sub(center)

        const size = box.getSize(new THREE.Vector3())
        const maxDim = Math.max(size.x, size.y, size.z)
        const scale = 4.0 / maxDim
        model.scale.set(scale, scale, scale)

        setSceneObject(model)
      },
      undefined,
      (error) => console.error('Error loading GLTF model:', error)
    )
  }, [modelUrl])

  const addLabel = (position: THREE.Vector3) => {
    const text = prompt('Enter label text:') || `Label ${labels.length + 1}`
    setLabels([...labels, { position, text }])
  }

 return (
  <div className="model-viewer">
    <Canvas camera={{ position: [5, 5, 5], fov: 75, near: 0.1, far: 1000 }}>
      <ambientLight intensity={0.6} />
      <directionalLight intensity={0.8} position={[2, 2, 2]} />

      <group ref={groupRef}>
        {!modelUrl ? (
          <>
            <Rectangle position={[0, -1, 0]} rotation={[Math.PI / 2, 0, 0]} />
            <Rectangle position={[0, 1, 0]} rotation={[-Math.PI / 2, 0, 0]} />
            <Rectangle position={[-1, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
            <Rectangle position={[1, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
            <Rectangle position={[0, 0, -1]} rotation={[0, 0, 0]} />
            <Rectangle position={[0, 0, 1]} rotation={[0, Math.PI, 0]} />

            {[[-1, 0, 0], [1, 0, 0], [0, 0, -1], [0, 0, 1]].map((pos, i) => (
              <mesh key={i} position={pos as [number, number, number]}>
                <boxGeometry args={[0.2, 0.2, 0.2]} />
                <meshStandardMaterial color="yellow" />
              </mesh>
            ))}
          </>
        ) : (
          sceneObject && <primitive object={sceneObject} />
        )}

        {hotspots.map((hotspot) => (
          <mesh
            key={hotspot.id}
            position={hotspot.position}
            onClick={(e) => onHotspotPositionChange?.(hotspot.id, e.point)}
          >
            <sphereGeometry args={[0.1, 32, 32]} />
            <meshBasicMaterial color="red" />
          </mesh>
        ))}

        {labels.map((label, index) => (
          <mesh key={index} position={label.position}>
            <sphereGeometry args={[0.1, 32, 32]} />
            <meshBasicMaterial color="red" />
            <Html position={[0, 0.2, 0]}>
              <div style={{ backgroundColor: 'black', color: 'white', padding: '0.25rem', borderRadius: '0.25rem', fontSize: '0.875rem' }}>
                {label.text}
              </div>
            </Html>
          </mesh>
        ))}

        <mesh
          onClick={(e) => addLabel(e.point)}
          geometry={new THREE.BoxGeometry(10, 10, 10)}
          material={new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 })}
        />
      </group>

      <OrbitControls enableDamping enablePan enableRotate />
    </Canvas>
  </div>
)

}

export default ModelCanvas
