'use client';
import { useEffect, useState } from "react";
import { WithId } from "mongodb";

export default function Comment({ postId, comments } : {
	postId: string;
	comments: Array<{
		parentId: string;
		name: string;
		email: string;
		comment: string;
	}>;
}) {

	let [comment, setComment] = useState("")
	let [commentList, setCommentList] = useState(comments);

	//get Comments from api
	function getComments() {
		fetch(`/api/post/comment?postId=${postId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((res) => {
			return res.json();
		})
		.then((data) => {
			const result = data.map((comment: any) => {
				return {
					parentId: comment.parentId.toString(),
					name: comment.name,
					email: comment.email,
					comment: comment.comment,
				}
			})
			setCommentList(result);
		});
	}


	return (
		<div className={"mt-3"}>
			<h4>댓글</h4>
			<ul className={"bg-500"}>
				{commentList.map((comment, index) => {
					return(
						<li key={index}>
							{comment.name} : {comment.comment}
						</li>
					)
				})}
			</ul>
			<input type={"text"} className={"text-black"}
		   		onChange={(e) => {
				setComment(e.target.value)
			}} />
			<button className={"bg-blue-500 text-white p-2"}
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
						}).then((res) => {
							getComments();
						})
					}}>등록</button>
		</div>
	)
}
