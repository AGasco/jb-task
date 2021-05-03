import React, { useRef, useEffect } from 'react';

function HandleClickOutside({ children }) {
  const node = useRef();

  const handleClick = (e) => {
    if (node.current.contains(e.target)) return;
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return <div ref={node}>{children}</div>;
}

export default HandleClickOutside;
