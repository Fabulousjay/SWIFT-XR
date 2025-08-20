import React, { useState, useEffect } from 'react';
import * as THREE from 'three';
import ModelCanvas from './ModelCanvas';
import HotspotManager from './HotspotManager';
import { ModelEditorState, Hotspot } from '../types';
import '../styles.css';
import { Button, FileUploadButton } from './UI/Buttton';

const Editor: React.FC = () => {
  const [state, setState] = useState<ModelEditorState>({ fileName: '', hotspots: [] });
  const [isAddingHotspot, setIsAddingHotspot] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('modelEditorState');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.modelUrl && parsed.fileName)
         {
        setState(parsed);
      }
    }
  }, []);

  useEffect(() => {
    if (state.modelUrl && state.fileName) {
      localStorage.setItem('modelEditorState', JSON.stringify(state));
    } else {
      localStorage.removeItem('modelEditorState');
    }
  }, [state]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (state.modelUrl) {
      URL.revokeObjectURL(state.modelUrl);
    }

    const url = URL.createObjectURL(file);
    setState({
      modelUrl: url,
      fileName: file.name,
      hotspots: []
    });
  };

  const addHotspot = (label: string) => {
    if (!state.modelUrl) return;
    
    const newHotspot: Hotspot = {
      id: Date.now().toString(),
      label,
      position: new THREE.Vector3(0, 0, 0)
    };
    
    setState(prev => ({
      ...prev,
      hotspots: [...prev.hotspots, newHotspot]
    }));
    
    setIsAddingHotspot(true);
  };

  const handleHotspotPositionChange = (id: string, position: THREE.Vector3) => {
    setState(prev => ({
      ...prev,
      hotspots: prev.hotspots.map(hotspot => 
        hotspot.id === id ? { ...hotspot, position } : hotspot
      )
    }));
    setIsAddingHotspot(false);
  };

  const removeHotspot = (id: string) => {
    setState(prev => ({
      ...prev,
      hotspots: prev.hotspots.filter(h => h.id !== id)
    }));
  };

  const clearModel = () => {
    if (state.modelUrl) {
      URL.revokeObjectURL(state.modelUrl);
    }
    setState({ fileName: '', hotspots: [] });
    setIsAddingHotspot(false);
    
    const fileInput = document.getElementById('model-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  return (
    <div className="model-editor">
      <div className="viewer-panel">
        <ModelCanvas 
          modelUrl={state.modelUrl} 
          hotspots={state.hotspots}
          onHotspotPositionChange={handleHotspotPositionChange}
        />
      </div>
      <div className="controls-panel">
        <h2 className="panel-title">3D Editor</h2>
        <HotspotManager 
          hotspots={state.hotspots} 
          onAdd={addHotspot} 
          onRemove={removeHotspot} 
          isAddingHotspot={isAddingHotspot}
          onCancelAdd={() => setIsAddingHotspot(false)}
        />
        <div className="import-section">
          <h3 className="panel-title">Import Model</h3>
          <div className="file-input-wrapper">
            <div className="import-actions">
              <FileUploadButton 
                onChange={handleFileChange}
                accept=".glb"
                id="model-upload"
              >
                Choose GLB File
              </FileUploadButton>
              {state.modelUrl && (
                <Button color="red" onClick={clearModel}>
                  Clear Model
                </Button>
              )}
            </div>
            {state.fileName && (
              <div className="model-info">{state.fileName}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;