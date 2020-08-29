import React, { useState, useEffect } from 'react';
import './App.css';
// Component Imports
import Form from './components/Form';
import TodoList from './components/TodoList';

function App() {
	//States
	const [inputText, setInputText] = useState('');
	const [todos, setTodos] = useState([]);
	const [filter, setFilter] = useState('all');
	const [filteredTodos, setFilteredTodos] = useState([]);

	// Run only one when the app starts

	useEffect(() => {
		getTodosFromLocalStorage();
	}, []);

	//UseEffect
	useEffect(() => {
		const filterHandler = () => {
			switch (filter) {
				case 'completed':
					setFilteredTodos(todos.filter((todo) => todo.completed === true));
					break;
				case 'uncompleted':
					setFilteredTodos(todos.filter((todo) => todo.completed === false));
					break;
				case 'all':
					setFilteredTodos(todos);
					break;
				default:
					break;
			}
		};

		const saveTodosToLocalStorage = () => {
			localStorage.setItem('todos', JSON.stringify(todos));
		};

		filterHandler();
		saveTodosToLocalStorage();
	}, [todos, filter]);

	const getTodosFromLocalStorage = () => {
		if (localStorage.getItem('todos') === null) {
			localStorage.setItem('todos', JSON.stringify([]));
		} else {
			let localStorageTodos = localStorage.getItem('todos');
			setTodos(JSON.parse(localStorageTodos));
		}
	};

	return (
		<div className='App'>
			<header>ReactJS To-Do List</header>
			<Form
				setTodos={setTodos}
				todos={todos}
				setInputText={setInputText}
				inputText={inputText}
				setFilter={setFilter}
			/>
			<TodoList
				filteredTodos={filteredTodos}
				setTodos={setTodos}
				todos={todos}
			/>
		</div>
	);
}

export default App;
