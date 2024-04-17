import { render, screen } from "@testing-library/react";
import DocumentItem from "./DocumentItem";

describe("DocumentItem", () => {
  it("renders the document item with translated document type", () => {
    const document = {
      id: "doc1",
      expedient: "2021",
      type: "patient",
      url: "http://example.com/report.pdf",
    };

    const translateDocType = jest.fn().mockReturnValue("Paciente");

    render(
      <DocumentItem document={document} translateDocType={translateDocType} />
    );

    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveAttribute("href", document.url);
    expect(linkElement).toHaveTextContent("Paciente");
    expect(translateDocType).toHaveBeenCalledWith(document.type);
    expect(screen.getByText("Paciente")).toBeInTheDocument();
  });

  it("applies the correct class for styling", () => {
    const document = {
      id: "doc2",
      expedient: "2022",
      type: "Professional",
      url: "http://example.com/form.pdf",
    };

    const translateDocType = jest.fn().mockReturnValue("Profissional");

    render(
      <DocumentItem document={document} translateDocType={translateDocType} />
    );

    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveClass("text-red-600 hover:text-red-800");
  });
});
