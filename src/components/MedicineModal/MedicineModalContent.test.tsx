import { render, screen } from "@testing-library/react";
import MedicineModalContent from "./MedicineModalContent";

interface ActivePrincipleProps {
  activePrinciple: {
    id: string;
    name: string;
  };
}

interface Document {
  document: {
    id: string;
    expedient: string;
    type: string;
    url: string;
  };
}

jest.mock("../ActivePrincipleItem/ActivePrincipleItem", () => {
  return {
    __esModule: true,
    default: (props: ActivePrincipleProps) => (
      <div data-testid="active-principle">{props.activePrinciple.name}</div>
    ),
  };
});

jest.mock("../DocumentItem/DocumentItem", () => {
  return {
    __esModule: true,
    default: (props: Document) => (
      <div data-testid="document">{props.document.type}</div>
    ),
  };
});

describe("MedicineModalContent", () => {
  const mockTranslate = (docType: string) => `Translated ${docType}`;
  const medicineMock = {
    id: "1",
    published_at: "2024-17-04",
    name: "Medicine A",
    company: "Company A",
    documents: [
      {
        id: "ap1",
        expedient: "Exp123",
        type: "Type1",
        url: "http://example.com",
      },
    ],
    active_principles: [
      { id: "doc1", name: "Active 1" },
      { id: "doc2", name: "Active 2" },
    ],
  };

  it("renders medicine information", () => {
    render(
      <MedicineModalContent
        medicine={medicineMock}
        translateDocType={mockTranslate}
      />
    );

    expect(
      screen.getByText(`Remédio: ${medicineMock.name}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Empresa: ${medicineMock.company}`)
    ).toBeInTheDocument();
  });

  it("renders active principles using ActivePrincipleItem", () => {
    render(
      <MedicineModalContent
        medicine={medicineMock}
        translateDocType={mockTranslate}
      />
    );

    const activePrinciples = screen.getAllByTestId("active-principle");
    expect(activePrinciples.length).toBe(medicineMock.active_principles.length);
    expect(activePrinciples[0]).toHaveTextContent(
      medicineMock.active_principles[0].name
    );
    expect(activePrinciples[1]).toHaveTextContent(
      medicineMock.active_principles[1].name
    );
  });

  it("renders documents using DocumentItem and translates document types", () => {
    render(
      <MedicineModalContent
        medicine={medicineMock}
        translateDocType={mockTranslate}
      />
    );

    const documents = screen.getAllByTestId("document");
    expect(documents.length).toBe(medicineMock.documents.length);
    expect(documents[0]).toHaveTextContent(medicineMock.documents[0].type);
  });
});
