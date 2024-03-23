import { Link } from "react-router-dom";
import classes from "./HomePage.module.scss"

const HomePage = () => {
	return (
		<div className={classes.banner}>
			<div className={classes.bannerLink}>
				<Link to="/MarkdownPreviewer/app">
					<button className={classes.bannerButton}>
						START WRITING
					</button>
				</Link>
			</div>
		</div>
	)
}

export default HomePage