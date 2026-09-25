import React from "react";
import { X, ExternalLink, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { TextAnimation } from "../animations/TextAnimation";

export const CertificationModal = ({ cert, isOpen, onClose, onNext, onPrev, c }: any) => {
	if (!isOpen || !cert) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12">
			<div 
				className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm transition-opacity"
				onClick={onClose}
				onContextMenu={(e) => e.preventDefault()}
			></div>

			{/* Navigation Arrows (Fixed to screen edges) */}
			{onPrev && (
				<button 
					onClick={(e) => { e.stopPropagation(); onPrev(); }}
					className={`absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-[60] p-3 md:p-4 rounded-full shadow-2xl border-2 transition-all hover:scale-110 ${c("bg-white border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-600", "bg-slate-800 border-slate-600 text-slate-300 hover:text-blue-400 hover:border-blue-400")}`}
					aria-label="Previous Certification"
				>
					<ChevronLeft size={28} strokeWidth={2.5} />
				</button>
			)}
			{onNext && (
				<button 
					onClick={(e) => { e.stopPropagation(); onNext(); }}
					className={`absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-[60] p-3 md:p-4 rounded-full shadow-2xl border-2 transition-all hover:scale-110 ${c("bg-white border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-600", "bg-slate-800 border-slate-600 text-slate-300 hover:text-blue-400 hover:border-blue-400")}`}
					aria-label="Next Certification"
				>
					<ChevronRight size={28} strokeWidth={2.5} />
				</button>
			)}
			
			<div className={`relative w-full max-w-6xl h-[95vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden transition-all transform animate-roll-in select-none ${c("bg-white border-slate-200", "bg-slate-900 border-slate-700")} border`} onContextMenu={(e) => e.preventDefault()}>
				{/* Header */}
				<div className={`flex justify-between items-center p-6 md:px-16 border-b ${c("border-slate-200", "border-slate-800")}`}>
					<div className="mr-8">
						<h3 className={`text-2xl md:text-3xl font-bold ${c("text-slate-900", "text-white")}`}>
							<TextAnimation text={cert.title} />
						</h3>
						<p className={`text-sm md:text-base mt-2 font-bold ${c("text-blue-600", "text-blue-400")}`}>
							{cert.issuer} • {cert.date}
						</p>
					</div>
					<button 
						onClick={onClose}
						className={`p-2 rounded-full transition-colors shrink-0 ${c("hover:bg-slate-100 text-slate-500", "hover:bg-slate-800 text-slate-400")}`}
						aria-label="Close modal"
					>
						<X size={24} />
					</button>
				</div>

				{/* Content */}
				<div className="flex-1 overflow-hidden p-6 md:p-12 flex flex-col md:flex-row gap-8">
					<div className="w-full md:w-1/3 flex flex-col overflow-y-auto pr-2">
						<h4 className={`text-lg font-bold mb-3 ${c("text-slate-800", "text-slate-200")}`}>Description</h4>
						<p className={`leading-relaxed mb-6 text-base md:text-lg ${c("text-slate-600", "text-slate-300")}`}>
							<TextAnimation text={cert.desc} />
						</p>

						{cert.credentialId && (
							<div className="mb-6">
								<span className={`text-sm font-bold uppercase tracking-wider ${c("text-slate-500", "text-slate-400")}`}>Credential ID</span>
								<p className={`font-medium mt-1 text-base md:text-lg ${c("text-slate-800", "text-slate-200")}`}>{cert.credentialId}</p>
							</div>
						)}
					</div>

					{/* File Preview (Protected & Scrollable) */}
					{cert.file && (
						<div className={`relative w-full md:w-2/3 h-full overflow-y-auto rounded-2xl border ${c("bg-slate-100 border-slate-200", "bg-slate-800 border-slate-700")}`}>
							{cert.file.endsWith('.pdf') ? (
								<div className="relative w-full min-h-[1000px]" style={{ aspectRatio: "1 / 1.414" }}>
									<iframe 
										src={`${cert.file}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`} 
										className="absolute inset-0 w-full h-full pointer-events-none"
										title={cert.title}
									></iframe>
									{/* Overlay transparan untuk memblokir klik kanan dan interaksi pointer pada PDF */}
									<div className="absolute inset-0 z-10 bg-transparent"></div>
								</div>
							) : (
								<div className="relative w-full h-full">
									<img 
										src={cert.file} 
										alt={cert.title}
										className="w-full h-auto object-contain p-2 pointer-events-none"
									/>
									{/* Overlay transparan untuk gambar */}
									<div className="absolute inset-0 z-10 bg-transparent"></div>
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
