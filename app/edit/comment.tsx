'use client';
import { useState } from "react";

export default function Comment({ postId } : {
	postId: string;
}) {
	let [comment, setComment] = useState("")
	return (
		<div>
			<h4>댓글</h4>
			<ul className={"bg-500"}>
				<li>댓글1</li>
				<li>댓글2</li>
				<li>댓글3</li>
			</ul>
			<input type={"text"} className={"text-black"}
		   		onChange={(e) => {
				setComment(e.target.value)
			}} />
			<button className={""}
					onClick={() => {
						fetch('/api/post/comment', {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json'
							},
							body: JSON.stringify({
								parentId: postId,
								comment: comment
							})
						})
					}}></button>
		</div>
	)
}
