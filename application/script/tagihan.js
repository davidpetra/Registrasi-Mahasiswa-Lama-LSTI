const createRow = (i, idTagihan, idMahasiswa, jumlah, status, sem, tahun, batas) => {
  let numCell = document.createElement('td');
  numCell.innerText = i;

  let idTagihanCell = document.createElement('td');
  idTagihanCell.innerText = idTagihan;
  idTagihanCell.className = "idTagihan";

  let idMahasiswaCell = document.createElement('td');
  idMahasiswaCell.innerText = idMahasiswa;
  idMahasiswaCell.className = "idMahasiswa";

  let jumlahCell = document.createElement('td');
  jumlahCell.innerText = jumlah;
  jumlahCell.className = "jumlah";

  let statusCell = document.createElement('td');
  statusCell.innerText = status;
  statusCell.className = "status";

  let semCell = document.createElement('td');
  semCell.innerText = sem;
  semCell.className = "sem";

  let tahunCell = document.createElement('td');
  tahunCell.innerText = tahun;
  tahunCell.className = "tahun";

  let batasCell = document.createElement('td');
  batasCell.innerText = batas;
  batasCell.className = "batas";

  let aksiCell = document.createElement('td');
  aksiCell.className = "aksi";
  aksiCell.innerHTML = `<span class="btn btn-info btn-sm" onclick="detail(${idTagihan})" >Edit</span>\
  <span class="btn btn-danger btn-sm" onclick="deleteTagihan(${idTagihan})" >Hapus</span>`


  let row = document.createElement('tr');
  row.appendChild(numCell);
  row.appendChild(idTagihanCell);
  row.appendChild(idMahasiswaCell);
  row.appendChild(jumlahCell);
  row.appendChild(statusCell);
  row.appendChild(semCell);
  row.appendChild(tahunCell);
  row.appendChild(batasCell);
  row.appendChild(aksiCell);

  let table = document.getElementById('table-body');
  table.appendChild(row);
};

const loadData = async () => {
  let result = await fetch('http://178.128.104.74/herregistrasimahasiswalama/tagihan');
  let json = await result.json();
  let table = document.getElementById('table-body');
  table.innerHTML = '';
  let i = 1;
  for (let data of json) {
    createRow(i, data.id_tagihan, data.id_mahasiswa, data.jumlah_bayar, data.status_bayar, data.semester, data.tahun, data.batas_bayar);
    i++;
  }
};


const detail = async (idTagihan) => {
  let urlPart = window.location.href.split('/');
  window.location = urlPart.splice(0, urlPart.length-1).join('/') + '/editTagihan.html';

  window.localStorage.setItem('idTagihan', idTagihan);
}

  let $ = (id) => document.getElementById(id);

const getTagihanById = async () => {

  let idTagihan = window.localStorage.getItem('idTagihan');
  let result = await fetch('http://178.128.104.74/herregistrasimahasiswalama/tagihan/' + idTagihan);
  let json = await result.json();
  let item = json;

// Tampilkan error
  if (item["response-code"] == "404" || item["response-code"] == "500" ) {
    alert(item["message"]);
    return;
  }


  let idTagihanElem = $('edit-idTagihan');
  let idMahasiswaElem = $('edit-idMahasiswa');
  let jumlahElem = $('edit-jumlah');
  let statusElem = $('edit-status');
  let semElem = $('edit-sem');
  let tahunElem = $('edit-tahun');
  let batasElem = $('edit-batas');

  idTagihanElem.value = item.id_tagihan;
  idMahasiswaElem.value = item.id_mahasiswa;
  jumlahElem.value = item.jumlah_bayar;
  statusElem.checked = item.status_bayar;
  semElem.value = item.semester;
  tahunElem.value = item.tahun;
  batasElem.value = item.batas_bayar;
};

const updateTagihan = async () => {
  let idTagihanElem = $('edit-idTagihan');
  let idMahasiswaElem = $('edit-idMahasiswa');
  let jumlahElem = $('edit-jumlah');
  let statusElem = $('edit-status');
  let semElem = $('edit-sem');
  let tahunElem = $('edit-tahun');
  let batasElem = $('edit-batas');

  console.log(idMahasiswaElem, idMahasiswaElem.value);

let id = window.localStorage.getItem('idTagihan');
  await fetch(`http://178.128.104.74/herregistrasimahasiswalama/tagihan/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"id_tagihan": parseInt(idTagihanElem.value),
      "id_mahasiswa": parseInt(idMahasiswaElem.value), 
      "jumlah_bayar": parseInt(jumlahElem.value), 
      "status_bayar": statusElem.checked, 
      "semester": parseInt(semElem.value),
      "tahun": tahunElem.value,
      "batas_bayar": batasElem.value
    })
  })
  let urlPart = window.location.href.split('/');
      window.location = urlPart.splice(0, urlPart.length-1).join('/') + '/tagihan.html';
};

const deleteTagihan = async (idTagihan) => {
window.localStorage.setItem('idTagihan', idTagihan);
let id = window.localStorage.getItem('idTagihan');
  await fetch(`http://178.128.104.74/herregistrasimahasiswalama/tagihan/${id}`, {
    method: 'DELETE'
  })
  let urlPart = window.location.href.split('/');
      window.location = urlPart.splice(0, urlPart.length-1).join('/') + '/tagihan.html';
};

////////////////
const buat = async () => {
  let idMahasiswaElem = $('edit-idMahasiswa');
  let jumlahElem = $('edit-jumlah');
  let semElem = $('edit-sem');
  let tahunElem = $('edit-tahun');
  let batasElem = $('edit-batas');



  let response = await fetch(`http://178.128.104.74/herregistrasimahasiswalama/tagihan`, {
    method: 'POST',
    mode:'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"id_mahasiswa": parseInt(idMahasiswaElem.value), 
      "jumlah_bayar": parseInt(jumlahElem.value), 
      "status_bayar": false, 
      "semester": parseInt(semElem.value),
      "tahun": tahunElem.value,
      "batas_bayar": batasElem.value
    })
  })

  let json = await response.json();
  console.log(json);
  // Tampilkan error
  let item = json;
  let responseCode = parseInt(item["response-code"])
  if ( responseCode >= 400 && responseCode < 600 ) {
    alert(item["message"]);
    return;
  }
//let urlPart = window.location.href.split('/');
//window.location = urlPart.splice(0, urlPart.length-1).join('/') + '/tagihanBaru.html';
}
