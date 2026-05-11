import { useState, useEffect } from "react";

export const TextAnimation = ({ text }: { text: string }) => {
	const [items, setItems] = useState([{ id: Date.now(), text, isNew: true }]);

	useEffect(() => {
		if (items[items.length - 1].text === text) return;

		const newItem = { id: Date.now(), text, isNew: true };

		setItems((prev) => {
			const updatedPrev = prev.map((p) => ({ ...p, isNew: false }));
			return [...updatedPrev, newItem];
		});

		const timeout = setTimeout(() => {
			setItems([newItem]);
		}, 400);

		return () => clearTimeout(timeout);
	}, [text]);

	return (
		<span className="relative inline-grid grid-cols-1 grid-rows-1 overflow-hidden align-bottom">
			{items.map((item) => (
				<span
					key={item.id}
					className={`col-start-1 row-start-1 ${item.isNew ? "animate-roll-in" : "animate-roll-out"}`}>
					{item.text}
				</span>
			))}
		</span>
	);
};
