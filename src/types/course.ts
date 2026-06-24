export interface Course {
  id: number;
  title: string;
  detail: string;
  picture: string;
}

export interface CourseApiResponse {
  data: Course[];
}
