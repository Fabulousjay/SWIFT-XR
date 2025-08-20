import React, { useRef, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import PlaceholderBox from './PlaceholderBox'
import '../styles.css'

interface Hotspot {
  id: string
  position: THREE.Vector3
  label: string
}

interface ModelCanvasProps {
  modelUrl?: string
  hotspots?: Hotspot[]
  onHotspotPositionChange?: (id: string, position: THREE.Vector3) => void
  isAddingHotspot?: boolean
}

const ModelCanvas: React.FC<ModelCanvasProps> = ({ 
  modelUrl, 
  hotspots = [], 
  onHotspotPositionChange,
  isAddingHotspot = false 
}) => {
  const groupRef = useRef<THREE.Group>(null)
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

  const handleClick = (event: any) => {
    if (!isAddingHotspot || !onHotspotPositionChange) return
    
    const latestHotspot = hotspots[hotspots.length - 1]
    if (latestHotspot) {
      onHotspotPositionChange(latestHotspot.id, event.point)
    }
  }

  return (
    <div className="model-viewer">
      <Canvas camera={{ position: [10, 10, 10], fov: 45, near: 0.1, far: 1000 }}>
        <ambientLight intensity={0.6} />
        <directionalLight intensity={0.8} position={[5, 5, 5]} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} />

        <group ref={groupRef} onClick={handleClick}>
          {!modelUrl ? (
            <PlaceholderBox />
          ) : (
            sceneObject && <primitive object={sceneObject} />
          )}

          {hotspots.map((hotspot) => (
            <group key={hotspot.id} position={[hotspot.position.x, hotspot.position.y, hotspot.position.z]}>
              <mesh>
                <sphereGeometry args={[0.2, 16, 16]} />
                <meshBasicMaterial color="#e74c3c" />
              </mesh>
              <Html position={[0, 0.5, 0]} distanceFactor={15}>
                <div className="hotspot-label-display">
                  {hotspot.label}
                </div>
              </Html>
            </group>
          ))}

          <mesh
            visible={false}
            geometry={new THREE.BoxGeometry(20, 20, 20)}
            material={new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 })}
          />
        </group>

        <OrbitControls 
          enableDamping 
          dampingFactor={0.05}
          enablePan 
          enableRotate 
          minDistance={2}
          maxDistance={50}
        />
      </Canvas>
      
      {isAddingHotspot && (
        <div className="hotspot-placement-notification">
          Click on the model to place hotspot
        </div>
      )}
    </div>
  )
}

export default ModelCanvas