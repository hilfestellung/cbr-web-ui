import React from 'react';

import SimplePage from './layout/SimplePage';

function InformationWhatsNext({ icon, children }) {
  return (
    <SimplePage>
      <div className="d-flex">
        <div
          className="d-flex align-items-start"
          style={{ fontSize: '500px', marginTop: '-31px', color: '#bbb' }}
        >
          {icon}
        </div>
        <div className="d-flex flex-column ml-5 justify-content-center">
          {children}
        </div>
      </div>
    </SimplePage>
  );
}

export default InformationWhatsNext;
