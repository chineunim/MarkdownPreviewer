import React from "react";
import classes from "./EditorTools.module.scss"
import { GoCode, GoLink, GoQuote, GoHorizontalRule, GoListUnordered, GoListOrdered, GoImage, GoDownload} from "react-icons/go";

interface EditorToolsProps {
	applyBold: () => void;
	applyItalic: () => void;
	applyCode: () => void;
	pasteHr: () => void;
	toggleLinkModal: () => void;
	toggleImageModal: () => void;
	applyUnorderedList: () => void;
	applyNumberedList: () => void;
	applyBlockquote: () => void;
	downloadMarkdownFile: () => void;
	applyH1: () => void;
	applyH2: () => void;
	applyH3: () => void;
	applyH4: () => void;
	applyH5: () => void;
	applyH6: () => void;
}

const EditorTools: React.FC<EditorToolsProps> = ({
	applyBold,
	applyItalic,
	applyCode, 
	pasteHr,
	toggleLinkModal,
	toggleImageModal,
	applyUnorderedList,
	applyNumberedList,
	applyBlockquote,
	downloadMarkdownFile,
	applyH1,
	applyH2,
	applyH3,
	applyH4,
	applyH5,
	applyH6
	}) => {
		
	return (
		<div className={classes.tools}>
			<div className={classes.headingTools}>
				<p className={classes.toolsTitle}>Heading</p>
				<div className={classes.headingButtons}>
					<button className={classes.headingButton} onClick={applyH1}>H1</button>
					<button className={classes.headingButton} onClick={applyH2}>H2</button>
					<button className={classes.headingButton} onClick={applyH3}>H3</button>
					<button className={classes.headingButton} onClick={applyH4}>H4</button>
					<button className={classes.headingButton} onClick={applyH5}>H5</button>
					<button className={classes.headingButton} onClick={applyH6}>H6</button>
				</div>
			</div>
			<hr className={classes.toolsDivider}/>

			<div className={classes.toolsContainer}>
				<p className={classes.toolsTitle}>Styling</p>
				<div className={classes.buttonsContainer}>
					<button className={classes.button} onClick={applyBold}>
						<strong>B</strong>
					</button>
					<button className={classes.button} onClick={applyItalic}>
						<em>I</em>
					</button>
					<button className={classes.button} onClick={applyCode}>
						<GoCode />
					</button>
				</div>
			</div>
			<hr className={classes.toolsDivider}/>

			<div className={classes.toolsContainer}>
				<p className={classes.toolsTitle}>Pasting</p>
				<div className={classes.buttonsContainer}>
					<button className={classes.button} onClick={pasteHr}>
						<GoHorizontalRule />
					</button>
					<button className={classes.button} onClick={toggleLinkModal}>
						<GoLink />
					</button>
					<button className={classes.button} onClick={toggleImageModal}>
						<GoImage />
					</button>
					<button className={classes.button} onClick={applyBlockquote}>
						<GoQuote />
					</button>
				</div>
			</div>
			<hr className={classes.toolsDivider}/>
			
			<div className={classes.toolsContainer}>
				<p className={classes.toolsTitle}>List</p>
				<div className={classes.buttonsContainer}>
					<button className={classes.button} onClick={applyUnorderedList}>
						<GoListUnordered />
					</button>
					<button className={classes.button} onClick={applyNumberedList}>
						<GoListOrdered />
					</button>
				</div>
			</div>
			<hr className={classes.toolsDivider}/>

			<div className={classes.toolsContainer}>
				<p className={classes.toolsTitle}>Get File</p>
				<div className={classes.buttonsContainer}>
					<button className={classes.button} onClick={downloadMarkdownFile}>
						<GoDownload />
					</button>
				</div>
			</div>
		</div>
	)
}

export default EditorTools