import { useState, useEffect } from "react";

export const TextTransition = ({ text }: { text: string }) => {
	const [display, setDisplay] = useState(text);
	const [isAnimating, setIsAnimating] = useState(false);

	useEffect(() => {
		// Jika teks dari props berubah (misal tombol bahasa diklik)
		if (text !== display) {
			setIsAnimating(true); // Mulai animasi memudar & blur

			// Tunggu 150ms sampai teks hilang, lalu ganti isinya dan kembalikan ketajamannya
			const timeout = setTimeout(() => {
				setDisplay(text);
				setIsAnimating(false);
			}, 150);

			return () => clearTimeout(timeout);
		}
	}, [text, display]);

	return <span className={`inline-block transition-all duration-150 ease-in-out ${isAnimating ? "opacity-0 blur-sm scale-95" : "opacity-100 blur-0 scale-100"}`}>{display}</span>;
};
