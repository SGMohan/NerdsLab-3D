import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [preselectedCourse, setPreselectedCourse] = useState('');

  const openDemoModal = (courseName = '') => {
    setPreselectedCourse(courseName);
    setIsDemoModalOpen(true);
  };

  const closeDemoModal = () => {
    setIsDemoModalOpen(false);
    setPreselectedCourse('');
  };

  return (
    <ModalContext.Provider value={{ isDemoModalOpen, preselectedCourse, openDemoModal, closeDemoModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
