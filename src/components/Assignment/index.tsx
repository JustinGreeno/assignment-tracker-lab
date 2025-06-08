// src/components/Assignment/index.tsx
import { TbTrash } from 'react-icons/tb';
import { BsCircle, BsCheckCircleFill } from 'react-icons/bs';
import styles from './assignment.module.css';

// shape of each assignment
export interface AssignmentType {
  id: number;
  title: string;
  completed: boolean;
}

interface Props {
  assignment: AssignmentType;       // data for this item
  onToggleComplete: () => void;     // flip completed state
  onDelete: () => void;             // remove this item
}

export function Assignment({
  assignment,
  onToggleComplete,
  onDelete,
}: Props) {
  return (
    <div className={styles.assignment}>
      {/* toggle complete/incomplete */}
      <button
        onClick={onToggleComplete}
        className={styles.checkContainer}
        aria-label={
          assignment.completed
            ? 'Mark as incomplete'
            : 'Mark as complete'
        }
      >
        {assignment.completed ? (
          <BsCheckCircleFill size={20} />  // filled check
        ) : (
          <BsCircle size={20} />           // empty circle
        )}
      </button>

      {/* title, struck-through if completed */}
      <p
        className={
          assignment.completed ? styles.textCompleted : ''
        }
      >
        {assignment.title}
      </p>

      {/* delete icon */}
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
