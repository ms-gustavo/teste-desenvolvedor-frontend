import { render, fireEvent, screen } from "@testing-library/react";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
  const value = "test";
  const onChange = jest.fn();
  const onTypeChange = jest.fn();

  beforeEach(() => {
    render(
      <SearchBar
        value={value}
        onChange={onChange}
        onTypeChange={onTypeChange}
        searchType="name"
      />
    );
  });

  it("should display the correct placeholder based on searchType", () => {
    expect(
      screen.getByPlaceholderText("Procurar por remédio")
    ).toBeInTheDocument();

    rerenderWithNewProps("company");
    expect(
      screen.getByPlaceholderText("Procurar por empresa")
    ).toBeInTheDocument();
  });

  it("should handle value changes", () => {
    const input = screen.getByPlaceholderText("Procurar por remédio");
    fireEvent.change(input, { target: { value: "new search" } });
    expect(onChange).toHaveBeenCalledWith("new search");
  });

  it("should handle search type changes", () => {
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "company" } });
    expect(onTypeChange).toHaveBeenCalledWith("company");
  });

  function rerenderWithNewProps(searchType: string) {
    render(
      <SearchBar
        value={value}
        onChange={onChange}
        onTypeChange={onTypeChange}
        searchType={searchType}
      />
    );
  }
});
