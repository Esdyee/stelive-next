import { age, name } from './data';

interface CartItemProps {
	item?: string;
}
export default function Cart() {
	let 장바구니 = ['tomatoes', 'noodle', 'coconut'];
	return (
		<div>
			<h4 className="title">Cart</h4>
			<p>{age} / {name}</p>
			<CartItem item={장바구니[0]}/>
			<CartItem />
			<Btn />
			<Btn color={"blue"}/>
		</div>
	)
}

// @ts-ignore
function Btn(props){
	let color = "red";
	color = !props.color ? color : props.color;
	return <button className="rounded-md w-20" style={{ background : color }}>버튼임</button>
}

function CartItem(props: CartItemProps) {
	return (
		<div className="cart-item">
			<p>{props.item}</p>
			<p>$40</p>
		</div>
	)
}
