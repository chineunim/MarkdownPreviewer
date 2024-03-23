import React, {useState} from "react"
import Editor from "../../components/Editor/Editor";
import Previewer from "../../components/Previewer/Previewer";
import classes from "./MarkdownRenderer.module.scss"

const MarkdownRenderer: React.FC = () => {
	const [markdownText, setMarkdownText] = useState<string>("");

	const handleEditorChange = (newText: string) => {
		setMarkdownText(newText);
	}

	return (
		<div className={classes.container}>
			<Editor onInputChange={handleEditorChange}/>
			<Previewer text={markdownText}/>
		</div>
	)
}

export default MarkdownRenderer