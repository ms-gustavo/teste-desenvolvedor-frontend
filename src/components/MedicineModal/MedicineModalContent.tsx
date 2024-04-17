import React from "react";
import { Medicine } from "../MedicineList/MedicineList";
import ActivePrincipleItem from "../ActivePrincipleItem/ActivePrincipleItem";
import DocumentItem from "../DocumentItem/DocumentItem";

interface MedicineModalContentProps {
  medicine: Medicine;
  translateDocType: (docType: string) => string;
}

const MedicineModalContent: React.FC<MedicineModalContentProps> = ({
  medicine,
  translateDocType,
}) => {
  console.log("medicine", medicine);
  return (
    <div className="text-center md:text-lg p-2 m-3">
      <h1 className="font-bold border-b-2">Remédio: {medicine.name}</h1>
      <p className="border-b-2">
        Empresa:
        <span className="italic"> {medicine.company}</span>
      </p>
      <h4>Ativo principal:</h4>
      <ul className="border-b-2">
        {medicine.active_principles.map((ap) => (
          <ActivePrincipleItem key={ap.id} activePrinciple={ap} />
        ))}
      </ul>
      <h4>Bula digital:</h4>
      <ul className="list-none p-0 border-b-2">
        {medicine.documents.map((doc) => (
          <DocumentItem
            key={doc.id}
            document={doc}
            translateDocType={translateDocType}
          />
        ))}
      </ul>
    </div>
  );
};

export default MedicineModalContent;
