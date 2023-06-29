export default function Test(req, res) {
	if(req.method === "GET") {
		console.log(req.method);
	}
	if(req.method === "POST") {
		console.log(req.method);
	}
	return res.status(200).json("처리완료2");
}
