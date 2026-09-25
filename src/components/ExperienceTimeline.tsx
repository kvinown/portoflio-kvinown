import React, { useRef, useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { TextAnimation } from "../animations/TextAnimation";

interface TimelineProps {
	items: any[];
	title: string;
	icon: React.ReactNode;
	c: (light: string, dark: string) => string;
}

export const ExperienceTimeline = ({ items, title, icon, c }: TimelineProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [progress, setProgress] = useState(0);
	const [activeNodes, setActiveNodes] = useState<number[]>([]);

	useEffect(() => {
		const handleScroll = () => {
			if (!containerRef.current) return;
			const rect = containerRef.current.getBoundingClientRect();
			const windowHeight = window.innerHeight;
			
			// We want the glow to start when the top of the timeline hits the middle of the screen
			// And finish when the bottom of the timeline hits the middle of the screen
			const triggerPoint = windowHeight / 1.5; 
			
			const distance = triggerPoint - rect.top;
			const percentage = (distance / rect.height) * 100;
			const clampedPercentage = Math.max(0, Math.min(100, percentage));
			
			setProgress(clampedPercentage);

			// Determine which nodes are active based on the height
			const newActiveNodes = items.map((_, idx) => {
				// Rough estimation: if the progress line passed this item's relative position
				const nodePosition = (idx / items.length) * 100; 
				return clampedPercentage >= nodePosition ? idx : -1;
			}).filter(n => n !== -1);
			
			setActiveNodes(newActiveNodes);
		};

		window.addEventListener("scroll", handleScroll);
		handleScroll(); // Initial check
		
		return () => window.removeEventListener("scroll", handleScroll);
	}, [items.length]);

	return (
		<div>
			<h3 className={`text-2xl font-bold mb-10 flex items-center gap-3 ${c("text-slate-900", "text-white")}`}>
				{icon} <TextAnimation text={title} />
			</h3>
			
			<div className="relative pl-8 md:pl-10 ml-3" ref={containerRef}>
				{/* Garis Dasar (Track) */}
				<div className={`absolute left-0 top-0 bottom-0 w-1 rounded-full ${c("bg-slate-200", "bg-slate-800")}`} />
				
				{/* Garis Glowing (Progress) */}
				<div 
					className="absolute left-0 top-0 w-1 bg-blue-500 rounded-full transition-all duration-300 shadow-[0_0_15px_3px_rgba(59,130,246,0.6)]"
					style={{ height: `${progress}%` }}
				/>

				<div className="space-y-12">
					{items.map((exp: any, idx: number) => {
						const isActive = activeNodes.includes(idx);
						return (
							<div key={idx} className="relative group">
								{/* Node / Titik */}
								<div 
									className={`absolute -left-[37px] md:-left-[45px] top-1 w-4 h-4 rounded-full border-2 transition-all duration-500 z-10 ${
										isActive 
										? "bg-blue-500 border-white shadow-[0_0_15px_#3b82f6] scale-125" 
										: c("bg-slate-300 border-white scale-100", "bg-slate-700 border-slate-900 scale-100")
									}`} 
								/>

								<div className={`p-6 rounded-2xl border transition-all duration-500 ${
									isActive 
									? c("bg-white border-blue-400 shadow-xl shadow-blue-500/10 -translate-y-1", "bg-slate-800/90 border-blue-500/50 shadow-xl shadow-blue-900/30 -translate-y-1") 
									: c("bg-slate-50/50 border-slate-200 opacity-70", "bg-slate-800/40 border-slate-700 opacity-60")
								}`}>
									<span className={`text-sm font-bold mb-1 block transition-colors duration-300 ${isActive ? "text-blue-500" : c("text-slate-500", "text-slate-500")}`}>
										{exp.period}
									</span>
									<h4 className={`text-xl font-bold mb-1 transition-colors duration-300 ${isActive ? c("text-slate-900", "text-white") : c("text-slate-700", "text-slate-400")}`}>
										<TextAnimation text={exp.role} />
									</h4>
									<p className={`font-medium mb-4 ${c("text-slate-600", "text-slate-400")}`}>{exp.place}</p>
									<ul className="space-y-2">
										{exp.points.map((point: string, pIdx: number) => (
											<li
												key={pIdx}
												className={`flex items-start gap-2 text-sm leading-relaxed ${c("text-slate-600", "text-slate-300")}`}>
												<ChevronRight
													size={16}
													className={`shrink-0 mt-0.5 transition-colors duration-300 ${isActive ? "text-blue-500" : c("text-slate-400", "text-slate-600")}`}
												/>
												<span>
													<TextAnimation text={point} />
												</span>
											</li>
										))}
									</ul>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};
