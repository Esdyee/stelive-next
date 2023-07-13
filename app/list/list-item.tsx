'use client';
import Link from "next/link";
import { Post } from "./interface";
import { useEffect, useState } from "react";
import styles from "./list-item.module.css";

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
				<div className={`${styles['list-item']} p-5 border-2 border-gray-500 mt-1 ${item.id === deletedItemId ? styles.hide : ''}`}
					 key={index}>
					<Link href={`/detail/${(item as Post).id}`}>
						<h4 className="text-xl font-semibold">{(item as Post).title}</h4>
						<p>{(item as Post).content}</p>
					</Link>
					<Link className="mt-2 inline-block bg-green-800 p-2 text-white"
						  href={`/edit/${(item as Post).id}`}>수정</Link>
					<span className="mt-2 inline-block cursor-pointer bg-red-800 p-2 text-white ms-2"
						  onClick={(e) => {
							  const deleteId = (item as Post).id;
							  handleDelete(deleteId)
						  }}
					>삭제</span>
					<span className="mt-2 inline-block cursor-pointer bg-blue-800 p-2 text-white ms-2"
						  onClick={(e) => {
							  const postId = (item as Post).id;
							  fetch(`/api/post/likes`, {
								  method: 'POST',
								  headers: {
									  'Content-Type': 'application/json'
								  },
								  body: JSON.stringify({
									  postId: postId
								  })
							  }).then(res => {
								  if (res.status === 200) {
									  return res;
								  } else {
									  // normal error
									  return res.text().then((text) => {
										  throw new Error(text);
									  });
								  }
							  }).then((res) => {
								  console.log(res);
								  const updatedList = list.map((item: Post) => {
									  if (item.id === postId) {
										  item.likes = item.likes ? Number(item.likes) + 1 : 1;
									  }
									  return item;
								  });
								  dispatchList(updatedList);
							  }).catch((err) => {
								  alert(err);
							  })
						  }}
					>좋아요</span>
					<span className={"ms-2"}
					>{(item as Post).likes ? (item as Post).likes : 0}
					</span>
				</div>
			))}
		</div>
	)
}
