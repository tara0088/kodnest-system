import React, { useState } from 'react';
import './index.css';

function App() {
  const [proofStates, setProofStates] = useState({
    uiBuilt: '',
    logicWorking: '',
    testPassed: '',
    deployed: ''
  });

  const handleProofChange = (field, value) => {
    setProofStates(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="kn-layout">
      {/* TOP BAR */}
      <header className="kn-top-bar">
        <div className="kn-project-name">KodNest Build System</div>
        <div className="kn-progress">Step 3 / 5</div>
        <div className="kn-badge kn-badge-in-progress">In Progress</div>
      </header>

      {/* CONTEXT HEADER */}
      <section className="kn-context-header">
        <h1>Configure Database Connection</h1>
        <p>Set up your database credentials and connection parameters</p>
      </section>

      {/* MAIN CONTENT */}
      <main className="kn-main-content">
        {/* PRIMARY WORKSPACE (70%) */}
        <div className="kn-primary-workspace">
          <div className="kn-card">
            <div className="kn-card-header">
              <h3 className="kn-card-title">Database Configuration</h3>
            </div>
            
            <div className="kn-form-group kn-mb-3">
              <label className="kn-input-label">Database Type</label>
              <select className="kn-input">
                <option>PostgreSQL</option>
                <option>MySQL</option>
                <option>MongoDB</option>
                <option>Redis</option>
              </select>
            </div>
            
            <div className="kn-form-group kn-mb-3">
              <label className="kn-input-label">Host</label>
              <input type="text" className="kn-input" placeholder="localhost" />
            </div>
            
            <div className="kn-form-group kn-mb-3">
              <label className="kn-input-label">Port</label>
              <input type="number" className="kn-input" placeholder="5432" />
            </div>
            
            <div className="kn-form-group kn-mb-3">
              <label className="kn-input-label">Database Name</label>
              <input type="text" className="kn-input" placeholder="myapp_production" />
            </div>
            
            <div className="kn-form-group kn-mb-4">
              <label className="kn-input-label">Connection Pool Size</label>
              <input type="range" className="kn-input" min="1" max="100" defaultValue="20" />
              <div className="kn-text-right kn-mt-1">20 connections</div>
            </div>
            
            <div className="kn-flex kn-gap-2">
              <button className="kn-button kn-button-secondary">Previous</button>
              <button className="kn-button kn-button-primary">Test Connection</button>
            </div>
          </div>
        </div>

        {/* SECONDARY PANEL (30%) */}
        <aside className="kn-secondary-panel">
          <div className="kn-card kn-mb-4">
            <h4 className="kn-card-title kn-mb-2">Step Explanation</h4>
            <p>Configure your database connection settings. These credentials will be used to establish secure connections to your database cluster.</p>
          </div>
          
          <div className="kn-card kn-mb-4">
            <h4 className="kn-card-title kn-mb-2">Quick Prompt</h4>
            <textarea 
              className="kn-input kn-textarea kn-mb-2" 
              readOnly
              value="Configure PostgreSQL database connection with host: localhost, port: 5432, database: myapp_production"
            />
            <button className="kn-button kn-button-secondary kn-button-sm kn-mb-1">Copy</button>
            <button className="kn-button kn-button-secondary kn-button-sm">Build in Lovable</button>
          </div>
          
          <div className="kn-card">
            <h4 className="kn-card-title kn-mb-2">Feedback</h4>
            <button className="kn-button kn-button-secondary kn-button-sm kn-mb-1">It Worked</button>
            <button className="kn-button kn-button-secondary kn-button-sm kn-mb-1">Error</button>
            <button className="kn-button kn-button-secondary kn-button-sm">Add Screenshot</button>
          </div>
        </aside>
      </main>

      {/* PROOF FOOTER */}
      <footer className="kn-proof-footer">
        <div className="kn-proof-checklist">
          <div className="kn-proof-item">
            <input 
              type="checkbox" 
              className="kn-proof-checkbox" 
              id="proof-ui"
            />
            <label htmlFor="proof-ui" className="kn-proof-label">
              UI Built
              <input 
                type="text" 
                className="kn-input kn-proof-input kn-mt-1" 
                placeholder="Describe the UI component..."
                value={proofStates.uiBuilt}
                onChange={(e) => handleProofChange('uiBuilt', e.target.value)}
              />
            </label>
          </div>
          <div className="kn-proof-item">
            <input 
              type="checkbox" 
              className="kn-proof-checkbox" 
              id="proof-logic"
            />
            <label htmlFor="proof-logic" className="kn-proof-label">
              Logic Working
              <input 
                type="text" 
                className="kn-input kn-proof-input kn-mt-1" 
                placeholder="Describe the working logic..."
                value={proofStates.logicWorking}
                onChange={(e) => handleProofChange('logicWorking', e.target.value)}
              />
            </label>
          </div>
          <div className="kn-proof-item">
            <input 
              type="checkbox" 
              className="kn-proof-checkbox" 
              id="proof-test"
            />
            <label htmlFor="proof-test" className="kn-proof-label">
              Test Passed
              <input 
                type="text" 
                className="kn-input kn-proof-input kn-mt-1" 
                placeholder="Describe the test results..."
                value={proofStates.testPassed}
                onChange={(e) => handleProofChange('testPassed', e.target.value)}
              />
            </label>
          </div>
          <div className="kn-proof-item">
            <input 
              type="checkbox" 
              className="kn-proof-checkbox" 
              id="proof-deploy"
            />
            <label htmlFor="proof-deploy" className="kn-proof-label">
              Deployed
              <input 
                type="text" 
                className="kn-input kn-proof-input kn-mt-1" 
                placeholder="Describe the deployment..."
                value={proofStates.deployed}
                onChange={(e) => handleProofChange('deployed', e.target.value)}
              />
            </label>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;