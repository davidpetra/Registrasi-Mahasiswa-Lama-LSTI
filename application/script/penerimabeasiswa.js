const createRow = (i,idBeasiswa, idMahasiswa, nama, nim, fakultas, jurusan, semester, besarBeasiswa, kelompokUKT, besarUKT) => {
	let numCell = document.createElement('td');
	numCell.innerText = i;

	let idBeasiswaCell = document.createElement('td');
	idBeasiswaCell.innerText = idBeasiswa;

	let idMahasiswaCell = document.createElement('td');
	idMahasiswaCell.innerText = idMahasiswa;

	let namaCell = document.createElement('td');
	namaCell.innerText = nama;

	let nimCell = document.createElement('td');
	nimCell.innerText = nim;

	let fakultasCell = document.createElement('td');
	fakultasCell.innerText = fakultas;

	let jurusanCell = document.createElement('td');
	jurusanCell.innerText = jurusan;

	let semesterCell = document.createElement('td');
	semesterCell.innerText = semester;

	let besarBeasiswaCell = document.createElement('td');
	besarBeasiswaCell.innerText = besarBeasiswa;

	let kelompokUKTCell = document.createElement('td');
	kelompokUKTCell.innerText = kelompokUKT;

	let besarUKTCell = document.createElement('td');
	besarUKTCell.innerText = besarUKT

	let row = document.createElement('tr');
	row.appendChild(numCell);
	row.appendChild(idBeasiswaCell);
	row.appendChild(idMahasiswaCell);
	row.appendChild(namaCell);
	row.appendChild(nimCell);
	row.appendChild(fakultasCell);
	row.appendChild(jurusanCell);
	row.appendChild(semesterCell);
	row.appendChild(besarBeasiswaCell);
	row.appendChild(kelompokUKTCell);
	row.appendChild(besarUKTCell);

	let table = document.getElementById('tabelpenerima');
	table.appendChild(row);
};

const loadData = async () => {
	let result = await fetch('http://178.128.104.74/herregistrasimahasiswalama/beasiswa/hasil');
	let data = await result.json();
	let tabel = document.getElementById('tabelpenerima');
	tabel.innerHTML = '';
	let i = 1;
	for (let item of data) {
		createRow(i, item.id_beasiswa, item.id_mahasiswa, item.nama_mahasiswa, item.nim, item.fakultas, item.jurusan, item.semester, item.besaran_beasiswa, item.kelompok_ukt, item.besaran_ukt);
		i++;
	}
};