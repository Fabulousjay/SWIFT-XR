import React from 'react';
import Editor from './components/Editor';
import './styles.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <Editor />
    </div>
  );
};

export default App;