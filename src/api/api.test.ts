import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { fetchAllData, fetchData, fetchMedicineById } from "./api";

describe("API Tests", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  test("fetchAllData should return data when request is successful", async () => {
    const mockData = [{ id: 1, name: "Item 1" }];
    mock.onGet("http://localhost:3000/data").reply(200, mockData);

    const data = await fetchAllData();
    expect(data).toEqual(mockData);
  });

  test("fetchAllData should return empty array when request fails", async () => {
    mock.onGet("http://localhost:3000/data").networkError();

    const data = await fetchAllData();
    expect(data).toEqual([]);
  });

  test("fetchData should return data for specific page", async () => {
    const mockData = [{ id: 1, name: "Item 1" }];
    mock.onGet("http://localhost:3000/data?_page=1").reply(200, mockData);

    const data = await fetchData(1);
    expect(data).toEqual(mockData);
  });

  test("fetchData should return empty array when request fails", async () => {
    mock.onGet("http://localhost:3000/data?_page=1").networkError();

    const data = await fetchData(1);
    expect(data).toEqual([]);
  });

  test("fetchMedicineById should return medicine details", async () => {
    const mockData = { id: "123", name: "Aspirin" };
    mock.onGet("http://localhost:3000/data/123").reply(200, mockData);

    const data = await fetchMedicineById("123");
    expect(data).toEqual(mockData);
  });

  test("fetchMedicineById should return null when request fails", async () => {
    mock.onGet("http://localhost:3000/data/123").networkError();

    const data = await fetchMedicineById("123");
    expect(data).toBeNull();
  });
});
