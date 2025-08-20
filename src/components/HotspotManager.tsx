import React, { useState } from 'react';
import { Hotspot } from '../types';
import '../styles.css';
import { Button } from './UI/Buttton';

interface HotspotManagerProps {
  hotspots: Hotspot[];
  onAdd: (label: string) => void;
  onRemove: (id: string) => void;
  isAddingHotspot: boolean;
  onCancelAdd: () => void;
}

const HotspotManager: React.FC<HotspotManagerProps> = ({ 
  hotspots, 
  onAdd, 
  onRemove, 
  isAddingHotspot, 
  onCancelAdd 
}) => {
  const [label, setLabel] = useState('');

  const handleAdd = () => {
    if (label.trim()) {
      onAdd(label);
      setLabel('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <div className="hotspot-manager">
      <h3 className="panel-title">Hotspots</h3>
      <div className="hotspot-input-group">
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter label"
          disabled={isAddingHotspot}
        />
        <Button 
          onClick={isAddingHotspot ? onCancelAdd : handleAdd}
          color={isAddingHotspot ? "red" : "blue"}
        >
          {isAddingHotspot ? 'Cancel' : 'Add Hotspot'}
        </Button>
      </div>
      <div className="hotspot-list">
        {hotspots.map((hotspot) => (
          <div key={hotspot.id} className="hotspot-item">
            <div>•</div>
            <div className="hotspot-label">{hotspot.label}</div>
            <div className="hotspot-remove" onClick={() => onRemove(hotspot.id)}>×</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotspotManager;