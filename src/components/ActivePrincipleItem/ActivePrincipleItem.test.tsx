import { render, screen } from "@testing-library/react";
import ActivePrincipleItem from "./ActivePrincipleItem";
import "@testing-library/jest-dom";

describe("ActivePrincipleItem Component", () => {
  test("renders the active principle name", () => {
    const activePrinciple = { id: "1", name: "Amoxicilina" };

    render(<ActivePrincipleItem activePrinciple={activePrinciple} />);

    const nameElement = screen.getByText("Amoxicilina");
    expect(nameElement).toBeInTheDocument();
    expect(nameElement).toHaveClass("font-bold");
  });
});
