import React, { useState, useEffect } from 'react';
import StudentForm from './components/StudentForm';
import StudentTable from './components/StudentTable';
import Search from './components/Search';
import './styles.css';
import studentData from './data.json';

const App = () => {
  const [students, setStudents] = useState(studentData);
  const [filteredStudents, setFilteredStudents] = useState(studentData);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const addStudent = (student) => {
    setStudents((prev) => [...prev, student]);
    setFilteredStudents((prev) => [...prev, student]);
  };

  const updateStudent = (updatedStudent) => {
    const updatedList = students.map((student) =>
      student.id === updatedStudent.id ? updatedStudent : student
    );
    setStudents(updatedList);
    setFilteredStudents(updatedList);
    setSelectedStudent(null);
  };

  const deleteStudent = (id) => {
    const updatedList = students.filter((student) => student.id !== id);
    setStudents(updatedList);
    setFilteredStudents(updatedList);
  };

  const searchStudents = (query) => {
    const lowerQuery = query.toLowerCase();
    const result = students.filter((student) =>
      student.name.toLowerCase().includes(lowerQuery) ||
      student.email.toLowerCase().includes(lowerQuery) ||
      student.course.toLowerCase().includes(lowerQuery)
    );
    setFilteredStudents(result);
  };

  return (
    <div className="App">
      <h1>Student Management Portal</h1>
      <Search onSearch={searchStudents} />
      <StudentForm
        selectedStudent={selectedStudent}
        onAdd={addStudent}
        onUpdate={updateStudent}
        onCancel={() => setSelectedStudent(null)}
      />
      <StudentTable
        students={filteredStudents}
        onDelete={deleteStudent}
        onEdit={(student) => setSelectedStudent(student)}
      />
    </div>
  );
};

export default App;
