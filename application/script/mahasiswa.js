const createRow = (i,idMahasiswa,nama,nim,fakultas,jurusan,semester,idBeasiswa,terimaBeasiswa,besaranBeasiswa,kelompokUKT,besaranUKT,edit) => {
	let numCell = document.createElement('td');
	numCell.innerText = i;

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

	let idBeasiswaCell = document.createElement('td');
	idBeasiswaCell.innerText = idBeasiswa;

	let terimaBeasiswaCell = document.createElement('td');
	terimaBeasiswaCell.innerText = terimaBeasiswa;

	let besaranBeasiswaCell = document.createElement('td');
	besaranBeasiswaCell.innerText = besaranBeasiswa;

	let kelompokUKTCell = document.createElement('td');
	kelompokUKTCell.innerText = kelompokUKT;

	let besaranUKTCell = document.createElement('td');
	besaranUKTCell.innerText = besaranUKT;

	let editCell = document.createElement('td');
	editCell.innerHTML = `<span class="label label-info pull-left" onclick="detail(${idMahasiswa})">Edit</span>`
	
	let row = document.createElement('tr');
	row.appendChild(numCell);
	row.appendChild(idMahasiswaCell);
	row.appendChild(namaCell);
	row.appendChild(nimCell);
	row.appendChild(fakultasCell);
	row.appendChild(jurusanCell);
	row.appendChild(semesterCell);
	row.appendChild(idBeasiswaCell);
	row.appendChild(terimaBeasiswaCell);
	row.appendChild(besaranBeasiswaCell);
	row.appendChild(kelompokUKTCell);
	row.appendChild(besaranUKTCell);
	row.appendChild(editCell);

	let table = document.getElementById('tabelmahasiswa');
	table.appendChild(row);
};

const loadData = async () => {
	let result = await fetch('http://178.128.104.74/herregistrasimahasiswalama/mahasiswa');
	let data = await result.json();
	let tabel = document.getElementById('tabelmahasiswa');
	tabel.innerHTML = '';
	let i = 1;
	for (let item of data) {
		createRow(i, item.id_mahasiswa, item.nama_mahasiswa, item.nim, item.fakultas, item.jurusan, item.semester, item.id_beasiswa, item.terima_beasiswa, item.besaran_beasiswa, item.kelompok_ukt, item.besaran_ukt);
		i++;
	}
};

const detail = async (idMahasiswa) => {
  let urlPart = window.location.href.split('/');
  window.location = urlPart.splice(0, urlPart.length-1).join('/') + '/editMahasiswa.html';
  window.localStorage.setItem('idMahasiswa', idMahasiswa);
}

const getMahasiswaById = async () => {
  let idMahasiswa = window.localStorage.getItem('idMahasiswa');
  let result = await fetch('http://178.128.104.74/herregistrasimahasiswalama/mahasiswa/' + idMahasiswa);
  let data = await result.json();
  let item = data;

  // Tampilkan error
  if (data["response-code"] == "404")  {
    alert(data["message"]);
    return;
  }

  let idBeasiswaElem = document.getElementById('edit-idBeasiswa');
  let terimaBeasiswaElem = document.getElementById('edit-terimaBeasiswa');
  let besaranBeasiswaElem = document.getElementById('edit-besaranBeasiswa');
  let kelompokUKTElem = document.getElementById('edit-kelompokUKT');
  let besaranUKTElem = document.getElementById('edit-besaranUKT');


  idBeasiswaElem.value = item.id_beasiswa;
  terimaBeasiswaElem.value = item.terima_beasiswa;
  besaranBeasiswaElem.value = item.besaran_beasiswa;
  kelompokUKTElem.value = item.kelompok_ukt;
  besaranUKTElem.value = item.besaran_ukt;
};
const updateMahasiswa = async () => {
	let idBeasiswaElem = document.getElementById('edit-idBeasiswa');
	let terimaBeasiswaElem = document.getElementById('edit-terimaBeasiswa');
	let besaranBeasiswaElem = document.getElementById('edit-besaranBeasiswa');
	let kelompokUKTElem = document.getElementById('edit-kelompokUKT');
	let besaranUKTElem = document.getElementById('edit-besaranUKT');



	let idMahasiswa = window.localStorage.getItem('idMahasiswa');
	console.log(idMahasiswa);
  	await fetch(`http://178.128.104.74/herregistrasimahasiswalama/mahasiswa/${idMahasiswa}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"id_beasiswa": parseInt(idBeasiswaElem.value),
      "terima_beasiswa": terimaBeasiswaElem.checked, 
      "besaran_beasiswa": parseInt(besaranBeasiswaElem.value), 
      "kelompok_ukt": kelompokUKTElem.value,
      "besaran_ukt": parseInt(besaranUKTElem.value)
    })
  })

  console.log(JSON.stringify({"id_beasiswa": parseInt(idBeasiswaElem.value),
      "terima_beasiswa": terimaBeasiswaElem.checked, 
      "besaran_beasiswa": parseInt(besaranBeasiswaElem.value), 
      "kelompok_ukt": kelompokUKTElem.value,
      "besaran_UKT": parseInt(besaranUKTElem.value)
  })
  )


  let urlPart = window.location.href.split('/');
      window.location = urlPart.splice(0, urlPart.length-1).join('/') + '/mahasiswa.html';
};