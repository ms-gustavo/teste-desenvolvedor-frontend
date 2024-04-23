import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MedicineList from "./MedicineList";
import * as api from "../../api/api";
import { sortDataByPublishedDate } from "../../utils/useSortedData";

jest.mock("../../api/api", () => ({
  fetchData: jest.fn(),
  fetchAllData: jest.fn(),
  fetchMedicineById: jest.fn(),
}));

(api.fetchData as jest.Mock).mockResolvedValue({
  data: [
    {
      id: "1",
      name: "Medicine A",
      published_at: "2021-07-22",
      company: "Company A",
      documents: [],
      active_principles: [],
    },
    {
      id: "2",
      name: "Medicine B",
      published_at: "2021-07-20",
      company: "Company B",
      documents: [],
      active_principles: [],
    },
  ],
  pages: 2,
});

(api.fetchAllData as jest.Mock).mockResolvedValue({
  data: [],
});

(api.fetchMedicineById as jest.Mock).mockResolvedValue({
  id: "1",
  name: "Medicine A",
  published_at: "2021-07-22",
  company: "Company A",
  documents: [],
  active_principles: [],
});

const mockData = {
  data: [
    {
      id: "1",
      name: "Medicine A",
      published_at: "2021-07-22",
      company: "Company A",
      documents: [],
      active_principles: [],
    },
    {
      id: "2",
      name: "Medicine B",
      published_at: "2021-07-20",
      company: "Company B",
      documents: [],
      active_principles: [],
    },
  ],
  pages: 2,
};

const sortedMockData = sortDataByPublishedDate(mockData.data);

beforeEach(() => {
  jest.clearAllMocks();
  (api.fetchData as jest.Mock).mockResolvedValue(mockData);
  (api.fetchAllData as jest.Mock).mockResolvedValue(sortedMockData);
  (api.fetchMedicineById as jest.Mock).mockResolvedValue(sortedMockData[0]);
});

describe("MedicineList Component", () => {
  test("should fetch and render medicines on mount", async () => {
    render(<MedicineList searchTerm="" searchType="name" />);
    await waitFor(() => expect(api.fetchData).toHaveBeenCalled());
    expect(screen.getByText("Medicine A")).toBeInTheDocument();
    expect(screen.getByText("Medicine B")).toBeInTheDocument();
  });

  test("should handle API fetch error", async () => {
    (api.fetchData as jest.Mock).mockRejectedValue(new Error("API Error"));
    render(<MedicineList searchTerm="" searchType="name" />);
    await waitFor(() =>
      expect(screen.getByText("Carregando...")).toBeInTheDocument()
    );
    expect(screen.queryByText("Medicine A")).toBeNull();
  });

  test("should filter medicines based on searchTerm and searchType", async () => {
    render(<MedicineList searchTerm="Company A" searchType="company" />);
    await waitFor(
      () => {
        expect(api.fetchAllData).toHaveBeenCalled();
        expect(screen.getByText("Company A")).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  test("should display modal when a medicine item is clicked", async () => {
    render(<MedicineList searchTerm="" searchType="name" />);
    await waitFor(() => fireEvent.click(screen.getByText("Medicine A")));
    expect(api.fetchMedicineById).toHaveBeenCalledWith("1");
    expect(screen.getByText("Medicine A")).toBeInTheDocument();
  });

  test("should paginate correctly", async () => {
    render(<MedicineList searchTerm="" searchType="name" />);
    await waitFor(() => fireEvent.click(screen.getByText("2")));
    expect(api.fetchData).toHaveBeenCalledWith(2);
  });

  test("should close the modal when close button is clicked", async () => {
    render(<MedicineList searchTerm="" searchType="name" />);
    await waitFor(() => fireEvent.click(screen.getByText("Medicine A")));
    fireEvent.click(screen.getByText("X"));
    expect(screen.queryByText("Paciente")).not.toBeInTheDocument();
  });
});
