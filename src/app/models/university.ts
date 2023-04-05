export interface University {
  name: string,
  code: string,
  id: string
}

export function findCodeById(id: string, universities: University[]): string {
    const university = universities.find(university => university.id === id);
    return university.code;
}
