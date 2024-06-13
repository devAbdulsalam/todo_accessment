import create from 'zustand';

interface Todo {
	id: number;
	title: string;
	completed: boolean;
}

interface TodoState {
	todos: Todo[];
	addTodo: (title: string) => void;
	updateTodo: (id: number, updatedTodo: Partial<Todo>) => void;
	deleteTodo: (id: number) => void;
	editTodo: (id: number, title: string) => void;
	filter: string;
	setFilter: (filter: string) => void;
}

const useTodoStore = create<TodoState>((set) => ({
	todos: [],
	addTodo: (title) =>
		set((state) => ({
			todos: [...state.todos, { id: Date.now(), title, completed: false }],
		})),
	updateTodo: (id, updatedTodo) =>
		set((state) => ({
			todos: state.todos.map((todo) =>
				todo.id === id ? { ...todo, ...updatedTodo } : todo
			),
		})),
	deleteTodo: (id) =>
		set((state) => ({
			todos: state.todos.filter((todo) => todo.id !== id),
		})),
	editTodo: (id, title) =>
		set((state) => ({
			todos: state.todos.map((todo) =>
				todo.id === id ? { ...todo, title } : todo
			),
		})),
	filter: 'all',
	setFilter: (filter) => set({ filter }),
}));

export default useTodoStore;
