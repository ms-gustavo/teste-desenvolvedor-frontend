import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "./Pagination";

describe("Pagination", () => {
  const setPage = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the correct number of page buttons", () => {
    const pages = 5;
    render(<Pagination pages={pages} setPage={setPage} currentPage={1} />);

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(pages);
  });

  it("disables the button for the current page", () => {
    const currentPage = 3;
    const pages = 5;
    render(
      <Pagination pages={pages} setPage={setPage} currentPage={currentPage} />
    );

    expect(screen.getByText(currentPage).closest("button")).toBeDisabled();
  });

  it("enables buttons for other pages", () => {
    const currentPage = 3;
    const pages = 5;
    render(
      <Pagination pages={pages} setPage={setPage} currentPage={currentPage} />
    );

    const buttons = screen.getAllByRole("button");
    buttons.forEach((button) => {
      if (button.textContent !== currentPage.toString()) {
        expect(button).not.toBeDisabled();
      }
    });
  });

  it("calls setPage when a different page button is clicked", () => {
    const currentPage = 2;
    const pages = 5;
    render(
      <Pagination pages={pages} setPage={setPage} currentPage={currentPage} />
    );

    const newPage = 4;
    const newPageButton = screen.getByText(newPage);
    fireEvent.click(newPageButton);

    expect(setPage).toHaveBeenCalledWith(newPage);
  });
});
