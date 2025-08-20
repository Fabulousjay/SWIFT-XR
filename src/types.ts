import * as THREE from 'three';

export interface Hotspot {
  id: string;
  label: string;
  position: THREE.Vector3;
  screenPosition?: { x: number; y: number };
}

export interface ModelEditorState {
  modelUrl?: string;
  fileName: string;
  hotspots: Hotspot[];
}