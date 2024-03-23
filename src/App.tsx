import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import MarkdownRenderer from './pages/MarkdownRenderer/MarkdownRenderer';
import classes from './App.module.scss';
function App() {

	return (
		<div className={classes.app}>
			<Router>
				<Routes>
					<Route path="/MarkdownPreviewer/" element={<HomePage />} />
					<Route path="/MarkdownPreviewer/app" element={<MarkdownRenderer />}/>
				</Routes>
			</Router>
		</div>
	)
}

export default App