var grades = [
  {num: 3, subject: 'math'},
  {num: 4, subject: 'math'},
  {num: 5, subject: 'arts'},
  {num: 2, subject: 'sport'},
  {num: 5, subject: 'physics'},
  {num: 4, subject: 'physics'},
];


function countFives(gradesList) {
  output = 0;
  gradesList.forEach(function(grade) {
    if (grade.num === 5) {
      output++
    }
  });
  return output;
}

console.log(countFives(grades));
