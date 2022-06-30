import { useDispatch } from "react-redux";
import { reactionAdd } from "./postsSlice";

const reactionEmoji = {
	thumbsUp: "👍",
	wow: "😲",
	heart: "💝",
	rocket: "🚀",
	coffee: "🍺",
};

const ReactionButtons = ({ id, reactions }) => {
	const dispatch = useDispatch();

	const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
		return (
			<button key={name} type="button" className="reactionButton" onClick={() => dispatch(reactionAdd({ postId: id, reaction: name }))}>
				{emoji} {reactions[name]}
			</button>
		);
	});

	return <div>{reactionButtons}</div>;
};
export default ReactionButtons;
