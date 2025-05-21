import React, { useEffect, useState } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setVisible(true);
    const handleMouseLeave = () => setVisible(false);
    const handleMouseDown = () => setClicking(true);
    const handleMouseUp = () => setClicking(false);

    window.addEventListener('mousemove', updateCursorPosition);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    document.documentElement.classList.add('cursor-visible');

    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      
      document.documentElement.classList.remove('cursor-visible');
    };
  }, []);

  return (
    <div
      className={`cursor-dot ${visible ? 'cursor-visible' : ''}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px) scale(${clicking ? 0.5 : 1})`,
        backgroundColor: '#3b82f6',
        boxShadow: '0 0 20px 5px rgba(59, 130, 246, 0.3)',
        opacity: visible ? 1 : 0,
        transition: 'transform 0.15s ease-out, opacity 0.3s ease'
      }}
    ></div>
  );
};

export default CustomCursor;