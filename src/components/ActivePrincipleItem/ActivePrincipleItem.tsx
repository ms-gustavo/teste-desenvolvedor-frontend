import React from "react";

interface ActivePrincipleProps {
  id: string;
  name: string;
}

interface ActivePrincipleItemProps {
  activePrinciple: ActivePrincipleProps;
}

const ActivePrincipleItem: React.FC<ActivePrincipleItemProps> = ({
  activePrinciple,
}) => {
  return (
    <li id="MedicineModalContentPrincipleActiveItems" className="font-bold">
      {activePrinciple.name}
    </li>
  );
};

export default ActivePrincipleItem;
