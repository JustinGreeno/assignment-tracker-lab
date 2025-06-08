// src/components/Assignments/index.tsx
import React, { useState } from 'react';
import { Header } from '../Header';
import { Assignment, AssignmentType } from '../Assignment';
import styles from './assignments.module.css';

export function Assignments() {
  const [assignments, setAssignments] = useState<AssignmentType[]>([]);
  const [nextId, setNextId] = useState(1);

  // add a new assignment
  const handleAdd = (title: string) => {
    setAssignments(prev => [
      ...prev,
      { id: nextId, title, completed: false },
    ]);
    setNextId(id => id + 1);
  };

  // toggle complete/incomplete
  const handleToggle = (id: number) => {
    setAssignments(prev =>
      prev.map(a =>
        a.id === id ? { ...a, completed: !a.completed } : a
      )
    );
  };

  // delete an assignment
  const handleDelete = (id: number) => {
    setAssignments(prev => prev.filter(a => a.id !== id));
  };

  return (
    <main className={styles.main}>
      {/* header + form */}
      <Header onAdd={handleAdd} />

      {/* stats */}
      <section className={styles.stats}>
        <p>Created Assignments: {assignments.length}</p>
        <p>
          Completed Assignments:{' '}
          {assignments.filter(a => a.completed).length} of{' '}
          {assignments.length}
        </p>
      </section>

      {/* list */}
      <ul className={styles.list}>
        {assignments.map(item => (
          <li key={item.id}>
            <Assignment
              assignment={item}
              onToggleComplete={() => handleToggle(item.id)}
              onDelete={() => handleDelete(item.id)}
            />
          </li>
        ))}
      </ul>
    </main>
  );
}
