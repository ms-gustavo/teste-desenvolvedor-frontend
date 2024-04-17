import { Medicine } from "../components/MedicineList/MedicineList";

export function sortDataByPublishedDate(data: Medicine[]) {
  return [...data].sort(
    (a, b) =>
      new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  );
}
