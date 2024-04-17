import { render, screen, fireEvent } from "@testing-library/react";
import NavBar from "./Navbar";

describe("NavBar", () => {
  it("renders correctly", () => {
    const setSearchTerm = jest.fn();
    const setSearchType = jest.fn();

    render(
      <NavBar
        searchTerm=""
        setSearchTerm={setSearchTerm}
        searchType="name"
        setSearchType={setSearchType}
      />
    );

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("calls setSearchTerm when input changes", () => {
    const setSearchTerm = jest.fn();
    const setSearchType = jest.fn();
    render(
      <NavBar
        searchTerm=""
        setSearchTerm={setSearchTerm}
        searchType="name"
        setSearchType={setSearchType}
      />
    );

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });
    expect(setSearchTerm).toHaveBeenCalledWith("test");
  });

  it("calls setSearchType when search type changes", () => {
    const setSearchTerm = jest.fn();
    const setSearchType = jest.fn();
    render(
      <NavBar
        searchTerm=""
        setSearchTerm={setSearchTerm}
        searchType="name"
        setSearchType={setSearchType}
      />
    );

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "company" } });
    expect(setSearchType).toHaveBeenCalledWith("company");
  });
});
