import React from 'react';

function NavButton({ children, elem, isOverlayOpen, toggleOverlay }) {
  const renderOverlay = () => (
    <div className="NavButton-Overlay">
      <div className="NavButton-Overlay-Header">
        <h1>Hello from {elem} overlay</h1>
      </div>
    </div>
  );

  return (
    <>
      <button
        className={`NavButton-${elem}`}
        onClick={() => toggleOverlay(elem)}
      >
        {children}
      </button>
      {isOverlayOpen && renderOverlay()}
    </>
  );
}

export default NavButton;
