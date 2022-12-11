const { User, Gene, HomologousPair, Sequence } = require('../models')

// const GetStudents = async (req, res) => {
//   try {
//     const students = await Students.findAll()
//     res.send(students)
//   } catch (error) {
//     return res.status(500).send(error.message)
//   }
// }

// const GetStudent = async (req, res) => {
//   try {
//     let student = await Students.findOne({
//       where: {
//         id: req.params.student_id
//       },
//       include: [Courses]
//     })
//     let gpaPoints = 0
//     let totalCreditHours = 0

//     //map through courses
//     student.Courses.map((course) => {
//       let courseGpaPoints
//       totalCreditHours += course.creditHours

//       switch (course.StudentsCourses.letter) {
//         case 'A':
//           courseGpaPoints = 4 * course.creditHours
//           gpaPoints += courseGpaPoints
//           break
//         case 'B':
//           courseGpaPoints = 3 * course.creditHours
//           gpaPoints += courseGpaPoints
//           break
//         case 'C':
//           courseGpaPoints = 2 * course.creditHours
//           gpaPoints += courseGpaPoints
//           break
//         case 'D':
//           courseGpaPoints = 1 * course.creditHours
//           gpaPoints += courseGpaPoints
//           break
//         case 'F':
//           courseGpaPoints = 0 * course.creditHours // this line is unnecessary for the calculation because it is multiplying by 0
//           gpaPoints += courseGpaPoints
//           break
//         default:
//           return console.log('not a valid grade letter (A-F)')
//       }
//     })
//     let gpa = gpaPoints / totalCreditHours

//     let studentId = parseInt(req.params.student_id)
//     const studentUpdate = await Students.update(
//       { gpa },
//       {
//         where: { id: studentId },
//         returning: true,
//         include: [Courses]
//       }
//     )
//     let updatedStudent = await Students.findOne({
//       where: {
//         id: req.params.student_id
//       },
//       include: [Courses]
//     })

//     res.json(updatedStudent)
//   } catch (error) {
//     throw error
//   }
// }

// const CreateStudent = async (req, res) => {
//   try {
//     const student = await Students.create({ ...req.body })
//     res.send(student)
//   } catch (error) {
//     return res.status(500).send(error.message)
//   }
// }

// const UpdateStudent = async (gpa, studentId) => {
//   try {
//     const student = await Students.update(
//       { gpa },
//       { where: studentId, returning: true }
//     )
//     return student
//   } catch (error) {
//     return studentId.status(500).send(error.message)
//   }
// }

// const DeleteStudent = async (req, res) => {
//   try {
//     await Students.destroy({ where: { id: req.params.student_id } })
//     res.send({
//       msg: 'Student Deleted',
//       payload: req.params.student_id,
//       status: 'Ok'
//     })
//   } catch (error) {
//     return res.status(500).send(error.message)
//   }
// }

module.exports = {
  // GetStudents,
  // GetStudent,
  // CreateStudent,
  // UpdateStudent,
  // DeleteStudent
}
