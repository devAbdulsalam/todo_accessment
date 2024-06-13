'use client'; // pages/index.js
import { useState, Suspense, lazy } from 'react';
import useTodoStore from '@/lib/store';
import Loader from '@/components/Loader';
import DarkModeToggle from '@/components/DarkModeToggle';

const TodoItem = lazy(() => import('@/components/TodoItem'));

export default function Home() {
	const [newTodo, setNewTodo] = useState('');
	const { todos, addTodo, filter, setFilter } = useTodoStore();

	const handleAddTodo = () => {
		if (newTodo.trim() === '') return;
		addTodo(newTodo);
		setNewTodo('');
	};

	const filteredTodos = todos.filter((todo) => {
		if (filter === 'completed') return todo.completed;
		if (filter === 'incomplete') return !todo.completed;
		return true;
	});

	return (
		<main className="h-screen w-full  mx-auto p-4 dark:bg-gray-900 dark:text-white">
			<div className="flex flex-col justify-center items-center mb-4">
				<div className="flex justify-between items-center mb-4">
					<h1 className="text-2xl">Todo App</h1>
					<div className="absolute right-10">
						<DarkModeToggle />
					</div>
				</div>
				<div className="mb-4">
					<input
						type="text"
						value={newTodo}
						onChange={(e) => setNewTodo(e.target.value)}
						placeholder="Add a new todo"
						className="border p-2 mr-2 dark:bg-gray-700 dark:border-gray-600"
					/>
					<button
						onClick={handleAddTodo}
						className="bg-blue-500 text-white px-4 py-2 dark:bg-blue-700 rounded-md "
					>
						Add
					</button>
				</div>
				<div className="mb-4">
					<button
						onClick={() => setFilter('all')}
						className="mr-2 dark:bg-gray-700 dark:border-gray-600 px-3 py-2 rounded-md"
					>
						All
					</button>
					<button
						onClick={() => setFilter('completed')}
						className="mr-2 dark:bg-gray-700 dark:border-gray-600 px-3 py-2 rounded-md"
					>
						Completed
					</button>
					<button
						onClick={() => setFilter('incomplete')}
						className="dark:bg-gray-700 dark:border-gray-600 px-3 py-2 rounded-md"
					>
						Incomplete
					</button>
				</div>
			</div>
			<Suspense fallback={<Loader />}>
				<div>
					{filteredTodos.map((todo) => (
						<TodoItem key={todo.id} todo={todo} />
					))}
				</div>
			</Suspense>
		</main>
	);
}
