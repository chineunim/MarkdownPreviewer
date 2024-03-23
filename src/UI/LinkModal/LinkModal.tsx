import React, { useState } from "react";
import classes from "./LinkModal.module.scss"

interface LinkModalProps {
	modalTitle: string
	onApply: (link: string) => void;
	onCancel: () => void;
}

const LinkModal: React.FC<LinkModalProps> = ({ modalTitle, onApply, onCancel }) => {
	const [link, setLink] = useState<string>("");
	
	const handleApply = () => {
		if(link.trim() !== '' ) {
			onApply(link);
			setLink('');
		}
	}

	return (
		<div className={classes.modalOverlay}>
			<div className={classes.modal}>
				<p className={classes.modalTitle}>
					{modalTitle}
				</p>
				<input
					className={classes.modalInput}
					type="text"
					placeholder="Enter link URL"
					value={link}
					onChange={(e) => setLink(e.target.value)}/>
				<div className={classes.modalButtons}>
					<button className={classes.modalButtonApply} onClick={handleApply}>
						Apply
					</button>
					<button className={classes.modalButtonCancel} onClick={onCancel}>
						Cancel
					</button>
				</div>
			</div>
		</div>
	)
}

export default LinkModal