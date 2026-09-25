import React, { useEffect, useState } from 'react';

export const CustomCursor = () => {
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [isHovering, setIsHovering] = useState(false);
	const [isMobile, setIsMobile] = useState(true);

	useEffect(() => {
		// Detect if it's a touch device (no cursor needed)
		if (window.matchMedia("(pointer: coarse)").matches) {
			setIsMobile(true);
			return;
		}
		setIsMobile(false);

		const moveCursor = (e: MouseEvent) => {
			// Menggunakan requestAnimationFrame untuk performa yang lebih smooth
			requestAnimationFrame(() => {
				setPosition({ x: e.clientX, y: e.clientY });
			});
		};

		const handleMouseOver = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			// Cek apakah elemen yang di-hover adalah elemen yang bisa di-klik
			if (
				target.tagName.toLowerCase() === 'a' ||
				target.tagName.toLowerCase() === 'button' ||
				target.closest('a') ||
				target.closest('button') ||
				target.classList.contains('cursor-pointer') ||
				target.closest('.cursor-pointer')
			) {
				setIsHovering(true);
			} else {
				setIsHovering(false);
			}
		};

		window.addEventListener('mousemove', moveCursor);
		window.addEventListener('mouseover', handleMouseOver);

		// Create a global style element to enforce cursor: none on all elements
		const styleElement = document.createElement('style');
		styleElement.innerHTML = `
			* {
				cursor: none !important;
			}
		`;
		document.head.appendChild(styleElement);

		return () => {
			window.removeEventListener('mousemove', moveCursor);
			window.removeEventListener('mouseover', handleMouseOver);
			document.head.removeChild(styleElement);
		};
	}, []);

	if (isMobile) return null;

	return (
		<>
			{/* Lingkaran luar (mengikuti perlahan dengan transition) */}
			<div
				className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full border-2 border-blue-500/50 mix-blend-difference transition-all duration-200 ease-out"
				style={{
					width: isHovering ? '60px' : '30px',
					height: isHovering ? '60px' : '30px',
					transform: `translate3d(${position.x - (isHovering ? 30 : 15)}px, ${position.y - (isHovering ? 30 : 15)}px, 0)`,
					backgroundColor: isHovering ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
				}}
			/>
			
			{/* Titik dalam (mengikuti instan) */}
			<div
				className="fixed top-0 left-0 z-[10000] pointer-events-none w-2 h-2 rounded-full bg-blue-500 mix-blend-difference transition-all duration-75"
				style={{
					transform: `translate3d(${position.x - 4}px, ${position.y - 4}px, 0)`,
					opacity: isHovering ? 0 : 1
				}}
			/>
		</>
	);
};
