const createRow = (i,idBeasiswa, namaBeasiswa, jenis, deskripsi, pemberi, deadline) => {
	let numCell = document.createElement('td');
	numCell.innerText = i;

	let idBeasiswaCell = document.createElement('td');
	idBeasiswaCell.innerText = idBeasiswa;

	let namaBeasiswaCell = document.createElement('td');
	namaBeasiswaCell.innerText = namaBeasiswa;

	let jenisCell = document.createElement('td');
	jenisCell.innerText = jenis;

	let deskripsiCell = document.createElement('td');
	deskripsiCell.innerText = deskripsi;

	let pemberiCell = document.createElement('td');
	pemberiCell.innerText = pemberi;

	let deadlineCell = document.createElement('td');
	deadlineCell.innerText = deadline;

	let penerimaCell = document.createElement('td');
	penerimaCell.innerHTML = `<span class="label label-info pull-left" data-effect="pop" onclick="detail(${idBeasiswa})">lihat details</span>`
	
	let row = document.createElement('tr');
	row.appendChild(numCell);
	row.appendChild(idBeasiswaCell);
	row.appendChild(namaBeasiswaCell);
	row.appendChild(jenisCell);
	row.appendChild(deskripsiCell);
	row.appendChild(pemberiCell);
	row.appendChild(deadlineCell);
	row.appendChild(penerimaCell)

	let table = document.getElementById('tabelProgram');
	table.appendChild(row);
};

const createRowPenerima = (i,idMahasiswa, namaMahasiswa, nim, fakultas, jurusan, semester) => {
	let numCell = document.createElement('td');
	numCell.innerText = i;
	let idMahasiswaCell = document.createElement('td');
	idMahasiswaCell.innerText = idMahasiswa;
	let namaMahasiswaCell = document.createElement('td');
	namaMahasiswaCell.innerText = namaMahasiswa;
	let nimCell = document.createElement('td');
	nimCell.innerText = nim;
	let fakultasCell = document.createElement('td');
	fakultasCell.innerText = fakultas;
	let jurusanCell = document.createElement('td');
	jurusanCell.innerText = jurusan;
	let semesterCell = document.createElement('td');
	semesterCell.innerText = semester;
	let row = document.createElement('tr');
	row.appendChild(numCell);
	row.appendChild(idMahasiswaCell);
	row.appendChild(namaMahasiswaCell);
	row.appendChild(nimCell);
	row.appendChild(fakultasCell);
	row.appendChild(jurusanCell);
	row.appendChild(semesterCell);

	let table = document.getElementById('tabelDetailPenerima');
	table.appendChild(row);
}

const loadData = async () => {
	let result = await fetch('http://178.128.104.74/herregistrasimahasiswalama/beasiswa');
	let data = await result.json();
	let tabel = document.getElementById('tabelProgram');
	tabel.innerHTML = '';
	let i = 1;
	for (let item of data) {
		createRow(i, item.id_beasiswa, item.nama_beasiswa, item.jenis, item.deskripsi, item.pemberi, item.deadline);
		i++;
	}
};

const detail = async (idBeasiswa) => {
  let urlPart = window.location.href.split('/');
  window.location = urlPart.splice(0, urlPart.length-1).join('/') + '/detailProgram.html';

  window.localStorage.setItem('idBeasiswa', idBeasiswa);
}

const getPenerimaById = async () => {
  let idBeasiswa = window.localStorage.getItem('idBeasiswa');
  let result = await fetch(`http://178.128.104.74/herregistrasimahasiswalama/beasiswa/${idBeasiswa}/hasil`);
  let json = await result.json();
  let tabel = document.getElementById('tabelDetailPenerima');
  tabel.innerHTML = '';
  let i = 1;
  for(let item of json){
  	createRowPenerima(i, item.id_mahasiswa, item.nama_mahasiswa, item.nim, item.fakultas, item.jurusan, item.semester);
  	i++;
  }
  // Tampilkan error
  if (json["response-code"] == "404")  {
    alert(json["message"]);
    return;
  }
};