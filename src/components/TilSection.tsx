import React from "react";
import { Terminal } from "lucide-react";
import { TextAnimation } from "../animations/TextAnimation";
import { FadeInSection } from "../animations/FadeInSection";

interface TilSectionProps {
	t: any;
	c: (light: string, dark: string) => string;
}

export const TilSection = ({ t, c }: TilSectionProps) => {
	if (!t.tilList || t.tilList.length === 0) return null;

	return (
		<FadeInSection>
			<section id="til">
				<div className="mb-10">
					<h3 className={`text-3xl font-bold mb-4 flex items-center gap-3 ${c("text-slate-900", "text-white")}`}>
						<Terminal className="text-blue-500" size={32} />
						<TextAnimation text={t.sections.til || "Today I Learned"} />
					</h3>
					<p className={`text-lg max-w-2xl ${c("text-slate-600", "text-slate-400")}`}>
						<TextAnimation text={t.tilDesc || ""} />
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{t.tilList.map((item: any, idx: number) => (
						<div key={idx} className="flex flex-col rounded-xl overflow-hidden shadow-2xl transition-transform duration-300 hover:-translate-y-2">
							{/* VSCode Window Header */}
							<div className={`px-4 py-3 flex items-center justify-between border-b ${c("bg-slate-200 border-slate-300", "bg-[#1e1e1e] border-black/50")}`}>
								<div className="flex gap-2">
									<div className="w-3 h-3 rounded-full bg-red-500/90"></div>
									<div className="w-3 h-3 rounded-full bg-yellow-500/90"></div>
									<div className="w-3 h-3 rounded-full bg-green-500/90"></div>
								</div>
								<div className={`text-xs font-mono font-medium ${c("text-slate-500", "text-slate-400")}`}>
									{item.category.toLowerCase().replace(/[\s/]+/g, '-')}.ts
								</div>
								<div className="w-10"></div> {/* Spacer for center alignment */}
							</div>

							{/* VSCode Window Body */}
							<div className={`flex-1 flex flex-col p-6 ${c("bg-slate-50", "bg-[#1e1e1e]")}`}>
								<div className="mb-4">
									<div className="flex justify-between items-center mb-2">
										<span className={`text-xs font-bold px-2 py-1 rounded-md ${c("bg-blue-100 text-blue-700", "bg-blue-900/30 text-blue-400")}`}>
											{item.category}
										</span>
										<span className={`text-xs font-medium ${c("text-slate-500", "text-slate-500")}`}>
											{item.date}
										</span>
									</div>
									<h4 className={`text-lg font-bold mb-2 ${c("text-slate-900", "text-white")}`}>
										{item.title}
									</h4>
									<p className={`text-sm leading-relaxed ${c("text-slate-600", "text-slate-400")}`}>
										{item.desc}
									</p>
								</div>

								{/* Code Snippet with Syntax Highlighting colors */}
								<div className={`mt-auto rounded-lg p-4 overflow-x-auto text-sm font-mono leading-relaxed border ${c("bg-white border-slate-200 text-slate-800", "bg-[#0d0d0d] border-[#333] text-slate-300")}`}>
									<pre>
										<code>{item.code}</code>
									</pre>
								</div>
							</div>
						</div>
					))}
				</div>
			</section>
		</FadeInSection>
	);
};
