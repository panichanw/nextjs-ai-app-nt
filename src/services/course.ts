import type { Course } from "@/types/course";

const COURSE_API_URL = "https://api.codingthailand.com/api/course";

export async function getCourses(): Promise<Course[]> {
  const response = await fetch(COURSE_API_URL);

  if (!response.ok) {
    throw new Error(`Failed to fetch courses: ${response.status}`);
  }

  const json: { data: Course[] } = await response.json();
  return json.data;
}
