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

const HotspotManager: React.FC<HotspotManagerProps> = ({ hotspots, onAdd, onRemove }) => {
  const [label, setLabel] = useState('');

  const handleAdd = () => {
    if (label.trim()) {
      onAdd(label);
      setLabel('');
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
          placeholder="Enter label"
        />
        <Button onClick={handleAdd}>Add Hotspot</Button>
      </div>
      <div className="hotspot-list">
        {hotspots.map((hotspot) => (
          <div key={hotspot.id} className="hotspot-item">
            <div>•</div>
            <div className="hotspot-label">{hotspot.label}</div>
            <div className="hotspot-remove" onClick={() => onRemove(hotspot.id)}>( )</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotspotManager;