export const portofolioData = {
	contacts: {
		phoneWa: "6281318587942",
		phoneDisplay: "(+62) 813-1858-7942",
		email: "kvinown@gmail.com",
		instagram: "https://instagram.com/kvinown",
		github: "https://github.com/kvinown",
		linkedin: "https://linkedin.com/in/kvinown",
		web: "https://kvinown.netlify.app",
		cvFileName: "Resume CV Kevin Owen (1).pdf",
	},
	skills: [
		{ id: 1, icon: "server", title: "Programming Languages", items: ["PHP", "TypeScript", "Python", "Kotlin", "JavaScript"] },
		{ id: 2, icon: "layout", title: "Web Development", items: ["Laravel", "Node.js", "React.js", "Vue", "Django"] },
		{ id: 3, icon: "smartphone", title: "Mobile Development", items: ["Flutter", "Jetpack Compose"] },
		{ id: 4, icon: "database", title: "Database & Cloud", items: ["MySQL", "Firebase"] },
		{ id: 5, icon: "wrench", title: "Tools & Version Control", items: ["Git/GitHub", "Postman", "Google Workspace"] },
	],
	id: {
		nav: { exp: "Pengalaman", proj: "Proyek", skills: "Keahlian", contact: "Kontak" },
		hero: {
			role: "Fullstack Developer | Backend Specialist",
			desc: "Lulusan Teknik Informatika dengan fondasi kuat dalam Fullstack Development, berspesialisasi pada sistem Backend. Berpengalaman mengembangkan aplikasi web yang terukur, kode yang terstruktur, dan manajemen basis data yang efisien. Memiliki kemampuan analitis dan problem-solving yang kuat, serta terbukti mampu berkolaborasi efektif dalam tim untuk mencapai tujuan proyek.",
			btnEmail: "Email Saya",
			btnWa: "WhatsApp",
			btnDownload: "Unduh CV",
		},
		sections: { skills: "Keahlian Teknis", expWork: "Pengalaman Kerja", expOrg: "Pengalaman Organisasi", proj: "Proyek (Tugas Akhir)", edu: "Pendidikan", contact: "Mari Berkolaborasi" },
		experience: {
			work: [
				{
					period: "Sep 2023 - Jan 2024",
					role: "Lecturer Assistant",
					place: "Maranatha Christian University",
					points: ["Basic Programming: Mendukung dan membimbing mahasiswa dalam pemahaman coding fundamental.", "Advanced Database: Membantu dalam pengembangan dan manajemen database yang scalable."],
				},
			],
			org: [
				{
					period: "Feb 2023 - Jan 2024",
					role: "Academic Division Member",
					place: "Senat Mahasiswa Fakultas Teknologi Informasi (SEMAFIT)",
					points: [
						"Secara aktif mengeksekusi dan mendukung implementasi program inti Divisi Akademik untuk mencapai target.",
						"Berkolaborasi lintas fungsi dengan divisi lain untuk mengorganisir berbagai event kemahasiswaan.",
						"Berperan sebagai Administrative Coordinator untuk Orientasi Mahasiswa Baru (INTEGER 2023).",
					],
				},
			],
		},
		projects: [
			{
				title: "CODE-CITE WEB",
				year: "2026",
				desc: "Pengembangan aplikasi berbasis web untuk kutipan kode (Code Citation). Fokus pada Web Development, Data Processing, dan Software Testing.",
				tags: ["Web Dev", "Data Processing", "Software Testing"],
			},
			{
				title: "CODE-CITE EXTENSION",
				year: "2026",
				desc: "Pengembangan plugin Visual Studio Code untuk kutipan kode terstruktur. Fokus pada Plugin Development, Software Engineering, dan Usability Evaluation.",
				tags: ["VS Code", "Plugin Dev", "Software Engineering"],
			},
		],
		education: { degree: "S1 Teknik Informatika", expertise: "Expertise: Backend Development & Prompt Engineering", gpaText: "IPK Terakhir" },
		contactForm: {
			desc: "Tertarik untuk bekerja sama atau memiliki pertanyaan? Jangan ragu untuk mengirimkan pesan melalui form di bawah ini.",
			nameLabel: "Nama Lengkap",
			emailLabel: "Email",
			msgLabel: "Pesan",
			btnIdle: "Kirim Pesan",
			btnSubmitting: "Mengirim...",
			btnSuccess: "Pesan Terkirim!",
		},
	},
	en: {
		nav: { exp: "Experience", proj: "Projects", skills: "Skills", contact: "Contact" },
		hero: {
			role: "Fullstack Developer | Backend Specialist",
			desc: "Informatics Engineering graduate with a strong foundation in Fullstack Development, specializing in Backend systems. Experienced in developing scalable web applications and tools, delivering structured code and efficient database management. Strong analytical and problem-solving skills, with a proven ability to collaborate effectively in team environments.",
			btnEmail: "Email Me",
			btnWa: "WhatsApp",
			btnDownload: "Download CV",
		},
		sections: { skills: "Technical Skills", expWork: "Work Experience", expOrg: "Organizational Experience", proj: "Projects (Thesis)", edu: "Education", contact: "Let's Collaborate" },
		experience: {
			work: [
				{
					period: "Sep 2023 - Jan 2024",
					role: "Lecturer Assistant",
					place: "Maranatha Christian University",
					points: ["Basic Programming - Supported students in fundamental coding.", "Advanced Database - Assisted developing scalable database management."],
				},
			],
			org: [
				{
					period: "Feb 2023 - Jan 2024",
					role: "Academic Division Member",
					place: "Faculty Student Senate (SEMAFIT)",
					points: [
						"Actively executed and supported the implementation of the Academic Division's core programs to ensure targeted goals were met.",
						"Collaborated cross-functionally with other divisions to assist in organizing and executing various student organization events.",
						"Administrative Coordinator, New Student Orientation 2023 (INTEGER 2023).",
					],
				},
			],
		},
		projects: [
			{ title: "CODE-CITE WEB", year: "2026", desc: "Development of a Web-Based Code Citation Application. Expertise in Web Development, Data Processing, and Software Testing.", tags: ["Web Dev", "Data Processing", "Software Testing"] },
			{
				title: "CODE-CITE EXTENSION",
				year: "2026",
				desc: "Development of a Visual Studio Code Plugin for Structured Code Citation. Expertise in Plugin Development, Software Engineering, and Usability Evaluation.",
				tags: ["VS Code", "Plugin Dev", "Software Engineering"],
			},
		],
		education: { degree: "Bachelor of Computer: Informatics Engineering", expertise: "Expertise: Backend Development & Prompt Engineering", gpaText: "Latest GPA" },
		contactForm: {
			desc: "Interested in working together or have any questions? Feel free to send a message using the form below.",
			nameLabel: "Full Name",
			emailLabel: "Email",
			msgLabel: "Message",
			btnIdle: "Send Message",
			btnSubmitting: "Sending...",
			btnSuccess: "Message Sent!",
		},
	},
};
