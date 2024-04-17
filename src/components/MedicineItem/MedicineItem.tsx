import React from "react";
import { Medicine } from "../MedicineList/MedicineList";

interface MedicineItemProps {
  medicine: Medicine;
  onClick: (id: string) => void;
}

const MedicineItem: React.FC<MedicineItemProps> = ({ medicine, onClick }) => {
  return (
    <li
      className="text-center bg-slate-200 p-5 border border-slate-950 cursor-pointer hover:bg-slate-300 transition ease-in-out"
      onClick={() => onClick(medicine.id)}
    >
      <span className="font-bold">{medicine.name}</span> -{" "}
      <span className="italic">{medicine.company}</span>
    </li>
  );
};

export default MedicineItem;
