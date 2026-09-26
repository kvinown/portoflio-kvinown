import React, { useState, useEffect, useRef } from "react";
import { Terminal as TerminalIcon, X } from "lucide-react";

interface TerminalModeProps {
	setIsCliMode: (val: boolean) => void;
	portofolioData: any;
	lang: "id" | "en";
}

// Komponen untuk merender baris demi baris secara berurutan
const SequentialLines = ({ 
	lines, 
	delay = 50, 
	onComplete, 
	onUpdate 
}: { 
	lines: React.ReactNode[], 
	delay?: number, 
	onComplete: () => void,
	onUpdate: () => void 
}) => {
	const [visibleCount, setVisibleCount] = useState(0);

	useEffect(() => {
		if (visibleCount < lines.length) {
			const timer = setTimeout(() => {
				setVisibleCount(prev => prev + 1);
			}, delay);
			return () => clearTimeout(timer);
		} else {
			onComplete();
		}
	}, [visibleCount, lines.length, delay, onComplete]);

	useEffect(() => {
		onUpdate();
	}, [visibleCount, onUpdate]);

	return (
		<div className="mb-4 mt-1">
			{lines.slice(0, visibleCount).map((line, i) => (
				<div key={i}>{line}</div>
			))}
			{/* Kursor berkedip saat sedang mengeksekusi */}
			{visibleCount < lines.length && (
				<span className="animate-pulse bg-slate-100 w-2 h-4 inline-block ml-1 align-middle"></span>
			)}
		</div>
	);
};

export const TerminalMode: React.FC<TerminalModeProps> = ({ setIsCliMode, portofolioData, lang }) => {
	const t = portofolioData[lang];
	const [cwd, setCwd] = useState("C:\\Software\\Engineer\\kvinown");
	
	const asciiArt = `
  _  ____      _______ _   _  ______          ___   _ 
 | |/ /\\ \\    / /_   _| \\ | |/ __ \\ \\        / / \\ | |
 | ' /  \\ \\  / /  | | |  \\| | |  | \\ \\  /\\  / /|  \\| |
 |  <    \\ \\/ /   | | | . \` | |  | |\\ \\/  \\/ / | . \` |
 | . \\    \\  /   _| |_| |\\  | |__| | \\  /\\  /  | |\\  |
 |_|\\_\\    \\/   |_____|_| \\_|\\____/   \\/  \\/   |_| \\_|
`;

	// History menyimpan node statis yang sudah selesai dirender
	const [history, setHistory] = useState<React.ReactNode[]>([
		<div key="welcome" className="mb-4">
			<pre className="text-blue-400 text-xs sm:text-sm font-bold mb-4">{asciiArt}</pre>
			<span>Windows PowerShell</span><br/>
			<span>Copyright (C) Microsoft Corporation. All rights reserved.</span><br/><br/>
			<span className="text-slate-400">Try the new cross-platform PowerShell https://aka.ms/pscore6</span><br/><br/>
			<span>Type 'help' to see available commands.</span>
		</div>
	]);
	
	const [input, setInput] = useState("");
	
	// State untuk perintah yang SEDANG dieksekusi saat ini
	const [isExecuting, setIsExecuting] = useState(false);
	const [currentLines, setCurrentLines] = useState<React.ReactNode[]>([]);
	const [currentDelay, setCurrentDelay] = useState(50);
	
	// State AI Mode
	const [isAiMode, setIsAiMode] = useState(false);
	const [isFetchingAI, setIsFetchingAI] = useState(false);
	const [aiHistory, setAiHistory] = useState<{role: string, text: string}[]>([]);
	
	// History array for UP/DOWN arrows
	const [cmdHistory, setCmdHistory] = useState<string[]>([]);
	const [historyIndex, setHistoryIndex] = useState<number>(-1);

	const inputRef = useRef<HTMLInputElement>(null);
	const endRef = useRef<HTMLDivElement>(null);

	const projectFiles = t.projects.map((p: any) => p.title.toLowerCase().replace(/[\s&]+/g, '-') + ".md");
	
	const getAvailableFiles = () => {
		if (cwd === "C:\\Portofolio\\kvinown") {
			return ["skills.txt", "contact.txt", "about.md", "experience.txt", "education.txt", "resume.pdf", "projects"];
		} else if (cwd === "C:\\Portofolio\\kvinown\\projects") {
			return projectFiles;
		}
		return [];
	};

	const scrollToBottom = () => {
		endRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
		if (!isExecuting && !isFetchingAI) {
			inputRef.current?.focus();
		}
	}, [history, isExecuting, isFetchingAI]);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "ArrowUp") {
			e.preventDefault();
			if (cmdHistory.length > 0) {
				const nextIndex = historyIndex + 1;
				if (nextIndex < cmdHistory.length) {
					setHistoryIndex(nextIndex);
					setInput(cmdHistory[cmdHistory.length - 1 - nextIndex]);
				}
			}
		} else if (e.key === "ArrowDown") {
			e.preventDefault();
			if (historyIndex > 0) {
				const prevIndex = historyIndex - 1;
				setHistoryIndex(prevIndex);
				setInput(cmdHistory[cmdHistory.length - 1 - prevIndex]);
			} else if (historyIndex === 0) {
				setHistoryIndex(-1);
				setInput("");
			}
		} else if (e.key === "Tab") {
			e.preventDefault();
			const words = input.split(" ");
			const lastWord = words[words.length - 1];
			if (lastWord) {
				const files = getAvailableFiles();
				const match = files.find(f => f.toLowerCase().startsWith(lastWord.toLowerCase()));
				if (match) {
					words[words.length - 1] = match;
					setInput(words.join(" "));
				}
			}
		}
	};

	const handleCommand = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!input.trim() || isExecuting || isFetchingAI) return;

		const rawCmd = input.trim();
		const cmd = rawCmd.toLowerCase();
		let outputLines: React.ReactNode[] = [];
		let delay = 30; // Default typing speed

		// Add to command history
		setCmdHistory(prev => [...prev, rawCmd]);
		setHistoryIndex(-1);

		// Record the user input immediately to history
		setHistory(prev => [
			...prev,
			<div key={prev.length + "_cmd"}>
				{isAiMode ? <span className="text-purple-400 font-bold">KvinBot&gt;</span> : <span className="text-slate-300">PS {cwd}&gt;</span>} {input}
			</div>
		]);

		if (isAiMode) {
			if (cmd === "exit" || cmd === "stop" || cmd === "quit") {
				setIsAiMode(false);
				setHistory(prev => [
					...prev,
					<div key={prev.length + "_out"} className="text-yellow-400 mb-4 mt-1">
						Shutting down KvinBot AI...<br/>
						Returned to Windows PowerShell.
					</div>
				]);
				setInput("");
				return;
			}

			setIsFetchingAI(true);
			setInput("");
			
			try {
				const response = await fetch("/.netlify/functions/chat", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ message: rawCmd, history: aiHistory.slice(-5) })
				});
				
				const data = await response.json();
				if (!response.ok) throw new Error(data.error || "Gagal menghubungi server");
				
				// Update AI History
				setAiHistory(prev => [
					...prev, 
					{ role: "user", text: rawCmd },
					{ role: "model", text: data.reply }
				]);

				// Split AI response by newlines to render sequentially
				const lines = data.reply.split("\n");
				const renderedLines = lines.map((l: string, idx: number) => <span key={idx} className={l.startsWith("-") || l.startsWith("*") || /^\d+\./.test(l) ? "text-slate-300 ml-4 block" : "text-slate-200 block"}>{l}</span>);
				
				setIsFetchingAI(false);
				setIsExecuting(true);
				setCurrentLines(renderedLines);
				setCurrentDelay(30);
			} catch (error: any) {
				setIsFetchingAI(false);
				setIsExecuting(true);
				setCurrentLines([<span className="text-red-400">Error: {error.message || "Gagal menghubungi server"}</span>]);
				setCurrentDelay(10);
			}
			return; // Selesai untuk AI mode
		}

		const args = rawCmd.split(" ");
		const baseCmd = args[0].toLowerCase();
		const arg1 = args[1] ? args[1].toLowerCase() : "";

		switch (baseCmd) {
			case "help":
				outputLines = [
					<div>Available commands:</div>,
					<div className="ml-4 mt-1"><span className="text-yellow-400">whoami</span> - Display current user profile</div>,
					<div className="ml-4"><span className="text-yellow-400">dir / ls</span> - List files and directories</div>,
					<div className="ml-4"><span className="text-yellow-400">cd [dir]</span> - Change directory</div>,
					<div className="ml-4"><span className="text-yellow-400">type / cat [file]</span> - Read file contents</div>,
					<div className="ml-4"><span className="text-yellow-400">start [arg]</span> - Open file/link, or start programs (e.g. start resume, start github, start kvinbot)</div>,
					<div className="ml-4"><span className="text-yellow-400">date</span> - Show current date and time</div>,
					<div className="ml-4"><span className="text-yellow-400">cls / clear</span> - Clear terminal output</div>,
					<div className="ml-4"><span className="text-yellow-400">ping</span> - Test connection to backend</div>,
					<div className="ml-4"><span className="text-yellow-400">exit</span> - Return to GUI mode</div>
				];
				break;
			case "whoami":
				outputLines = [
					<pre className="text-blue-400 text-xs sm:text-sm font-bold mb-4">{asciiArt}</pre>,
					<span>desktop-kvinown\kevin</span>,
					<br/>,
					<span className="text-yellow-400 text-lg font-bold">Kevin Owen</span>,
					<span className="text-blue-300">{t.hero.role}</span>,
					<span className="text-slate-300">{t.hero.desc}</span>
				];
				delay = 80;
				break;
			case "date":
				outputLines = [
					<span>{new Date().toString()}</span>
				];
				break;
			case "ping":
				outputLines = [
					<span>Pinging backend.kvinown.com [192.168.1.100] with 32 bytes of data:</span>,
					<span>Reply from 192.168.1.100: bytes=32 time=12ms TTL=54</span>,
					<span>Reply from 192.168.1.100: bytes=32 time=15ms TTL=54</span>,
					<span>Reply from 192.168.1.100: bytes=32 time=11ms TTL=54</span>,
					<span>Reply from 192.168.1.100: bytes=32 time=14ms TTL=54</span>,
					<br/>,
					<span>Ping statistics for 192.168.1.100:</span>,
					<span>&nbsp;&nbsp;&nbsp;&nbsp;Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),</span>,
					<span>Approximate round trip times in milli-seconds:</span>,
					<span>&nbsp;&nbsp;&nbsp;&nbsp;Minimum = 11ms, Maximum = 15ms, Average = 13ms</span>
				];
				delay = 600; // Slow realistic ping
				break;
			case "cd":
				if (arg1 === "projects") {
					if (cwd === "C:\\Portofolio\\kvinown") {
						setCwd("C:\\Portofolio\\kvinown\\projects");
						outputLines = []; // cd typically returns nothing on success
					} else {
						outputLines = [<span className="text-red-400">cd: projects: No such file or directory</span>];
					}
				} else if (arg1 === ".." || arg1 === "../" || arg1 === "cd..") {
					setCwd("C:\\Portofolio\\kvinown");
					outputLines = [];
				} else if (arg1 === "~" || arg1 === "") {
					setCwd("C:\\Portofolio\\kvinown");
					outputLines = [];
				} else {
					outputLines = [<span className="text-red-400">cd: Cannot find path '{arg1}' because it does not exist.</span>];
				}
				delay = 0; // Immediate
				break;
			case "dir":
			case "ls":
				delay = 30;
				if (cwd === "C:\\Portofolio\\kvinown") {
					outputLines = [
						<span><br/>    Directory: {cwd}<br/><br/></span>,
						<div className="flex border-b border-slate-600 pb-1 mb-1 max-w-2xl">
							<span className="w-1/4">Mode</span>
							<span className="w-1/4">LastWriteTime</span>
							<span className="w-1/4 text-right">Length</span>
							<span className="w-1/4 pl-4">Name</span>
						</div>,
						<div className="flex max-w-2xl">
							<span className="w-1/4">d-----</span><span className="w-1/4">{new Date().toLocaleDateString()}</span><span className="w-1/4 text-right"></span><span className="w-1/4 pl-4 text-blue-400 font-bold">projects</span>
						</div>,
						<div className="flex max-w-2xl">
							<span className="w-1/4">-a----</span><span className="w-1/4">{new Date().toLocaleDateString()}</span><span className="w-1/4 text-right">402</span><span className="w-1/4 pl-4 text-slate-100">about.md</span>
						</div>,
						<div className="flex max-w-2xl">
							<span className="w-1/4">-a----</span><span className="w-1/4">{new Date().toLocaleDateString()}</span><span className="w-1/4 text-right">158</span><span className="w-1/4 pl-4 text-slate-100">contact.txt</span>
						</div>,
						<div className="flex max-w-2xl">
							<span className="w-1/4">-a----</span><span className="w-1/4">{new Date().toLocaleDateString()}</span><span className="w-1/4 text-right">512</span><span className="w-1/4 pl-4 text-slate-100">education.txt</span>
						</div>,
						<div className="flex max-w-2xl">
							<span className="w-1/4">-a----</span><span className="w-1/4">{new Date().toLocaleDateString()}</span><span className="w-1/4 text-right">1024</span><span className="w-1/4 pl-4 text-slate-100">experience.txt</span>
						</div>,
						<div className="flex max-w-2xl">
							<span className="w-1/4">-a----</span><span className="w-1/4">{new Date().toLocaleDateString()}</span><span className="w-1/4 text-right">0</span><span className="w-1/4 pl-4 text-slate-100">resume.pdf</span>
						</div>,
						<div className="flex max-w-2xl">
							<span className="w-1/4">-a----</span><span className="w-1/4">{new Date().toLocaleDateString()}</span><span className="w-1/4 text-right">845</span><span className="w-1/4 pl-4 text-slate-100">skills.txt</span>
						</div>
					];
				} else if (cwd === "C:\\Portofolio\\kvinown\\projects") {
					outputLines = [
						<span><br/>    Directory: {cwd}<br/><br/></span>,
						<div className="flex border-b border-slate-600 pb-1 mb-1 max-w-2xl">
							<span className="w-1/4">Mode</span>
							<span className="w-1/4">LastWriteTime</span>
							<span className="w-1/4 text-right">Length</span>
							<span className="w-1/4 pl-4">Name</span>
						</div>,
						...projectFiles.map((pf: string) => (
							<div className="flex max-w-2xl">
								<span className="w-1/4">-a----</span>
								<span className="w-1/4">{new Date().toLocaleDateString()}</span>
								<span className="w-1/4 text-right">{Math.floor(Math.random() * 5000) + 1000}</span>
								<span className="w-1/4 pl-4 text-slate-100">{pf}</span>
							</div>
						))
					];
				}
				break;
			case "type":
			case "cat":
				delay = 50;
				const file = args[1];
				if (!file) {
					outputLines = [<span className="text-red-400">type: missing file operand.</span>];
					break;
				}

				if (cwd === "C:\\Portofolio\\kvinown") {
					if (file.toLowerCase() === "skills.txt") {
						outputLines = portofolioData.skills.flatMap((skill: any) => [
							<span className="text-green-400 mt-2 block"># {skill.title}</span>,
							<span className="text-slate-200">[{skill.items.join(", ")}]</span>
						]);
					} else if (file.toLowerCase() === "contact.txt") {
						outputLines = [
							<span>Email: <a href={`mailto:${portofolioData.contacts.email}`} className="text-blue-300 hover:underline">{portofolioData.contacts.email}</a></span>,
							<span>WhatsApp: {portofolioData.contacts.phoneDisplay}</span>,
							<span>GitHub: <a href={portofolioData.contacts.github} target="_blank" rel="noreferrer" className="text-blue-300 hover:underline">{portofolioData.contacts.github}</a></span>
						];
					} else if (file.toLowerCase() === "about.md") {
						outputLines = [
							<span className="text-blue-300 font-bold"># {t.bento.focusTitle}</span>,
							<br />,
							<span className="text-slate-300">{t.bento.focusDesc}</span>
						];
					} else if (file.toLowerCase() === "resume.pdf") {
						outputLines = [
							<span className="text-red-400">Cannot view binary file 'resume.pdf'. Use 'start resume.pdf' to open it.</span>
						];
					} else if (file.toLowerCase() === "experience.txt") {
						outputLines = [
							<span className="text-yellow-400 font-bold">--- WORK EXPERIENCE ---</span>,
							<br/>,
							...t.experience.work.flatMap((exp: any) => [
								<span><span className="text-green-400 font-bold">{exp.role}</span> @ {exp.place}</span>,
								<span className="text-slate-400">[{exp.period}]</span>,
								...exp.points.map((p: string) => <span className="text-slate-300">  - {p}</span>),
								<br/>
							])
						];
						delay = 80;
					} else if (file.toLowerCase() === "education.txt") {
						outputLines = t.education.flatMap((edu: any) => [
							<span className="text-green-400 font-bold">{edu.degree}</span>,
							<span><span className="text-white">{edu.school}</span> <span className="text-slate-400">[{edu.period}]</span></span>,
							<span className="text-slate-300">{edu.desc}</span>,
							<span className="text-yellow-300">GPA: {edu.gpa} / 4.00</span>,
							<br/>
						]);
					} else {
						outputLines = [<span className="text-red-400">type: Cannot find path '{cwd}\{file}' because it does not exist.</span>];
					}
				} else if (cwd === "C:\\Portofolio\\kvinown\\projects") {
					const matchedProject = t.projects.find((p: any) => (p.title.toLowerCase().replace(/[\s&]+/g, '-') + ".md") === file.toLowerCase());
					
					if (matchedProject) {
						outputLines = [
							<span className="text-blue-400 font-bold text-lg"># {matchedProject.title}</span>,
							<span className="text-slate-400">{matchedProject.category}</span>,
							<br/>,
							<span className="text-yellow-400 font-bold">## THE CHALLENGE</span>,
							<span className="text-slate-300">{matchedProject.desc.split("||")[0]}</span>,
							<br/>,
							<span className="text-green-400 font-bold">## THE SOLUTION</span>,
							<span className="text-slate-300">{matchedProject.desc.split("||")[1]}</span>,
							<br/>,
							<span className="text-blue-300 font-bold">## THE IMPACT</span>,
							<span className="text-slate-300">{matchedProject.desc.split("||")[2]}</span>,
							<br/>,
							<span className="text-purple-400 font-bold">## TECH STACK</span>,
							<span className="text-slate-300">[{matchedProject.tech.join(", ")}]</span>,
						];
						delay = 100;
					} else {
						outputLines = [<span className="text-red-400">type: Cannot find path '{cwd}\{file}' because it does not exist.</span>];
					}
				}
				break;
			case "clear":
			case "cls":
				setHistory([]);
				setInput("");
				return;
			case "exit":
				setIsCliMode(false);
				return;
			case "sudo":
				outputLines = [<span className="text-red-400">sudo : The term 'sudo' is not recognized as the name of a cmdlet.</span>];
				break;
			case "start":
				if (arg1.includes("resume") || arg1.includes("cv")) {
					outputLines = [<span className="text-green-400">Opening {portofolioData.contacts.cvFileName} in default PDF viewer...</span>];
					setTimeout(() => {
						window.open(`/${encodeURIComponent(portofolioData.contacts.cvFileName)}`, "_blank");
					}, 500);
				} else if (arg1 === "github") {
					outputLines = [<span className="text-green-400">Opening GitHub profile...</span>];
					setTimeout(() => {
						window.open(portofolioData.contacts.github, "_blank");
					}, 500);
				} else if (arg1 === "linkedin") {
					outputLines = [<span className="text-green-400">Opening LinkedIn profile...</span>];
					setTimeout(() => {
						window.open(portofolioData.contacts.linkedin, "_blank");
					}, 500);
				} else if (arg1 === "email") {
					outputLines = [<span className="text-green-400">Opening Email client...</span>];
					setTimeout(() => {
						window.open(`mailto:${portofolioData.contacts.email}`, "_blank");
					}, 500);
				} else if (arg1 === "kvinbot") {
					setIsAiMode(true);
					setAiHistory([]); // Reset history on new boot
					outputLines = [
						<span className="text-blue-400 font-bold block mb-1">Initializing KvinBot AI Engine v1.0.0...</span>,
						<span className="text-slate-300 block">Loading portfolio datasets... <span className="text-green-400">[OK]</span></span>,
						<span className="text-slate-300 block">Injecting context vectors... <span className="text-green-400">[OK]</span></span>,
						<span className="text-slate-300 block">Establishing secure LLM uplink... <span className="text-green-400">[OK]</span></span>,
						<span className="text-purple-400 font-bold mt-2 block border-t border-purple-800 pt-2">KvinBot is now active. You are in interactive AI mode.</span>,
						<span className="text-slate-400 block mb-2">Type your questions below. Type 'exit' to stop KvinBot.</span>
					];
					delay = 600; // Boot sequence speed
				} else {
					outputLines = [<span className="text-red-400">start : Cannot find program or file '{arg1}'. Try 'start kvinbot', 'start resume', 'start github'.</span>];
				}
				break;
			default:
				outputLines = [<span className="text-red-400">{baseCmd} : The term '{baseCmd}' is not recognized as the name of a cmdlet, function, script file, or operable program.</span>];
				break;
		}

		if (outputLines.length > 0) {
			setIsExecuting(true);
			setCurrentLines(outputLines);
			setCurrentDelay(delay);
		} else {
			// Jika output kosong (misal sukses CD)
			setHistory(prev => [
				...prev,
				<div key={prev.length + "_out"} className="mb-4 mt-1"></div>
			]);
		}
		setInput("");
	};

	const handleExecutionComplete = () => {
		setIsExecuting(false);
		// Push the fully rendered lines to permanent static history
		setHistory(prev => [
			...prev,
			<div key={prev.length + "_out"} className="mb-4 mt-1">
				{currentLines.map((line, i) => <div key={i}>{line}</div>)}
			</div>
		]);
		setCurrentLines([]);
	};

	return (
		<div 
			className="fixed inset-0 bg-[#0c0c0c] text-slate-100 font-mono text-[15px] z-[100] overflow-y-auto p-4 md:p-8 selection:bg-slate-300 selection:text-black"
			onClick={() => !isExecuting && inputRef.current?.focus()}
		>
			{/* Top Bar for Exit */}
			<div className="fixed top-4 right-4 z-50">
				<button 
					onClick={() => setIsCliMode(false)}
					className="flex items-center gap-2 bg-slate-900/80 hover:bg-red-500/80 border border-slate-700 text-white px-4 py-2 rounded-sm transition-colors"
				>
					<X size={16} /> Exit Terminal
				</button>
			</div>

			<div className="max-w-5xl mx-auto w-full pb-20 mt-10 md:mt-0">
				{/* Static History */}
				<div>
					{history.map((item) => item)}
				</div>

				{/* Show AI Fetching State */}
				{isFetchingAI && (
					<div className="mb-4 mt-1">
						<span className="text-purple-400">KvinBot is thinking</span>
						<span className="text-purple-400 animate-pulse">...</span>
					</div>
				)}

				{/* Currently Executing Command Output */}
				{isExecuting && (
					<SequentialLines 
						lines={currentLines} 
						delay={currentDelay} 
						onComplete={handleExecutionComplete}
						onUpdate={scrollToBottom}
					/>
				)}

				{/* Input Line (Hidden while executing) */}
				{!isExecuting && !isFetchingAI && (
					<form onSubmit={handleCommand} className="flex items-center mt-1">
						<span className="shrink-0 mr-2">
							{isAiMode ? (
								<span className="text-purple-400 font-bold">KvinBot&gt;</span>
							) : (
								<span className="text-slate-300">PS {cwd}&gt;</span>
							)}
						</span>
						<input
							ref={inputRef}
							type="text"
							value={input}
							onChange={(e) => setInput(e.target.value)}
							onKeyDown={handleKeyDown}
							className="flex-1 bg-transparent outline-none border-none text-slate-100 caret-white"
							autoFocus
							autoComplete="off"
							spellCheck="false"
						/>
					</form>
				)}
				<div ref={endRef} />
			</div>
		</div>
	);
};
