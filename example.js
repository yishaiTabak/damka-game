const Student = function(name, id, age) {
    this.name = name
    this.id = id
    this.age = age
}
const students = [new Student('yishai', '1234', 20), new Student('noa', '123456', 50), new Student('shlomo', '123', 28)]
const newStudents = []
for(let student of students) {
    if(student.age < 35)
        newStudents.push(student)
}
for(let s of newStudents) {
    console.log(s) }






































// git add .add
// git commit -m bgbg
// git push 
