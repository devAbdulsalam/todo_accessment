// components/TodoItem.js
import useTodoStore from '@/lib/store';
import { useState } from 'react';
import Swal from 'sweetalert2';

type TodoItemProps = {
	todo: {
		title: string;
		id: number;
		completed: boolean;
	};
};

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
	const { updateTodo, deleteTodo, editTodo } = useTodoStore();
	const [isEditing, setIsEditing] = useState(false);
	const [newTitle, setNewTitle] = useState(todo.title);

	const handleDelete = (id: number) => {
		Swal.fire({
			title: 'Do you want to delete this todo?',
			icon: 'question',
			confirmButtonColor: '#d33',
			cancelButtonColor: '#3085d6',
			showCancelButton: true,
			confirmButtonText: `Delete`,
		}).then((result) => {
			if (result.isConfirmed) {
				deleteTodo(id);
				Swal.fire('Deleted!', '', 'success');
			}
		});
	};

	const handleEdit = () => {
		if (isEditing) {
			editTodo(todo.id, newTitle);
		}
		setIsEditing(!isEditing);
	};

	return (
		<div className="flex items-center justify-between p-2 border-b">
			<div>
				<input
					type="checkbox"
					checked={todo.completed}
					onChange={() => updateTodo(todo.id, { completed: !todo.completed })}
				/>
				{isEditing ? (
					<input
						type="text"
						value={newTitle}
						onChange={(e) => setNewTitle(e.target.value)}
						className="border p-2 ml-2 dark:bg-gray-700 dark:border-gray-600"
					/>
				) : (
					<span className={`ml-2 ${todo.completed ? 'line-through' : ''}`}>
						{todo.title}
					</span>
				)}
			</div>
			<div>
				<button onClick={handleEdit} className="mr-2">
					{isEditing ? 'Save' : 'Edit'}
				</button>
				<button onClick={() => handleDelete(todo.id)}>Delete</button>
			</div>
		</div>
	);
};

export default TodoItem;
