// DocumentItem.tsx
import React from "react";
import { FaFilePdf } from "react-icons/fa";

interface Document {
  id: string;
  expedient: string;
  type: string;
  url: string;
}

interface DocumentItemProps {
  document: Document;
  translateDocType: (docType: string) => string;
}

const DocumentItem: React.FC<DocumentItemProps> = ({
  document,
  translateDocType,
}) => {
  return (
    <li id="MedicineModalContentDigitalLeafletItems" className="mb-2">
      <a
        href={document.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center space-x-2 text-red-600 hover:text-red-800"
      >
        <FaFilePdf size={15} />
        <span>{translateDocType(document.type)}</span>
      </a>
    </li>
  );
};

export default DocumentItem;
