import React, { useState, useRef } from "react"
import classes from './Editor.module.scss'
import LinkModal from "../../UI/LinkModal/LinkModal";
import EditorTools from "../../UI/EditorTools/EditorTools";

interface EditorProps {
	onInputChange: (newText: string) => void;
}

const Editor: React.FC<EditorProps> = ({ onInputChange }) => {
	const [markdownText, setMarkdownText] = useState<string>('');
	const [showLinkModal, setShowLinkModal] = useState<boolean>(false);
	const [showImageModal, setShowImageModal] = useState<boolean>(false);
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const toggleLinkModal = () => {
		setShowLinkModal(!showLinkModal);
	}

	const toggleImageModal = () => {
		setShowImageModal(!showImageModal)
	}

	const handleMarkdownText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const newText = e.target.value;
		setMarkdownText(newText);
		onInputChange(newText);
	}

	const applyPrefix = (prefix: string) => {
		const selectionStart = textareaRef.current?.selectionStart ?? 0;
		const selectionEnd = textareaRef.current?.selectionEnd ?? 0;
	
		const beforeSelection = markdownText.substring(0, selectionStart);
		const selectedText = markdownText.substring(selectionStart, selectionEnd);
		const afterSelection = markdownText.substring(selectionEnd);
	
		const lines = selectedText.split("\n");
		const prefixedLines = lines.map(line => prefix + line);
	
		const newText = beforeSelection + prefixedLines.join("\n") + afterSelection;
	
		setMarkdownText(newText);
		onInputChange(newText);
	
		textareaRef.current?.focus();
		textareaRef.current?.setSelectionRange(selectionStart, selectionStart + newText.length);
	}

	const applyWrap = (wrapper: string) => {
		const selectionStart = textareaRef.current?.selectionStart ?? 0;
		const selectionEnd = textareaRef.current?.selectionEnd ?? 0;

		const newText =
			markdownText.substring(0, selectionStart) +
			wrapper +
			markdownText.substring(selectionStart, selectionEnd) +
			wrapper +
			markdownText.substring(selectionEnd);

		setMarkdownText(newText);
		onInputChange(newText);

		textareaRef.current?.focus();
		textareaRef.current?.setSelectionRange(selectionStart + wrapper.length, selectionEnd + wrapper.length);
	}

	const applyLink = (link: string) => {
		const selectionStart = textareaRef.current?.selectionStart ?? 0;
		const selectionEnd = textareaRef.current?.selectionEnd ?? 0;

		const newText =
			markdownText.substring(0, selectionStart) +
			"[" +
			markdownText.substring(selectionStart, selectionEnd) +
			"]" +
			`(${link})` +
			markdownText.substring(selectionEnd);

		setMarkdownText(newText);
		onInputChange(newText);

		textareaRef.current?.focus();
		textareaRef.current?.setSelectionRange(selectionStart + 2, selectionEnd + 2);

		setShowLinkModal(false);
	};

	const parseImage = (link: string) => {
		const selectionStart = textareaRef.current?.selectionStart ?? 0;
		const selectionEnd = textareaRef.current?.selectionEnd ?? 0;

		const newText =
			markdownText.substring(0, selectionStart) +
			"![" +
			markdownText.substring(selectionStart, selectionEnd) +
			"]" +
			`(${link})` +
			markdownText.substring(selectionEnd);

		setMarkdownText(newText);
		onInputChange(newText);

		textareaRef.current?.focus();
		textareaRef.current?.setSelectionRange(selectionStart + 2, selectionEnd + 2);

		setShowImageModal(false);
	}

	const applyNumberedList = () => {
		const selectionStart = textareaRef.current?.selectionStart ?? 0;
		const selectionEnd = textareaRef.current?.selectionEnd ?? 0;
	
		let selectedText = markdownText.substring(selectionStart, selectionEnd);
		const lines = selectedText.split("\n");
	
		for (let i = 0; i < lines.length; i++) {
		  lines[i] = `${i + 1}. ${lines[i]}`;
		}
	
		const newText =
		  markdownText.substring(0, selectionStart) +
		  lines.join("\n") +
		  markdownText.substring(selectionEnd);
	
		setMarkdownText(newText);
		onInputChange(newText);
	
		textareaRef.current?.focus();
		textareaRef.current?.setSelectionRange(
		  selectionStart,
		  selectionEnd + lines.join("\n").length
		);
	  };

	  const downloadMarkdownFile = () => {
        const element = document.createElement("a");
        const file = new Blob([markdownText], { type: "text/markdown" });
        element.href = URL.createObjectURL(file);
        element.download = "document.md";
        document.body.appendChild(element);
        element.click();
    }


	return (
		<div className={classes.editorWrapper}>
			<div className={classes.toolsWrapper}>
				<EditorTools
					applyH1={() => applyPrefix("# ")}
					applyH2={() => applyPrefix("## ")}
					applyH3={() => applyPrefix("### ")}
					applyH4={() => applyPrefix("#### ")}
					applyH5={() => applyPrefix("##### ")}
					applyH6={() => applyPrefix("###### ")}
					applyBold={() => applyWrap("**")}
					applyItalic={() => applyWrap("*")}
					applyCode={() => applyWrap('```')}
					pasteHr={() => applyPrefix('---')}
					toggleLinkModal={toggleLinkModal}
					toggleImageModal={toggleImageModal}
					applyUnorderedList={() => applyPrefix("- ")}
					applyNumberedList={applyNumberedList}
					applyBlockquote={() => applyPrefix("> ")}
					downloadMarkdownFile={downloadMarkdownFile}
				/>
			</div>

			<div className={classes.editorWindow}>
				<textarea className={classes.editorTextarea}
					value={markdownText}
					onChange={handleMarkdownText}
					ref={textareaRef}>
				</textarea>
				
				{showLinkModal && (
					<LinkModal
						modalTitle="Paste Link"
						onApply={applyLink}
						onCancel={() => setShowLinkModal(false)}
					/>
				)}
				{showImageModal && (
					<LinkModal
						modalTitle="Add image"
						onApply={parseImage}
						onCancel={() => setShowImageModal(false)}
					/>
				)}
			</div>
		</div>
	)
}

export default Editor