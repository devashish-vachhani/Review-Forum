import { of } from "rxjs";
import { University } from "src/app/models/university";
import { UniversityService } from "src/app/services/university.service";

const universities: University[] = [
    { id: '1', name: 'uni1', code: 'u1', courses: ['c1', 'c2'] },
    { id: '2', name: 'uni2', code: 'u2', courses: ['c3','c4'] }
]

export const UniversityServiceStub = jasmine.createSpyObj<UniversityService>(
    'UniversityService',
    {
        getUniversities: of(universities),
    }
  );