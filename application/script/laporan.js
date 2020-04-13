const createRow = (i, tahun, total, sudah, belum) => {


  let numCell = document.createElement('td');
  numCell.innerText = i;

  let tahunCell = document.createElement('td');
  tahunCell.innerText = tahun;
  tahunCell.className = "tahun";

  let totalCell = document.createElement('td');
  totalCell.innerText = total;
  totalCell.className = "total";

  let sudahCell = document.createElement('td');
  sudahCell.innerText = sudah;
  sudahCell.className = "sudah";

  let belumCell = document.createElement('td');
  belumCell.innerText = belum;
  belumCell.className = "belum";

  let row = document.createElement('tr');
  row.appendChild(numCell);
  row.appendChild(tahunCell);
  row.appendChild(totalCell);
  row.appendChild(sudahCell);
  row.appendChild(belumCell);
  let table = document.getElementById('table-body');
  table.appendChild(row);
};

const loadData = async () => {
  let result = await fetch('http://178.128.104.74/herregistrasimahasiswalama/laporan');
  let json = await result.json();
  let table = document.getElementById('table-body');
  table.innerHTML = '';
  let i = 1;
  for (let data of json) {
    createRow(i, data.tahun, data.total_pemasukan, data.sudah_bayar, data.belum_bayar);
    i++;
  }
};
