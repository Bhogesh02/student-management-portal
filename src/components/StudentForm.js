import React, { useState, useEffect } from 'react';

const StudentForm = ({ selectedStudent, onAdd, onUpdate, onCancel }) => {
  const [student, setStudent] = useState({ name: '', email: '', age: '', course: '' });

  useEffect(() => {
    if (selectedStudent) {
      setStudent(selectedStudent);
    }
  }, [selectedStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (student.id) {
      onUpdate(student);
    } else {
      onAdd({ ...student, id: Date.now() });
    }
    setStudent({ name: '', email: '', age: '', course: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={student.name}
        placeholder="Name"
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        value={student.email}
        placeholder="Email"
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="age"
        value={student.age}
        placeholder="Age"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="course"
        value={student.course}
        placeholder="Course"
        onChange={handleChange}
        required
      />
      <button type="submit">{student.id ? 'Update Student' : 'Add Student'}</button>
      {selectedStudent && <button onClick={onCancel}>Cancel</button>}
    </form>
  );
};

export default StudentForm;
