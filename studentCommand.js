const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Student {
  constructor(name, rollNumber) {
    this.name = name;
    this.rollNumber = rollNumber;
    this.marks = {};
    this.grade = "";
  }

  addSubjectMarks(subject, marks) {
    this.marks[subject] = marks;
  }

  calculateGrade() {
    const totalMarks = Object.values(this.marks).reduce((sum, mark) => sum + mark, 0);
    const percentage = (totalMarks / Object.keys(this.marks).length).toFixed(2);

    if (percentage >= 90) {
      this.grade = "A+";
    } else if (percentage >= 80) {
      this.grade = "A";
    } else if (percentage >= 70) {
      this.grade = "B";
    } else if (percentage >= 60) {
      this.grade = "C";
    } else if (percentage >= 50) {
      this.grade = "D";
    } else {
      this.grade = "F";
    }
  }

  displayReport() {
    console.log("----- Student Report -----");
    console.log("Name:", this.name);
    console.log("Roll Number:", this.rollNumber);
    console.log("Marks:");
    for (const subject in this.marks) {
      console.log(subject + ":", this.marks[subject]);
    }
    console.log("Grade:", this.grade);
    console.log("--------------------------");
  }
}

rl.question('Enter student name: ', (name) => {
  rl.question('Enter roll number: ', (rollNumber) => {
    const student = new Student(name, rollNumber);
    rl.question('Enter subject name: ', (subject) => {
      rl.question('Enter marks: ', (marks) => {
        student.addSubjectMarks(subject, parseInt(marks));
        rl.question('Add more subjects? (yes/no): ', (answer) => {
          if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === "y") {
            // Recursive call to add more subjects
            addMoreSubjects(student);
          } else {
            student.calculateGrade();
            student.displayReport();
            rl.close();
          }
        });
      });
    });
  });
});

function addMoreSubjects(student) {
  rl.question('Enter subject name: ', (subject) => {
    rl.question('Enter marks: ', (marks) => {
      student.addSubjectMarks(subject, parseInt(marks));
      rl.question('Add more subjects? (yes/no): ', (answer) => {
        if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === "y") {
          addMoreSubjects(student);
        } else {
          student.calculateGrade();
          student.displayReport();
          rl.close();
        }
      });
    });
  });
}
