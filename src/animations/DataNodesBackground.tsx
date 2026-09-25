import React, { useEffect, useRef } from 'react';

export const DataNodesBackground = ({ theme }: { theme: 'light' | 'dark' }) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		let animationFrameId: number;
		let nodes: Node[] = [];
		let packets: Packet[] = [];

		const maxDistance = 150; // Jarak maksimal untuk dianggap tetangga
		const nodeCount = Math.floor(window.innerWidth * window.innerHeight / 20000); // Dinamis berdasarkan ukuran layar (sekitar 50 node untuk 1080p)

		class Node {
			x: number;
			y: number;
			vx: number;
			vy: number;
			neighbors: Node[];

			constructor(x: number, y: number) {
				this.x = x;
				this.y = y;
				this.vx = (Math.random() - 0.5) * 0.2; // Bergerak sangat pelan
				this.vy = (Math.random() - 0.5) * 0.2;
				this.neighbors = [];
			}

			update(width: number, height: number) {
				this.x += this.vx;
				this.y += this.vy;

				// Pantulkan jika menabrak pinggiran
				if (this.x < 0 || this.x > width) this.vx *= -1;
				if (this.y < 0 || this.y > height) this.vy *= -1;
			}

			draw(ctx: CanvasRenderingContext2D, isDark: boolean) {
				ctx.beginPath();
				ctx.arc(this.x, this.y, 1.5, 0, Math.PI * 2);
				ctx.fillStyle = isDark ? 'rgba(100, 149, 237, 0.4)' : 'rgba(59, 130, 246, 0.3)';
				ctx.fill();
			}
		}

		class Packet {
			source: Node;
			target: Node;
			progress: number;
			speed: number;

			constructor(source: Node, target: Node) {
				this.source = source;
				this.target = target;
				this.progress = 0;
				this.speed = 0.01 + Math.random() * 0.02; // Kecepatan komet
			}

			update() {
				this.progress += this.speed;
			}

			draw(ctx: CanvasRenderingContext2D, isDark: boolean) {
				const x = this.source.x + (this.target.x - this.source.x) * this.progress;
				const y = this.source.y + (this.target.y - this.source.y) * this.progress;

				const tailLength = 0.15; // Panjang ekor komet relative ke progress (15%)
				const startP = Math.max(0, this.progress - tailLength);
				
				const startX = this.source.x + (this.target.x - this.source.x) * startP;
				const startY = this.source.y + (this.target.y - this.source.y) * startP;

				const gradient = ctx.createLinearGradient(startX, startY, x, y);
				const color = isDark ? '255, 255, 255' : '37, 99, 235';
				gradient.addColorStop(0, `rgba(${color}, 0)`);
				gradient.addColorStop(1, `rgba(${color}, 1)`);

				ctx.beginPath();
				ctx.moveTo(startX, startY);
				ctx.lineTo(x, y);
				ctx.strokeStyle = gradient;
				ctx.lineWidth = 2;
				ctx.lineCap = 'round';
				ctx.stroke();

				// Glow effect di kepala komet
				ctx.beginPath();
				ctx.arc(x, y, 2, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(${color}, 0.8)`;
				ctx.shadowBlur = 10;
				ctx.shadowColor = `rgba(${color}, 1)`;
				ctx.fill();
				ctx.shadowBlur = 0; // Reset
			}
		}

		const init = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;

			nodes = [];
			for (let i = 0; i < nodeCount; i++) {
				nodes.push(new Node(Math.random() * canvas.width, Math.random() * canvas.height));
			}

			// Pre-calculate initial neighbors
			findNeighbors();
		};

		const findNeighbors = () => {
			nodes.forEach(node => {
				node.neighbors = [];
				nodes.forEach(other => {
					if (node === other) return;
					const dx = node.x - other.x;
					const dy = node.y - other.y;
					const dist = Math.sqrt(dx * dx + dy * dy);
					if (dist < maxDistance) {
						node.neighbors.push(other);
					}
				});
			});
		};

		const drawNetworkLines = () => {
			const isDark = theme === 'dark';
			ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)';
			ctx.lineWidth = 0.5;

			for (let i = 0; i < nodes.length; i++) {
				for (let j = 0; j < nodes[i].neighbors.length; j++) {
					const neighbor = nodes[i].neighbors[j];
					ctx.beginPath();
					ctx.moveTo(nodes[i].x, nodes[i].y);
					ctx.lineTo(neighbor.x, neighbor.y);
					ctx.stroke();
				}
			}
		};

		const animate = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			// Setiap 100 frame sekali, recalculate neighbors karena node berpindah (tapi sangat pelan)
			if (Math.random() < 0.01) findNeighbors();

			drawNetworkLines();

			nodes.forEach(node => {
				node.update(canvas.width, canvas.height);
				node.draw(ctx, theme === 'dark');
			});

			// Spawn new packet randomly
			if (packets.length < 8 && Math.random() < 0.05) {
				const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
				if (randomNode.neighbors.length > 0) {
					const randomNeighbor = randomNode.neighbors[Math.floor(Math.random() * randomNode.neighbors.length)];
					packets.push(new Packet(randomNode, randomNeighbor));
				}
			}

			// Update and draw packets
			for (let i = packets.length - 1; i >= 0; i--) {
				const p = packets[i];
				p.update();
				p.draw(ctx, theme === 'dark');

				if (p.progress >= 1) {
					// Kadang-kadang, ketika komet sampai, ia langsung memicu komet baru dari titik tersebut (Chain reaction)
					if (Math.random() < 0.4 && p.target.neighbors.length > 0) {
						const nextNeighbor = p.target.neighbors[Math.floor(Math.random() * p.target.neighbors.length)];
						packets.push(new Packet(p.target, nextNeighbor));
					}
					packets.splice(i, 1);
				}
			}

			animationFrameId = requestAnimationFrame(animate);
		};

		init();
		animate();

		const handleResize = () => {
			init();
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
			cancelAnimationFrame(animationFrameId);
		};
	}, [theme]);

	return (
		<canvas
			ref={canvasRef}
			className="fixed inset-0 w-full h-full pointer-events-none z-0"
			style={{ background: 'transparent' }}
		/>
	);
};
