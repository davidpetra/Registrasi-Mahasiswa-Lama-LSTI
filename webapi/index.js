// Tugas Besar LSTI - Grup 8
// Registrasi Mahasiswa Lama

// Setting & import module-module
const express = require("express"),
    bodyParser = require("body-parser");

const app = express();

//enabling cors
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
    next();
});

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());

require("dotenv").config();

connectDB = {
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME
};

const pgp = require("pg-promise")();
const CONNECT_DB =
    "postgres://" +
    connectDB.user +
    ":" +
    connectDB.pass +
    "@" +
    connectDB.host +
    ":" +
    connectDB.port +
    "/" +
    connectDB.name;
const db = pgp(CONNECT_DB);
const QueryResultError = pgp.errors.QueryResultError;
const QueryResultCode = pgp.errors.queryResultErrorCode;

// query beasiswa
function getBeasiswa() {
    return new Promise((resolve, reject) => {
        db.any("SELECT * FROM beasiswa ORDER BY id_beasiswa")
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            });
    });
}

function getBeasiswaID(id) {
    return new Promise((resolve, reject) => {
        db.one("SELECT * FROM beasiswa WHERE id_beasiswa = $1", id)
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            });
    });
}

// query mahasiswa
function getMahasiswa() {
    return new Promise((resolve, reject) => {
        db.any("SELECT * FROM mahasiswa ORDER BY id_mahasiswa")
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            });
    });
}

function getMahasiswaID(id) {
    return new Promise((resolve, reject) => {
        db.one("SELECT * FROM mahasiswa WHERE id_mahasiswa = $1", id)
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            });
    });
}

function updateMahasiswa(id, data) {
    return new Promise((resolve, reject) => {
        db.none(
            "UPDATE mahasiswa SET id_beasiswa = $1, terima_beasiswa = $2, besaran_beasiswa = $3, kelompok_ukt = $4, besaran_ukt = $5 WHERE id_mahasiswa = $6",
            [
                data.id_beasiswa,
                data.terima_beasiswa,
                data.besaran_beasiswa,
                data.kelompok_ukt,
                data.besaran_ukt,
                id
            ]
        )
            .then(function () {
                console.log("Success update mahasiswa");
                resolve(data);
            })
            .catch(err => {
                console.log(err);
                reject(err);
            });
    });
}

// query penerima beasiswa
function getPenerimaBeasiswa() {
    return new Promise((resolve, reject) => {
        db.any(
            "SELECT * FROM mahasiswa WHERE terima_beasiswa = TRUE ORDER BY id_mahasiswa"
        )
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            });
    });
}

function getPenerimaBeasiswaID(id) {
    return new Promise((resolve, reject) => {
        db.one(
            "SELECT * FROM mahasiswa WHERE terima_beasiswa = TRUE AND id_mahasiswa = $1",
            id
        )
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            });
    });
}

function getPenerimaBeasiswabyIDBeasiswa(id) {
    return new Promise((resolve, reject) => {
        db.any(
            "SELECT id_mahasiswa, nama_mahasiswa, nim, fakultas, jurusan, semester FROM mahasiswa WHERE terima_beasiswa = TRUE AND id_beasiswa = $1 ORDER BY id_mahasiswa",
            id
        )
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            });
    });
}

// query tagihan
function getTagihan() {
    return new Promise((resolve, reject) => {
        db.any("SELECT * FROM tagihan ORDER BY id_tagihan")
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            });
    });
}

function getTagihanID(id) {
    return new Promise((resolve, reject) => {
        db.one("SELECT * FROM tagihan WHERE id_tagihan = $1", id)
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            });
    });
}

function getLaporan() {
    return new Promise((resolve, reject) => {
        db.any(
            'SELECT tahun, SUM(jumlah_bayar) AS total_pemasukan, COUNT(*) FILTER (WHERE "status_bayar") AS sudah_bayar, COUNT(*) FILTER (WHERE NOT "status_bayar") AS belum_bayar FROM tagihan GROUP BY tahun'
        )
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            });
    });
}

function addTagihan(data) {
    return new Promise((resolve, reject) => {
        db.none(
            "INSERT INTO tagihan(id_mahasiswa, jumlah_bayar, status_bayar, semester, tahun, batas_bayar) VALUES($1,$2,$3,$4,$5,$6)",
            [
                data.id_mahasiswa,
                data.jumlah_bayar,
                data.status_bayar,
                data.semester,
                data.tahun,
                data.batas_bayar
            ]
        )
            .then(function () {
                console.log("Success add tagihan");
                resolve(data);
            })
            .catch(err => {
                console.log(err);
                reject(err);
            });
    });
}

function updateTagihan(id, data) {
    return new Promise((resolve, reject) => {
        db.none(
            "UPDATE tagihan SET jumlah_bayar = $1, status_bayar = $2, semester = $3, tahun = $4, batas_bayar = $5 WHERE id_tagihan = $6",
            [
                data.jumlah_bayar,
                data.status_bayar,
                data.semester,
                data.tahun,
                data.batas_bayar,
                id
            ]
        )
            .then(function () {
                console.log("Success update tagihan");
                resolve(data);
            })
            .catch(err => {
                console.log(err);
                reject(err);
            });
    });
}

function deleteTagihan(id) {
    return new Promise((resolve, reject) => {
        db.none("DELETE FROM tagihan WHERE id_tagihan = $1", id)
            .then(function () {
                //console.log("Success delete tagihan");
                resolve("Success delete tagihan");
            })
            .catch(err => {
                console.log(err);
                reject(err);
            });
    });
}


// ENDPOINT
// GET seluruh beasiswa yang ada
app.get("/beasiswa", function (req, res) {
    getBeasiswa()
        .then(result => {
            console.log("Success GET all beasiswa");
            res.json(result);
        })
        .catch(err => {
            console.log(err);
            res.json({
                "response-code": "500",
                message: "Error 500: Internal server error!"
            });
        });
});

// GET seluruh penerima beasiswa
app.get("/beasiswa/hasil", function (req, res) {
    getPenerimaBeasiswa()
        .then(result => {
            console.log("Success GET penerima beasiswa");
            res.json(result);
        })
        .catch(err => {
            console.log(err);
            res.json({
                "response-code": "500",
                message: "Error 500: Internal server error!"
            });
        });
});

// GET seorang mahasiswa yang menerima mendapatkan beasiswa
app.get("/beasiswa/hasil/:id", function (req, res) {
    getPenerimaBeasiswaID(req.params.id)
        .then(result => {
            console.log("Success GET penerima beasiswa by ID");
            res.json(result);
        })
        .catch(err => {
            console.log(err);
            if (err instanceof QueryResultError) {
                if (err.code === QueryResultCode.noData) {
                    res.json({
                        "response-code": "404",
                        message: "Error 404: Tidak ada data yang ditemukan!"
                    });
                } else {
                    res.json({
                        "response-code": "500",
                        message: "Error 500: Internal server error!"
                    });
                }
            } else {
                res.json({
                    "response-code": "500",
                    message: "Error 500: Internal server error!"
                });
            }
        });

});

// GET beasiswa berdasarkan ID
app.get("/beasiswa/:id", function (req, res) {
    getBeasiswaID(req.params.id)
        .then(result => {
            console.log("Success GET beasiswa by ID");
            res.json(result);
        })
        .catch(err => {
            console.log(err);
            if (err instanceof QueryResultError) {
                if (err.code === QueryResultCode.noData) {
                    res.json({
                        "response-code": "404",
                        message: "Error 404: Tidak ada data yang ditemukan!"
                    });
                } else {
                    res.json({
                        "response-code": "500",
                        message: "Error 500: Internal server error!"
                    });
                }
            } else {
                res.json({
                    "response-code": "500",
                    message: "Error 500: Internal server error!"
                });
            }
        });
});

// GET daftar mahasiswa yang mendapatkan beasiswa dengan ID tertentu
app.get("/beasiswa/:id/hasil", function (req, res) {
    getPenerimaBeasiswabyIDBeasiswa(req.params.id)
        .then(result => {
            console.log("Success GET penerima beasiswa by ID Beasiswa");
            res.json(result);
        })
        .catch(err => {
            console.log(err);
            if (err instanceof QueryResultError) {
                if (err.code === QueryResultCode.noData) {
                    res.json({
                        "response-code": "404",
                        message: "Error 404: Tidak ada data yang ditemukan!"
                    });
                } else {
                    res.json({
                        "response-code": "500",
                        message: "Error 500: Internal server error!"
                    });
                }
            } else {
                res.json({
                    "response-code": "500",
                    message: "Error 500: Internal server error!"
                });
            }
        });

});


// GET seluruh mahasiswa yang ada
app.get("/mahasiswa", function (req, res) {
    getMahasiswa()
        .then(result => {
            console.log("Success GET all mahasiswa");
            res.json(result);
        })
        .catch(err => {
            console.log(err);
            res.json({
                "response-code": "500",
                message: "Error 500: Internal server error!"
            });
        });
});

// GET mahasiswa berdasarkan ID
app.get("/mahasiswa/:id", function (req, res) {
    getMahasiswaID(req.params.id)
        .then(result => {
            console.log("Success GET mahasiswa by ID");
            res.json(result);
        })
        .catch(err => {
            console.log(err);
            if (err instanceof QueryResultError) {
                if (err.code === QueryResultCode.noData) {
                    res.json({
                        "response-code": "404",
                        message: "Error 404: Tidak ada data yang ditemukan!"
                    });
                } else {
                    res.json({
                        "response-code": "500",
                        message: "Error 500: Internal server error!"
                    });
                }
            } else {
                res.json({
                    "response-code": "500",
                    message: "Error 500: Internal server error!"
                });
            }
        });
});

// PUT (EDIT) sebuah mahasiswa
app.put("/mahasiswa/:id", function (req, res) {
    updateMahasiswa(req.params.id, req.body)
        .then(result => {
            console.log(result);
            res.json({
                "response-code": "200",
                message: "Berhasil mengupdate data mahasiswa!"
            });
        })
        .catch(err => {
            console.log(err);
            res.json({
                "response-code": "500",
                message: "Error 500: Internal server error!"
            });
        });
});

// GET seluruh tagihan yang ada
app.get("/tagihan", function (req, res) {
    getTagihan()
        .then(result => {
            console.log("Success GET all tagihan");
            res.json(result);
        })
        .catch(err => {
            console.log(err);
            res.json({
                "response-code": "500",
                message: "Error 500: Internal server error!"
            });
        });
});

// GET tagihan berdasarkan ID
app.get("/tagihan/:id", function (req, res) {
    getTagihanID(req.params.id)
        .then(result => {
            console.log("Success GET tagihan by ID");
            res.json(result);
        })
        .catch(err => {
            console.log(err);
            if (err instanceof QueryResultError) {
                if (err.code === QueryResultCode.noData) {
                    res.json({
                        "response-code": "404",
                        message: "Error 404: Tidak ada data yang ditemukan!"
                    });
                } else {
                    res.json({
                        "response-code": "500",
                        message: "Error 500: Internal server error!"
                    });
                }
            } else {
                res.json({
                    "response-code": "500",
                    message: "Error 500: Internal server error!"
                });
            }
        });
});

// GET laporan
app.get("/laporan", function (req, res) {
    getLaporan()
        .then(result => {
            console.log("Success GET laporan");
            res.json(result);
        })
        .catch(err => {
            console.log(err);
            res.json({
                "response-code": "500",
                message: "Error 500: Internal server error!"
            });
        });
});

// POST (ADD) sebuah tagihan
app.post("/tagihan", function (req, res) {
    addTagihan(req.body)
        .then(result => {
            console.log(result);
            res.json({
                "response-code": "200",
                message: "Berhasil menambahkan tagihan!"
            });
        })
        .catch(err => {
            console.log(err);
            res.json({
                "response-code": "500",
                message: "Error 500: Internal server error!"
            });
        });
});

// PUT (EDIT) sebuah tagihan
app.put("/tagihan/:id", function (req, res) {
    updateTagihan(req.params.id, req.body)
        .then(result => {
            console.log(result);
            res.json({
                "response-code": "200",
                message: "Berhasil mengupdate data tagihan!"
            });
        })
        .catch(err => {
            console.log(err);
            res.json({
                "response-code": "500",
                message: "Error 500: Internal server error!"
            });
        });
});

// DELETE (HAPUS) sebuah tagihan
app.delete("/tagihan/:id", function (req, res) {
    deleteTagihan(req.params.id)
        .then(result => {
            console.log(result);
            res.json({
                "response-code": "200",
                message: "Berhasil menghapus data tagihan!"
            });
        })
        .catch(err => {
            console.log(err);
            res.json({
                "response-code": "500",
                message: "Error 500: Internal server error!"
            });
        });
});

// Menjalankan Server
app.listen(3000);
