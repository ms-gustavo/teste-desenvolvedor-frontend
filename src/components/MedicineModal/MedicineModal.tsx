import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const MedicineModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg max-w-lg w-[90%]">
        <button
          id="CloseModalButton"
          onClick={onClose}
          className="float-right font-bold"
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default MedicineModal;
