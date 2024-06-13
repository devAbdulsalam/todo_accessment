// components/DarkModeToggle.js
import { useEffect, useState } from 'react';
import { FaToggleOn, FaToggleOff } from 'react-icons/fa';
const DarkModeToggle = () => {
	const [darkMode, setDarkMode] = useState(false);

	useEffect(() => {
		if (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) &&
				window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark');
			setDarkMode(true);
		} else {
			document.documentElement.classList.remove('dark');
			setDarkMode(false);
		}
	}, []);

	const toggleDarkMode = () => {
		if (darkMode) {
			document.documentElement.classList.remove('dark');
			localStorage.theme = 'light';
		} else {
			document.documentElement.classList.add('dark');
			localStorage.theme = 'dark';
		}
		setDarkMode(!darkMode);
	};

	return (
		<button
			onClick={toggleDarkMode}
			className="bg-gray-800 text-white px-4 py-2 rounded dark:bg-gray-300 dark:text-black"
		>
			{darkMode ? <FaToggleOff /> : <FaToggleOn />}
		</button>
	);
};

export default DarkModeToggle;
