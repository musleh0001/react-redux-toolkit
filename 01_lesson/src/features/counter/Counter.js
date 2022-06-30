import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, incrementByAmount, reset } from "./counterSlice";

const Counter = () => {
	const [incrementAmount, setIncrementAmount] = useState(0);
	const dispatch = useDispatch();
	const { count } = useSelector((store) => store.counter);

	const addValue = Number(incrementAmount) || 0;

	const resetAll = () => {
		setIncrementAmount(0);
		dispatch(reset());
	};

	return (
		<section>
			<p>{count}</p>
			<div>
				<button onClick={() => dispatch(increment())}>+</button>
				<button onClick={() => dispatch(decrement())}>-</button>
			</div>

			<input type="text" value={incrementAmount} onChange={(e) => setIncrementAmount(e.target.value)} />
			<div>
				<button onClick={() => dispatch(incrementByAmount(addValue))}>Add Amount</button>
				<button onClick={resetAll}>Reset</button>
			</div>
		</section>
	);
};

export default Counter;
