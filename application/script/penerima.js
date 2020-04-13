const createRow = (i, idBeasiswa, idMahasiswa, nama, nim, fakultas, jurusan, sem, besarBeasiswa, kelompok, besarUkt) => {


  let numCell = document.createElement('td');
  numCell.innerText = i;

  let idBeasiswaCell = document.createElement('td');
  idBeasiswaCell.innerText = idMahasiswa;
  idBeasiswaCell.className = "idBeasiswa";

  let idMahasiswaCell = document.createElement('td');
  idMahasiswaCell.innerText = idMahasiswa;
  idMahasiswaCell.className = "idMahasiswa";

  let namaCell = document.createElement('td');
  namaCell.innerText = nama;
  namaCell.className = "nama";


  let nimCell = document.createElement('td');
  nimCell.innerText = nim;
  nimCell.className = "nim";

  let fakultasCell = document.createElement('td');
  fakultasCell.innerText = fakultas;
  fakultasCell.className = "fakultas";

  let jurusanCell = document.createElement('td');
  jurusanCell.innerText = jurusan;
  jurusanCell.className = "jurusan ";

  let semCell = document.createElement('td');
  semCell.innerText = sem;
  semCell.className = "sem";

  let besarBeasiswaCell = document.createElement('td');
  besarBeasiswaCell.innerText = besarBeasiswa;
  besarBeasiswaCell.className = "besarBeasiswa";

  let kelompokCell = document.createElement('td');
  kelompokCell.innerText = kelompok;
  kelompokCell.className = "kelompok";
  
  let besarUktCell = document.createElement('td');
  besarUktCell.innerText = besarUkt;
  besarUktCell.className = "besarUkt";

  let row = document.createElement('tr');
  row.appendChild(numCell);
  row.appendChild(idBeasiswaCell);
  row.appendChild(idMahasiswaCell);
  row.appendChild(nimCell);
  row.appendChild(fakultasCell);
  row.appendChild(jurusanCell);
  row.appendChild(namaCell);
  row.appendChild(semCell);
  row.appendChild(besarBeasiswaCell);
  row.appendChild(kelompokCell);
  row.appendChild(besarUktCell);

  let table = document.getElementById('table-body');
  table.appendChild(row);
};

const loadData = async () => {
  let result = await fetch('http://3.227.193.57:9000/beasiswa/riwayat/id/' + window.localStorage.getItem('id'));
  let json = await result.json();
  let table = document.getElementById('table-body');
  table.innerHTML = '';
  let i = 1;
  for (let data of json) {
    createRow(i, data.nama, data.waktu_buka, data.waktu_tutup, data.jumlah_pendaftar);
    i++;
  }
};
