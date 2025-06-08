// src/components/Assignment/index.tsx

import { TbTrash } from 'react-icons/tb';          // trash icon
import { BsCircle, BsCheckCircleFill } from 'react-icons/bs';
import styles from './assignment.module.css';

// The shape of each assignment
export interface AssignmentType {
  id: number;
  title: string;
  completed: boolean;
}

interface Props {
  assignment: AssignmentType;
  onToggleComplete: () => void;
  onDelete: () => void;                          // delete callback
}

export function Assignment({ assignment, onToggleComplete, onDelete }: Props) {
  return (
    <div className={styles.assignment}>
      {/* toggle complete/incomplete */}
      <button
        onClick={onToggleComplete}
        className={styles.checkContainer}
        aria-label={
          assignment.completed ? 'Mark incomplete' : 'Mark complete'
        }
      >
        {assignment.completed ? (
          <BsCheckCircleFill size={20} />
        ) : (
          <BsCircle size={20} />
        )}
      </button>

      {/* title text */}
      <p className={assignment.completed ? styles.textCompleted : ''}>
        {assignment.title}
      </p>

      {/* **Step 3 delete button** */}
      <button
        onClick={onDelete}
        className={styles.deleteButton}
        aria-label="Delete assignment"
      >
        <TbTrash size={20} />
      </button>
    </div>
  );
}
