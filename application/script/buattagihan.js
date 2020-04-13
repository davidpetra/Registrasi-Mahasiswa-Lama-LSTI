const postTagihan = async () => {

  let idTagihanElem = $('idTagihan');
  let idMahasiswaElem = $('idMahasiswa');
  let statusBayarElem = $('statusBayar');
  let semesterElem = $('semester');
  let tahunElem = $('tahun');
  let batasBayarElem = $('batasBayar');

   console.log(
    JSON.stringify({
        "id_tagihan": parseInt(idTagihanElem.value),
        "id_mahasiswa": parseInt(idMahasiswaElem.value),
        "status_bayar": statusBayarElem.value,
        "semester": parseInt(semesterElem.value),
        "tahun": tahunElem.value,
        "batas_bayar": batasBayarElem.value
      })
    )

  await fetch(`http://178.128.104.74/herregistrasimahasiswalama/tagihan`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "id_tagihan": parseInt(idTagihanElem.value),
      "id_mahasiswa": parseInt(idMahasiswaElem.value),
      "status_bayar": statusBayarElem.value,
      "semester": parseInt(semesterElem.value),
      "tahun": tahunElem.value,
      "batas_bayar": batasBayarElem.value
    })
  })
 
   return;
};