import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Bot, User, Loader2 } from "lucide-react";

interface Message {
	role: "user" | "model";
	text: string;
}

export const ChatWidget: React.FC<{ c: (l: string, d: string) => string }> = ({ c }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [messages, setMessages] = useState<Message[]>([
		{ role: "model", text: "Halo! Saya KvinBot, asisten virtual Kevin Owen. Ada yang ingin Anda ketahui tentang portofolio atau pengalaman kerja Kevin?" }
	]);
	const [input, setInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages, isLoading, isOpen]);

	const handleSend = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!input.trim() || isLoading) return;

		const userText = input.trim();
		setInput("");
		
		// Add user message to UI immediately
		const newMessages: Message[] = [...messages, { role: "user", text: userText }];
		setMessages(newMessages);
		setIsLoading(true);

		try {
			// Call Netlify Function API
			// Gunakan relative path. Saat development bisa dikonfigurasi via proxy vite, 
			// atau full URL jika butuh, tapi standar netlify functions adalah /.netlify/functions/chat
			const response = await fetch("/.netlify/functions/chat", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ 
					message: userText,
					// Kirim 5 pesan terakhir sebagai context history agar tidak terlalu besar
					history: newMessages.slice(-5, -1).map(m => ({ role: m.role, text: m.text }))
				})
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Gagal menghubungi server");
			}

			setMessages([...newMessages, { role: "model", text: data.reply }]);
		} catch (error: any) {
			console.error("Chat error:", error);
			setMessages([
				...newMessages, 
				{ role: "model", text: "Maaf, terjadi kesalahan atau API Key belum dikonfigurasi. Silakan coba lagi nanti." }
			]);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			{/* Floating Button */}
			<button
				onClick={() => setIsOpen(true)}
				className={`fixed bottom-6 right-6 p-4 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.2)] z-40 transition-all duration-300 hover:scale-110 flex items-center justify-center ${
					isOpen ? "scale-0 opacity-0 pointer-events-none" : "scale-100 opacity-100"
				} bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-[0_8px_30px_rgb(79,70,229,0.4)] hover:-translate-y-1`}
				aria-label="Open Chat"
			>
				<MessageSquare size={24} />
				<span className="absolute -top-1 -right-1 flex h-3 w-3">
					<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
					<span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
				</span>
			</button>

			{/* Chat Window */}
			<div
				className={`fixed bottom-6 right-6 w-[340px] sm:w-[400px] h-[550px] max-h-[85vh] flex flex-col rounded-2xl shadow-[0_20px_50px_rgb(0,0,0,0.3)] z-50 transition-all duration-300 origin-bottom-right overflow-hidden border backdrop-blur-xl ${
					isOpen ? "scale-100 opacity-100 translate-y-0" : "scale-50 opacity-0 pointer-events-none translate-y-10"
				} ${c("bg-white/90 border-white/50", "bg-slate-900/90 border-slate-700/50")}`}
			>
				{/* Header */}
				<div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md relative overflow-hidden">
					<div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
					<div className="flex items-center gap-3 relative z-10">
						<div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm border border-white/20 shadow-inner">
							<Bot size={22} className="text-white drop-shadow-md" />
						</div>
						<div>
							<h3 className="font-bold text-base flex items-center gap-2">KvinBot <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,1)]"></span></h3>
							<p className="text-xs text-blue-100 font-medium tracking-wide">AI Portfolio Assistant</p>
						</div>
					</div>
					<button 
						onClick={() => setIsOpen(false)}
						className="p-1.5 hover:bg-white/20 rounded-lg transition-colors relative z-10"
					>
						<X size={20} />
					</button>
				</div>

				{/* Messages Area */}
				<div className={`flex-1 overflow-y-auto p-5 flex flex-col gap-5 ${c("bg-slate-50/50", "bg-slate-900/50")}`}>
					{messages.map((msg, idx) => (
						<div 
							key={idx} 
							className={`flex gap-3 max-w-[88%] ${msg.role === "user" ? "self-end flex-row-reverse" : "self-start"}`}
						>
							<div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-sm border ${
								msg.role === "user" 
									? "bg-slate-100 text-slate-600 border-slate-200" 
									: "bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700 border-blue-200"
							}`}>
								{msg.role === "user" ? <User size={16} /> : <Bot size={16} />}
							</div>
							<div className={`px-4 py-2.5 rounded-2xl text-[14.5px] leading-relaxed whitespace-pre-wrap shadow-sm ${
								msg.role === "user" 
									? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-tr-sm" 
									: c("bg-white text-slate-700 border border-slate-100 rounded-tl-sm", "bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-sm")
							}`}>
								{msg.text}
							</div>
						</div>
					))}
					{isLoading && (
						<div className="flex gap-3 max-w-[85%] self-start">
							<div className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700 flex items-center justify-center shadow-sm border border-blue-200">
								<Bot size={16} />
							</div>
							<div className={`px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm border ${c("bg-white border-slate-100", "bg-slate-800 border-slate-700")} flex items-center gap-2`}>
								<span className="flex gap-1">
									<span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0ms' }}></span>
									<span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '150ms' }}></span>
									<span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '300ms' }}></span>
								</span>
							</div>
						</div>
					)}
					<div ref={messagesEndRef} />
				</div>

				{/* Input Area */}
				<form onSubmit={handleSend} className={`p-4 border-t ${c("border-slate-200/50 bg-white/80", "border-slate-700/50 bg-slate-900/80")} backdrop-blur-md flex gap-3`}>
					<input
						type="text"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						placeholder="Tanya seputar Kevin..."
						className={`flex-1 px-4 py-2.5 text-[15px] rounded-xl outline-none transition-all shadow-inner focus:ring-2 focus:ring-blue-500/50 ${
							c("bg-slate-100 border-transparent text-slate-800 placeholder:text-slate-400", "bg-slate-800 border-transparent text-white placeholder:text-slate-500")
						}`}
						disabled={isLoading}
					/>
					<button
						type="submit"
						disabled={isLoading || !input.trim()}
						className="w-11 h-11 shrink-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl flex items-center justify-center hover:shadow-[0_4px_15px_rgb(79,70,229,0.4)] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
					>
						<Send size={18} className={input.trim() ? "translate-x-0.5 -translate-y-0.5" : ""} />
					</button>
				</form>
			</div>
		</>
	);
};
