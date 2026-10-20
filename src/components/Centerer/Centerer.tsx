import React from 'react';

interface Props {
  children: React.ReactNode;
}

const Centerer: React.FC<Props> = ({ children }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/75 backdrop-blur-sm p-4 overflow-y-auto">
      {children}
    </div>
  );
};

export default Centerer;
