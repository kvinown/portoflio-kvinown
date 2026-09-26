export const portofolioData = {
	contacts: {
		phoneWa: "6281318587942",
		phoneDisplay: "(+62) 813-1858-7942",
		email: "kvinown@gmail.com",
		instagram: "https://instagram.com/kvinown",
		github: "https://github.com/kvinown",
		linkedin: "http://www.linkedin.com/in/kevin-owen-kvinown",
		web: "https://kvinown.netlify.app",
		cvFileName: "Resume CV Kevin Owen (2).pdf",
	},
	skills: [
		{ id: 1, icon: "server", title: "Programming Languages", items: ["PHP", "TypeScript", "Python", "Kotlin", "JavaScript", "Java"] },
		{ id: 2, icon: "layout", title: "Web Development", items: ["Laravel", "Node.js", "React.js", "Vue", "Django", "NestJs"] },
		{ id: 3, icon: "smartphone", title: "Mobile Development", items: ["Flutter", "Jetpack Compose"] },
		{ id: 4, icon: "database", title: "Database & Cloud", items: ["MySQL", "Firebase", "PostgreSQL"] },
		{ id: 5, icon: "wrench", title: "Tools & Version Control", items: ["Git/GitHub", "Postman", "Google Workspace"] },
	],
	id: {
		nav: { overview: "Ringkasan", skills: "Keahlian", exp: "Pengalaman", proj: "Proyek", edu: "Pendidikan", cert: "Sertifikasi", contact: "Kontak" },
		hero: {
			role: "Fullstack Developer | Backend Specialist",
			desc: "Lulusan Teknik Informatika dengan fondasi kuat dalam Fullstack Development, berspesialisasi pada sistem Backend. Berpengalaman mengembangkan aplikasi web yang terukur, kode yang terstruktur, dan manajemen basis data yang efisien. Memiliki kemampuan analitis dan problem-solving yang kuat, serta terbukti mampu berkolaborasi efektif dalam tim untuk mencapai tujuan proyek.",
			btnEmail: "Email Saya",
			btnWa: "WhatsApp",
			btnDownload: "Unduh CV",
		},
		sections: { skills: "Keahlian Teknis", expWork: "Pengalaman Kerja", expOrg: "Pengalaman Organisasi", proj: "Proyek", products: "Produk Digital", til: "Today I Learned (TIL)", edu: "Pendidikan", cert: "Sertifikasi & Penghargaan", contact: "Mari Berkolaborasi" },
		projectModal: { github: "Buka GitHub", live: "Live Preview", noLive: "Tidak Ada Live Preview", challenge: "Tantangan", solution: "Solusi", impact: "Dampak" },
		productsDesc: "Template premium dan solusi digital yang dirancang untuk membantu bisnis dan developer membangun lebih cepat.",
		tilDesc: "Potongan kode dan wawasan teknis harian yang saya temukan saat membangun sistem perangkat lunak yang kompleks.",
		tilList: [
			{
				date: "Sep 2026",
				category: "Laravel",
				title: "Optimasi Query N+1 di Laravel",
				desc: "Daripada melooping query yang berat, gunakan eager loading dengan method `with()` saat memanggil relasi. Ini dapat mencegah masalah N+1 yang memperlambat respon server hingga 80%.",
				code: `// ❌ Bad (N+1 Problem)
$users = User::all();
foreach($users as $user) {
    echo $user->profile->name;
}

// ✅ Good (Eager Loading)
$users = User::with('profile')->get();`
			},
			{
				date: "Agu 2026",
				category: "React / Vite",
				title: "Meningkatkan Performa SEO SPA",
				desc: "Meskipun SPA menggunakan React kurang ramah SEO secara bawaan, kita bisa mengatasinya dengan menyuntikkan JSON-LD Structured Data dan tag Meta OG dinamis langsung ke index.html.",
				code: `<!-- Menyuntikkan JSON-LD -->
<script type="application/ld+json">
{
  "@context": "https://schema.org/",
  "@type": "Person",
  "name": "Kevin Owen",
  "jobTitle": "Fullstack Developer"
}
</script>`
			},
			{
				date: "Jul 2026",
				category: "NestJS",
				title: "Keuntungan Arsitektur Modular",
				desc: "Menggunakan pola Dependency Injection (DI) pada NestJS membuat unit testing menjadi jauh lebih mudah, karena module services menjadi loosely coupled.",
				code: `@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}`
			}
		],
		productsList: [
			{
				title: "Pro-Company Template",
				desc: "Template profil perusahaan yang dioptimalkan dengan baik, siap SEO, dibangun dengan React dan Tailwind CSS. Dirancang untuk menarik klien.",
				status: "Segera Hadir"
			},
			{
				title: "DevFolio 2.0",
				desc: "Template portofolio yang elegan dan interaktif untuk Software Engineer. Lengkap dengan CMS, mode gelap, dan analitik terintegrasi.",
				status: "Segera Hadir"
			}
		],
		bento: {
			focusTitle: "Berfokus pada Backend & Integrasi AI",
			focusDesc: "Membangun sistem yang tangguh, scalable, dan cerdas untuk memecahkan masalah kompleks dunia nyata.",
			location: "Jakarta",
			country: "Indonesia",
			gpaText: "IPK / 4.00",
			available: "Tersedia untuk Freelance",
			availableDesc: "Saat ini terbuka untuk proyek freelance, solusi digital, atau kolaborasi di luar jam kerja penuh."
		},
		experience: {
			work: [
				{
					period: "Juni 2026 - Sekarang",
					role: "Backend Developer",
					place: "PT Royal Medicalink Pharmalab",
					points: [
						"Pemeliharaan Sistem: Mengidentifikasi dan menyelesaikan bug perangkat lunak untuk memastikan stabilitas sistem yang ada.",
						"Pengembangan Sisten: Mengembangkan dan mengoptimalkan sistem backend yang sedang berjalan untuk performa dan skalabilitas yang lebih baik.",
						"Manajemen Data: Memproses dan mengelola entri data penjualan dan pemasaran untuk mendukung divisi marketing.",
					],
				},
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
				year: "Sep 2025 - Jan 2026",
				desc: "Pengembangan aplikasi berbasis web untuk kutipan kode (Code Citation). Fokus pada Web Development, Data Processing, dan Software Testing.",
				caseStudy: {
					problem: "Developer sering kesulitan menyalin format kutipan kode secara konsisten untuk dokumentasi teknis atau blog.",
					solution: "Membangun antarmuka web interaktif yang memproses dan mengonversi input kode kasar menjadi kutipan visual yang siap dibagikan.",
					impact: "Mempercepat alur kerja pembuatan dokumentasi teknis dan mempermudah berbagi snippet kode secara elegan."
				},
				tags: ["HTML", "Babel.js", "Tailwind CSS"],
				githubUrl: "https://github.com/kvinown/code-cite",
				liveUrl: "https://code-cite.netlify.app/",
				category: "Frontend",
			},
			{
				title: "CODE-CITE EXTENSION",
				year: "Sep 2025 - Jan 2026",
				desc: "Pengembangan plugin Visual Studio Code untuk kutipan kode terstruktur. Fokus pada Plugin Development, Software Engineering, dan Usability Evaluation.",
				caseStudy: {
					problem: "Menyalin kode bolak-balik dari VS Code ke web generator eksternal mengganggu fokus kerja (Context Switching).",
					solution: "Mengembangkan ekstensi VS Code native berbasis TypeScript yang memungkinkan developer menghasilkan gambar kutipan langsung dari dalam editor.",
					impact: "Mengurangi waktu pembuatan snippet visual hingga 70% dan meningkatkan produktivitas pengembang secara drastis."
				},
				tags: ["TypeScript"],
				githubUrl: "https://github.com/kvinown/code-cite-extension",
				liveUrl: "https://marketplace.visualstudio.com/items?itemName=kvinowndev.code-cite",
				previewImage: "/placeholder.jpg", // TODO: Ganti dengan screenshot plugin
				category: "Frontend",
			},
			{
				title: "SIMBA-APP",
				year: "Mar 2025 – Jul 2025",
				desc: "Mengembangkan modul kehadiran mahasiswa berbasis web sebagai bagian dari program Kerja Praktik di Universitas Kristen Maranatha[cite: 32]. Mendigitalisasi sistem pelaporan akademik dan catatan resmi untuk meningkatkan efisiensi pelacakan kehadiran dan manajemen data[cite: 33].",
				caseStudy: {
					problem: "Sistem pelaporan presensi akademik mahasiswa masih manual, memperlambat rekap data dan rentan terhadap human error.",
					solution: "Merancang dan membangun modul presensi berbasis web menggunakan arsitektur Laravel (MVC) terintegrasi.",
					impact: "Mendigitalisasi 100% proses laporan absensi institusi, mempercepat alur kerja tata usaha, dan mencegah hilangnya rekam jejak akademik."
				},
				tags: ["Laravel", "Blade", "HTML", "Bootstrap", "JavaScript", "MySQL"],
				githubUrl: "https://github.com/kvinown/SIMBA-APP",
				liveUrl: "",
				category: "Fullstack",
			},
			{
				title: "HR Management System",
				year: "Mei 2026 — Present",
				desc: "Mengembangkan platform HR komprehensif berbasis web untuk menyederhanakan data karyawan, penggajian, dan manajemen cuti[cite: 36]. Merancang sistem kehadiran canggih yang mengintegrasikan pelacakan GPS dan verifikasi kamera untuk pencatatan log yang aman[cite: 37].",
				caseStudy: {
					problem: "Manajemen data kepegawaian, absensi, dan cuti tersebar di platform yang tidak terintegrasi dan sulit dilacak.",
					solution: "Membangun platform HR komprehensif fullstack dengan modul absensi khusus yang mendeteksi lokasi GPS dan verifikasi kamera.",
					impact: "Meningkatkan keamanan dan akurasi data absensi, serta memusatkan seluruh sistem manajemen SDM dalam satu dasbor terpadu."
				},
				tags: ["React.js", "Node.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
				githubUrl: "https://github.com/kvinown/hr-management-system-fullstack",
				liveUrl: "",
				category: "Fullstack",
			},
			{
				title: "MimbarCast",
				year: "Mei 2026 — Present",
				desc: "Membangun aplikasi web real-time menggunakan WebSockets untuk memungkinkan kontrol jarak jauh pada papan tulis digital dan tampilan ayat Alkitab dari perangkat seluler ke proyektor PC[cite: 41].",
				caseStudy: {
					problem: "Presenter di panggung membutuhkan cara nirkabel untuk mengirimkan tampilan visual/ayat dari handphone ke proyektor tanpa delay.",
					solution: "Menerapkan arsitektur komunikasi real-time dua arah menggunakan WebSockets (Socket.io) dan Fabric.js untuk sinkronisasi kanvas.",
					impact: "Menyediakan kontrol presentasi tanpa batas dengan latensi nyaris 0ms, meningkatkan fleksibilitas pembicara secara drastis."
				},
				tags: ["HTML", "CSS", "JavaScript", "Fabric.js", "WebSockets"],
				githubUrl: "https://github.com/kvinown/MimbarCast",
				liveUrl: "",
				category: "Fullstack",
			},
			{
				title: "Storevo Backend",
				year: "Mar 2026 — Present",
				desc: "Merancang API backend yang tangguh untuk menangani logika bisnis inti, operasi basis data, dan integrasi data untuk sistem POS serta inventaris ritel/toko roti[cite: 45].",
				caseStudy: {
					problem: "Aplikasi Point of Sales ritel membutuhkan arsitektur backend yang tahan banting (resilient) untuk memproses ratusan transaksi stok per detik.",
					solution: "Membangun micro-services REST API menggunakan arsitektur NestJS, TypeScript, dan Prisma ORM dengan pengujian modular ketat.",
					impact: "Mencapai performa integrasi API yang sangat andal dan aman, mendukung stabilitas operasional harian bisnis."
				},
				tags: ["NestJS", "TypeScript", "Prisma", "MySQL", "Swagger API"],
				githubUrl: "https://github.com/Storevo",
				liveUrl: "",
				category: "Backend",
			},
		],
		education: [
			{
				school: "Universitas Kristen Maranatha",
				degree: "S1 Teknik Informatika",
				period: "2022 - 2026",
				gpa: "3.73",
				desc: "Spesialisasi: Pemrograman Backend dan Prompt Engineering"
			}
		],
		certifications: [
			{
				title: "Code Cite — Copyright Registration",
				issuer: "Direktorat Jenderal Kekayaan Intelektual",
				date: "Mei 2026",
				credentialId: "001241324",
				desc: "Proyek perangkat lunak 'Code Cite' resmi mendapatkan Pencatatan Hak Cipta dari Kementerian Hukum dan HAM Republik Indonesia. Dikembangkan secara kolaboratif bersama Oscar Karnalim.",
				file: "/sertifikat_2026-05-21 (2).pdf",
				link: "https://www.linkedin.com/in/kevin-owen-kvinown",
			},
		],
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
		nav: { overview: "Overview", skills: "Skills", exp: "Experience", proj: "Projects", edu: "Education", cert: "Certifications", contact: "Contact" },
		hero: {
			role: "Fullstack Developer | Backend Specialist",
			desc: "Informatics Engineering graduate with a strong foundation in Fullstack Development, specializing in Backend systems. Experienced in developing scalable web applications and tools, delivering structured code and efficient database management. Strong analytical and problem-solving skills, with a proven ability to collaborate effectively in team environments.",
			btnEmail: "Email Me",
			btnWa: "WhatsApp",
			btnDownload: "Download CV",
		},
		sections: { skills: "Technical Skills", expWork: "Work Experience", expOrg: "Organizational Experience", proj: "Projects", products: "Digital Products", til: "Today I Learned (TIL)", edu: "Education", cert: "Licenses & Certifications", contact: "Let's Collaborate" },
		projectModal: { github: "Open GitHub", live: "Live Preview", noLive: "No Live Preview", challenge: "The Challenge", solution: "The Solution", impact: "The Impact" },
		productsDesc: "Premium templates and digital solutions designed to help businesses and developers build faster.",
		tilDesc: "Code snippets and daily technical insights I discovered while building complex software systems.",
		tilList: [
			{
				date: "Sep 2026",
				category: "Laravel",
				title: "N+1 Query Optimization in Laravel",
				desc: "Instead of running heavy loops on queries, always use eager loading with the `with()` method when calling relations. This prevents the N+1 problem which can slow down server response by up to 80%.",
				code: `// ❌ Bad (N+1 Problem)
$users = User::all();
foreach($users as $user) {
    echo $user->profile->name;
}

// ✅ Good (Eager Loading)
$users = User::with('profile')->get();`
			},
			{
				date: "Aug 2026",
				category: "React / Vite",
				title: "Boosting SPA SEO Performance",
				desc: "Even though SPAs are not inherently SEO-friendly, we can overcome this by injecting JSON-LD Structured Data and dynamic Open Graph Meta tags directly into the index.html file.",
				code: `<!-- Injecting JSON-LD -->
<script type="application/ld+json">
{
  "@context": "https://schema.org/",
  "@type": "Person",
  "name": "Kevin Owen",
  "jobTitle": "Fullstack Developer"
}
</script>`
			},
			{
				date: "Jul 2026",
				category: "NestJS",
				title: "Benefits of Modular Architecture",
				desc: "Using the Dependency Injection (DI) pattern in NestJS makes unit testing significantly easier, as service modules become loosely coupled.",
				code: `@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}`
			}
		],
		productsList: [
			{
				title: "Pro-Company Template",
				desc: "A highly optimized, SEO-ready company profile template built with React and Tailwind CSS. Designed to convert visitors into clients.",
				status: "Coming Soon"
			},
			{
				title: "DevFolio 2.0",
				desc: "A sleek, interactive portfolio template for software engineers. Complete with a CMS for projects, dark mode, and integrated analytics.",
				status: "Coming Soon"
			}
		],
		bento: {
			focusTitle: "Focusing on Backend & AI Integration",
			focusDesc: "Building scalable, robust systems and exploring AI solutions to solve complex real-world problems.",
			location: "Jakarta",
			country: "Indonesia",
			gpaText: "GPA / 4.00",
			available: "Available for Freelance",
			availableDesc: "Currently open for freelance projects, digital solutions, or collaborations outside of full-time hours."
		},
		experience: {
			work: [
				{
					period: "June 2026 - Present",
					role: "Backend Developer",
					place: "PT Royal Medicalink Pharmalab",
					points: [
						"System Maintenance - Identified and resolved software bugs to ensure the stability of existing systems.",
						"System Development - Developed and optimized ongoing backend systems for better performance and scalability.",
						"Data Management - Processed and managed sales and marketing data entries to support promotional campaigns.",
					],
				},
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
			{
				title: "CODE-CITE WEB",
				year: "Sep 2025 - Jan 2026",
				desc: "Development of a Web-Based Code Citation Application. Expertise in Web Development, Data Processing, and Software Testing.",
				caseStudy: {
					problem: "Developers often struggle to copy and share code citation formats consistently for technical documentation or blogs.",
					solution: "Built an interactive web interface using React and Tailwind CSS that processes and converts raw code input into shareable visual snippets.",
					impact: "Accelerated the workflow for creating technical documentation and made sharing code snippets elegant and effortless."
				},
				tags: ["HTML", "Babel.js", "Tailwind CSS"],
				githubUrl: "https://github.com/kvinown/code-cite",
				liveUrl: "https://code-cite.netlify.app/",
				category: "Frontend",
			},
			{
				title: "CODE-CITE EXTENSION",
				year: "Sep 2025 - Jan 2026",
				desc: "Development of a Visual Studio Code Plugin for Structured Code Citation. Expertise in Plugin Development, Software Engineering, and Usability Evaluation.",
				caseStudy: {
					problem: "Copying code back and forth from VS Code to an external web generator disrupts workflow and causes context switching.",
					solution: "Developed a native VS Code extension built with TypeScript that allows developers to generate code citations directly within their editor.",
					impact: "Reduced the time required to create visual snippets by 70% and drastically improved the developer experience."
				},
				tags: ["TypeScript"],
				githubUrl: "https://github.com/kvinown/code-cite-extension",
				liveUrl: "https://marketplace.visualstudio.com/items?itemName=kvinowndev.code-cite",
				previewImage: "/placeholder.jpg", // TODO: Ganti dengan screenshot plugin
				category: "Frontend",
			},
			{
				title: "SIMBA-APP",
				year: "Mar 2025 – Jul 2025",
				desc: "Developed a web-based student attendance module as part of a Practical Work program at Maranatha Christian University. Digitalized the academic reporting and official records system to improve the efficiency of attendance tracking and data management.",
				caseStudy: {
					problem: "The student academic attendance reporting system was highly manual, slowing down data recap and prone to human errors.",
					solution: "Designed and built a web-based attendance module using Laravel (MVC) featuring daily tracking logs for lecturers and students.",
					impact: "Digitalized 100% of the institution's attendance reporting process, accelerating administrative workflows and preventing loss of historical data."
				},
				tags: ["Laravel", "Blade", "HTML", "Bootstrap", "JavaScript", "MySQL"],
				githubUrl: "https://github.com/kvinown/SIMBA-APP",
				liveUrl: "",
				category: "Fullstack",
			},
			{
				title: "HR Management System",
				year: "May 2026 — Present",
				desc: "Developing a comprehensive web-based HR platform to streamline employee data, payroll, and leave management. Designing an advanced attendance system integrating GPS tracking and camera verification for secure logging.",
				caseStudy: {
					problem: "Employee data, payroll, and leave management were scattered across disjointed and expensive third-party platforms.",
					solution: "Built a comprehensive fullstack HR platform featuring a custom attendance module with GPS location tracking and camera verification.",
					impact: "Enhanced the security and accuracy of attendance records while centralizing all HR administration into a single unified dashboard."
				},
				tags: ["React.js", "Node.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
				githubUrl: "https://github.com/kvinown/hr-management-system-fullstack",
				liveUrl: "",
				category: "Fullstack",
			},
			{
				title: "MimbarCast",
				year: "May 2026 — Present",
				desc: "Built a real-time web application using WebSockets to enable remote control of digital whiteboards and Bible verse displays from mobile devices to PC projectors.",
				caseStudy: {
					problem: "Stage presenters needed a fast, wireless way to project verses or notes from their mobile devices to screens without long cables.",
					solution: "Implemented a real-time, two-way communication architecture using WebSockets (Socket.io) and Fabric.js for canvas synchronization.",
					impact: "Provided seamless presentation control with near-zero latency, significantly increasing flexibility for speakers on stage."
				},
				tags: ["HTML", "CSS", "JavaScript", "Fabric.js", "WebSockets"],
				githubUrl: "https://github.com/kvinown/MimbarCast",
				liveUrl: "",
				category: "Fullstack",
			},
			{
				title: "Storevo Backend",
				year: "Mar 2026 — Present",
				desc: "Engineered a robust backend API to handle core business logic, database operations, and data integration for retail/bakery POS and inventory systems.",
				caseStudy: {
					problem: "Retail Point of Sales applications require a highly resilient backend architecture to process hundreds of inventory transactions per second.",
					solution: "Engineered an enterprise-grade REST API microservice using NestJS, TypeScript, and Prisma ORM, complete with Swagger documentation.",
					impact: "Achieved highly reliable and secure API integration performance, supporting the daily operational stability of the retail business."
				},
				tags: ["NestJS", "TypeScript", "Prisma", "MySQL", "Swagger API"],
				githubUrl: "https://github.com/Storevo",
				liveUrl: "",
				category: "Backend",
			},
		],
		education: { degree: "Bachelor of Computer: Informatics Engineering", expertise: "Expertise: Backend Development & Prompt Engineering", gpaText: "Latest GPA" },
		certifications: [
			{
				title: "Code Cite — Copyright Registration",
				issuer: "Direktorat Jenderal Kekayaan Intelektual",
				date: "May 2026",
				credentialId: "001241324",
				desc: "Our software project 'Code Cite' officially received Copyright Registration from the Ministry of Law of the Republic of Indonesia. Developed collaboratively with Oscar Karnalim.",
				file: "/sertifikat_2026-05-21 (2).pdf",
				link: "https://www.linkedin.com/in/kevin-owen-kvinown",
			},
		],
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
