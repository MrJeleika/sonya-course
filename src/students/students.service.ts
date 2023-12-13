// import { Injectable } from '@nestjs/common';
// import { StudentEntity } from 'src/database';
// import { DataSource, MoreThan } from 'typeorm';
// import { CreateStudentDto } from './dtos/create-student.dto';

// @Injectable()
// export class StudentsService {
//   constructor(private readonly dataSource: DataSource) {}

//   public async getAllStudents() {
//     return await this.dataSource.manager.find(StudentEntity);
//   }

//   public async enrolledStudents(amount: number) {
//     return await this.dataSource.manager.find(StudentEntity, {
//       take: amount,
//       order: {
//         avgRating: 'DESC',
//       },
//     });
//   }

//   public async interviewStudents(minAvg: number) {
//     return await this.dataSource.manager.find(StudentEntity, {
//       where: {
//         avgRating: MoreThan(minAvg),
//         contract: false,
//       },
//       order: {
//         avgRating: 'DESC',
//       },
//     });
//   }

//   public async createStudent(dto: CreateStudentDto) {
//     const avgRating = +(
//       (dto.mathRating + dto.historyRating + dto.ukrainianRating) /
//       3
//     ).toFixed(2);

//     return await this.dataSource.manager.transaction((manager) => {
//       const studentsRepo = manager.getRepository(StudentEntity);
//       return studentsRepo.save(studentsRepo.create({ ...dto, avgRating }));
//     });
//   }
// }
