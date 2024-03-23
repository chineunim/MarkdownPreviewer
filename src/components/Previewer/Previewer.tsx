import React from "react";
import Markdown from "react-markdown";
import classes from "./Previewer.module.scss";

interface PreviewerProps {
	text: string;
}

const Previewer:React.FC<PreviewerProps> = ({text}) => {

	return(
		<div className={classes.previewerWrapper}>
			<div className={classes.previewerWindow}>
				<Markdown className={classes.previewerText}>
					{text}
				</Markdown>
			</div>
		</div>
	)
}

export default Previewer