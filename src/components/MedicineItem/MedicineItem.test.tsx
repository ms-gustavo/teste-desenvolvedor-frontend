import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import MedicineItem from "./MedicineItem";

describe("MedicineItem", () => {
  const mockMedicine = {
    id: "1",
    name: "Amoxicilina",
    published_at: "2024-17-04",
    company: "Abc",
    documents: [
      {
        id: "doc1",
        expedient: "Exp123",
        type: "Type1",
        url: "http://example.com",
      },
    ],
    active_principles: [
      {
        id: "ap1",
        name: "Principle1",
      },
    ],
  };
  it("renders the medicine information", () => {
    render(<MedicineItem medicine={mockMedicine} onClick={() => {}} />);

    const nameElement = screen.getByText("Amoxicilina");
    const companyElement = screen.getByText("Abc");

    expect(nameElement).toBeInTheDocument();
    expect(nameElement).toHaveClass("font-bold");
    expect(companyElement).toBeInTheDocument();
    expect(companyElement).toHaveClass("italic");
  });

  it("calls onClick when the item is clicked", () => {
    const handleClick = jest.fn();
    render(<MedicineItem medicine={mockMedicine} onClick={handleClick} />);

    const listItem = screen.getByRole("listitem");
    fireEvent.click(listItem);

    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledWith("1");
  });
});
