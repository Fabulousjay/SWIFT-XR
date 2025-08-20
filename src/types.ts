import * as THREE from 'three'

export interface Hotspot {
  id: string
  position: THREE.Vector3
  label: string
}

export interface ModelEditorState {
  modelUrl?: string
  fileName: string
  hotspots: Hotspot[]
}