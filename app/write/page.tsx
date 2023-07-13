'use client';
import { useState } from "react";

export default function Write() {
	let [src, setSrc] = useState("");

	return (
		<div>
			<h1>생성페이지</h1>

			<input type={"file"} accept={"image/*"} name={"image"}
				   onChange={async (e) => {
					   if (!e.target.files) return;

					   let file = e.target.files[0]
					   let filename = encodeURIComponent(file.name)
					   let res = await fetch('/api/post/image?file=' + filename)
					   res = await res.json()
					   console.log(res);
					   console.log(res.fields);

					   // let resJson = await res.json()
					   // console.log(resJson);
					   // console.log(resJson.fields);

					   //S3 업로드
					   const formData = new FormData()
					   Object.entries({
						   ...res.fields,
						   file
					   }).forEach(([key, value]) => {
						   formData.append(key, value)
					   })

					   console.log(formData);

					   let 업로드결과 = await fetch(res.url, {
						   method: 'POST',
						   body: formData,
					   })

					   console.log(업로드결과);

					   if (업로드결과.ok) {
						   setSrc(업로드결과.url + '/' + filename)
						   console.log("성공");
					   } else {
						   console.log('실패')
					   }
				   }}
			/>
			<p> src: {src}</p>
			<img src={src} alt={""}/>

			<form action={'/api/post/new'} method="POST">
				<div className="bg-gray-500 p-4 text-black">
					<input className="p-2" type="text" name={"title"} placeholder={"제목"}/>
				</div>
				<div className="bg-gray-500 p-4 text-black">
					<input className="p-2" type="text" name={"content"} placeholder={"내용"}/>
				</div>
				<div className="bg-gray-500 p-4 text-black">

				</div>


				<div className="bg-gray-500 p-4">
					<button
						className="bg-amber-400 p-4 text-black" type="submit">
						생성
					</button>
				</div>

			</form>
		</div>
	)
}
