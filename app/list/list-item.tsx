'use client';
import Link from "next/link";
import { Post } from "./interface";
import { useEffect, useState } from "react";

export default function ListItem({ data }: {
	data: Post[];
}) {
	console.log(data);

	const [list, dispatchList] = useState(data);

	const [deletedItemId, setDeletedItemId] = useState("");

	const handleDelete = (itemId: string) => {
		console.log(itemId);
		fetch(`/api/post/delete`, {
			method: 'POST',
			body: itemId
		}).then(res => {
			if (res.status === 200) {
				return res;
			} else {
				throw new Error('오류');
			}
		}).then((res) => {
			const filtered = list.filter((item: Post) => item.id !== itemId);
			setDeletedItemId(itemId);
			setTimeout(() => {
				dispatchList(filtered);
			}, 600);

		}).catch((err) => { //인터넷문제 등으로 실패시 실행할코드
			console.log(err);
		});

		// fetch(`/api/post/querystring?itemId=${itemId}`, {
		// 	method: 'GET',
		// })

		// fetch(`/api/random/${itemId}`, {
		// 	method: 'POST'
		// });
	};

	useEffect(() => {
		if (deletedItemId) {
			const timeout = setTimeout(() => {
				setDeletedItemId("");
			}, 500); // 애니메이션 지속시간인 0.5초 후에 삭제된 아이템 ID 초기화

			return () => clearTimeout(timeout);
		}
	}, [deletedItemId]);

	// @ts-ignore
	return (
		<div>
			<div>Id : {deletedItemId}</div>
			{list.map((item: any, index: number) => (
				<div className={`list-item p-5 border-2 border-gray-500 mt-1 ${item.id === deletedItemId ? 'hide' : ''}`}
					 key={index}>
					<Link href={`/detail/${(item as Post).id}`} >
						<h4 className="text-xl font-semibold">{(item as Post).title}</h4>
						<p>{(item as Post).content}</p>
					</Link>
					<Link className="bg-green-800 mt-2 p-2 text-white inline-block"
						  href={`/edit/${(item as Post).id}`}>수정</Link>
					<span className="bg-red-800 mt-2 ms-2 p-2 text-white inline-block cursor-pointer"
						  onClick={(e) => {
							  const deleteId = (item as Post).id;
							  handleDelete(deleteId)
						  }}
					>삭제</span>
				</div>
			))}
		</div>
	)
}
