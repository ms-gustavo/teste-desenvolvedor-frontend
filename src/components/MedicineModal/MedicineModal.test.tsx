import { render, fireEvent, screen } from "@testing-library/react";
import MedicineModal from "./MedicineModal";

describe("MedicineModal", () => {
  it("should not render the modal when isOpen is false", () => {
    render(
      <MedicineModal isOpen={false} onClose={() => {}}>
        <div>Test Child</div>
      </MedicineModal>
    );

    expect(screen.queryByText("Test Child")).toBeNull();
  });

  it("should render the modal and children when isOpen is true", () => {
    render(
      <MedicineModal isOpen={true} onClose={() => {}}>
        <div>Test Child</div>
      </MedicineModal>
    );

    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });

  it("should call onClose when the close button is clicked", () => {
    const onClose = jest.fn();
    render(
      <MedicineModal isOpen={true} onClose={onClose}>
        <div>Test Child</div>
      </MedicineModal>
    );

    fireEvent.click(screen.getByText("X"));
    expect(onClose).toHaveBeenCalled();
  });
});
