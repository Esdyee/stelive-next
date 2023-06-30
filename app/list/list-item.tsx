'use client';
import Link from "next/link";
import { Post } from "./interface";
import { useEffect, useState } from "react";

export default function ListItem({ data }: {
	data: Post[];
}) {
	console.log(data);

	const [list, dispatchList] = useState(data);

	return (
		<div>

			{list.map((item: unknown, index: number) => (
				<div className="list-item p-5 border-2 border-gray-500 mt-1" key={index}>
					<Link href={`/detail/${(item as Post).id}`} >
						<h4 className="text-xl font-semibold">{(item as Post).title}</h4>
						<p>{(item as Post).content}</p>
					</Link>
					<Link className="bg-green-800 mt-2 p-2 text-white inline-block"
						  href={`/edit/${(item as Post).id}`}>수정</Link>
					<span className="bg-red-800 mt-2 ms-2 p-2 text-white inline-block cursor-pointer"
						  onClick={() => {
							  const deleteId = (item as Post).id;
							  fetch(`/api/post/delete`, {
								  method: 'POST',
								  body: deleteId
							  }).then((res) => {
								  const filtered = list.filter((item: Post) => {
									  return deleteId !== (item as Post).id;
								  });
								  dispatchList(filtered);
							  });
						  }}
					>삭제</span>
				</div>
			))}
		</div>
	)
}
