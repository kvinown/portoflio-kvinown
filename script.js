// Function untuk membuat navbar
function createNavItems() {
	var navItemsContainer = document.getElementById("navItemsContainer");

	// Fetch data JSON dari file nav.json
	fetch("nav.json")
		.then((response) => response.json())
		.then((data) => {
			data.navItems.forEach(function (item) {
				var li = document.createElement("li");
				li.className = "nav-item";

				var a = document.createElement("a");
				a.className = "nav-link" + (item.isActive ? " active" : "");
				a.href = item.link;
				a.textContent = item.text;

				li.appendChild(a);
				navItemsContainer.appendChild(li);
			});

			// Tambahkan event listener untuk mengawasi perubahan posisi scroll
			window.addEventListener("scroll", function () {
				data.navItems.forEach(function (item) {
					var section = document.querySelector(item.link);
					var a = document.querySelector('a[href="' + item.link + '"]');

					// Periksa apakah section dalam viewport saat ini
					if (isInViewport(section)) {
						a.classList.add("active");
						item.isActive = true;
					} else {
						a.classList.remove("active");
						item.isActive = false;
					}
				});
			});
		})
		.catch((error) => {
			console.error("Error fetching JSON data:", error);
		});
}
// Function untuk membuat navbar
function createNavItems() {
	var navItemsContainer = document.getElementById("navItemsContainer");

	// Fetch data JSON dari file nav.json
	fetch("nav.json")
		.then((response) => response.json())
		.then((data) => {
			data.navItems.forEach(function (item) {
				var li = document.createElement("li");
				li.className = "nav-item";

				var a = document.createElement("a");
				a.className = "nav-link";
				a.href = item.link;
				a.textContent = item.text;

				li.appendChild(a);
				navItemsContainer.appendChild(li);
			});

			// Tambahkan event listener untuk mengawasi perubahan posisi scroll
			window.addEventListener("scroll", function () {
				var sections = document.querySelectorAll("section");
				data.navItems.forEach(function (item) {
					var section = document.querySelector(item.link);
					var a = document.querySelector('a[href="' + item.link + '"]');
					if (isInViewport(section)) {
						a.classList.add("active");
					} else {
						a.classList.remove("active");
					}
				});
			});
		})
		.catch((error) => {
			console.error("Error fetching JSON data:", error);
		});
}

// Fungsi untuk memeriksa apakah sebuah elemen berada dalam viewport
function isInViewport(element) {
	var rect = element.getBoundingClientRect();
	return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
}

// Fungsi untuk memeriksa apakah sebuah elemen berada dalam viewport
function isInViewport(element) {
	var rect = element.getBoundingClientRect();
	return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
}

// Panggil fungsi untuk membuat elemen navigasi setelah halaman dimuat sepenuhnya
document.addEventListener("DOMContentLoaded", createNavItems);

// Fungsi untuk mengisi data ke dalam HTML
function populateData(data) {
	var jobListContainer = document.getElementById("jobList");

	data.forEach(function (job) {
		var jobItem = document.createElement("div");
		jobItem.classList.add("col-md", "border", "border-dark", "d-flex", "p-2", "mb-2");

		var jobDetails = document.createElement("div");
		jobDetails.classList.add("col-md-10", "d-block");
		jobDetails.innerHTML = `
            <div class="col-md fs-6">${job.role}</div>
            <div class="col-md fs-7">${job.description}</div>
            <div class="col-md fs-7">${job.product}</div>
        `;

		var logo = document.createElement("div");
		logo.classList.add("col-md", "text-center", "align-self-center", "fs-4");

		// Buat elemen span untuk menyertakan ikon dalam elemen span
		var iconSpan = document.createElement("span");
		iconSpan.innerHTML = job.logo;

		logo.appendChild(iconSpan); // Menambahkan ikon dalam elemen span ke dalam elemen logo

		jobItem.appendChild(jobDetails);
		jobItem.appendChild(logo);

		jobListContainer.appendChild(jobItem);
	});
}

// Panggil fungsi untuk mengisi data Profile
window.onload = function () {
	fetch("jobData.json")
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			populateData(data);
		})
		.catch(function (error) {
			console.error("Error:", error);
		});
};

// Ambil elemen container di HTML
var skillContainer = document.getElementById("skillContainer");

// Mengambil data dari file JSON eksternal menggunakan fetch API
fetch("skills.json")
	.then((response) => response.json())
	.then((data) => {
		// Loop melalui data JSON dan buat tampilan HTML
		data.skills.forEach(function (skillGroup) {
			var skillDiv = document.createElement("div");
			skillDiv.className = "col-md-2 border border-dark rounded d-block";

			// Jenis Skill
			var jenisSkillDiv = document.createElement("div");
			jenisSkillDiv.className = "col-md text-center p-2";
			jenisSkillDiv.textContent = skillGroup.jenis;
			skillDiv.appendChild(jenisSkillDiv);

			var hr = document.createElement("hr");
			hr.color = "black";
			hr.width = "100%";
			hr.size = "5px";
			hr.style.marginTop = "0px";
			skillDiv.appendChild(hr);

			// Nama-nama Skill dan Ikon
			var namaSkillDiv = document.createElement("div");
			namaSkillDiv.className = "col-md text-start";
			namaSkillDiv.style.maxHeight = "300px";
			namaSkillDiv.style.overflowY = "scroll";

			skillGroup.nama.forEach(function (nama, index) {
				var skillItemDiv = document.createElement("div");
				skillItemDiv.className = "col-md p-2 border-bottom border-dark";

				// Tambahkan elemen ikon Font Awesome
				var iconElement = document.createElement("i");
				iconElement.className = "fa-brands " + skillGroup.icon[index]; // Menambahkan kelas ikon Font Awesome
				skillItemDiv.appendChild(iconElement);

				// Tambahkan nama skill
				var skillNameSpan = document.createElement("span");
				skillNameSpan.className = "ms-2";
				skillNameSpan.textContent = nama;
				skillItemDiv.appendChild(skillNameSpan);

				namaSkillDiv.appendChild(skillItemDiv);
			});

			skillDiv.appendChild(namaSkillDiv);

			// Tambahkan div ke dalam container
			skillContainer.appendChild(skillDiv);
		});
	})
	.catch((error) => console.error("Error:", error));
