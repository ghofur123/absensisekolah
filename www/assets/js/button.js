// button tambah end
$(document).on("click", ".btn-floating-new-data", function() {
    if (localStorage.getItem("menu") == "karyawan") {
        let contentValueKaryawan = "";
        $(".modal-header-view-all-class").html("Tambah Karyawan Baru");

        contentValueKaryawan += "<div class='row'>" +
            "    <form class='col s12'>" +
            "        <div class='row'>" +
            "            <div class='input-field col s12'>" +
            "                <input id='nama' type='text' required class='validate'>" +
            "                <label for='nama'>Nama</label>" +
            "            </div>" +
            "            <div class='input-field col s12'>" +
            "                <select name='' id='status_id'>" +
            "                  <option value='' disabled selected>Pilih status</option>" +
            "                  <option value='kepala sekolah'>Kepala</option>" +
            "                  <option value='guru'>Guru</option>" +
            "                  <option value='operator'>Operator</option>" +
            "                  <option value='tata usaha'>Tata Usaha</option>" +
            "                  <option value='satpam'>Satpam</option>" +
            "              </select>" +
            "            </div>" +
            "            <div class='input-field col s12'>" +
            "                <select name='' id='lembagaId'>" +
            "                  <option value='' disabled selected>Pilih Lembaga</option>";
        let lembagaRef = rootRef.ref("lembaga/");
        lembagaRef.on("child_added", function(data) {
            let dataValue = data.val();
            contentValueKaryawan += "<option value='" + dataValue.id_lembaga + "'>" + dataValue.nama_lembaga + "</option>";
            $(".progress").hide();
        });

        contentValueKaryawan += "</select>" +
            "            </div>" +
            "            <div class='input-field col s12'>" +
            "                <input id='username' type='text' required class='validate'>" +
            "                <label for='username'>Username</label>" +
            "            </div>" +
            "            <div class='input-field col s12'>" +
            "                <input id='password' type='text' required class='validate'>" +
            "                <label for='password'>Password</label>" +
            "            </div>" +
            "            <div class='input-field col s12'>" +
            "                <input id='img' type='file' class='validate'>" +
            "                <label for='img'>gambar</label>" +
            "            </div>" +
            "            <div class='input-field col s12'>" +
            "              <a class='tambah-karyawan-class waves-effect waves-light btn-small modal-close'>Tambah</a>" +
            "            </div>" +
            "        </div>" +
            "    </form>" +
            "</div>"
        $(".modal-content-view-all-class").html(contentValueKaryawan);
    } else if (localStorage.getItem("menu") == "lembaga") {
        $(".modal-header-view-all-class").html("Tambah Lembaga Baru");
        $(".modal-content-view-all-class").html(
            +"<div class='row'>" +
            "    <form class='col s12'>" +
            "        <div class='row'>" +
            "            <div class='input-field col s12'>" +
            "                <input id='namaLembaga' type='text' required class='validate'>" +
            "                <label for='nama'>Nama Lembaga</label>" +
            "            </div>" +
            "            <div class='input-field col s12'>" +
            "                <select name='' id='jenjang'>" +
            "                  <option value='' disabled selected>Pilih Jenjang</option>" +
            "                  <option value='SMK'>SMK</option>" +
            "                  <option value='MTS'>MTS</option>" +
            "                  <option value='MI'>MI</option>" +
            "                  <option value='pesantren'>Pesantren</option>" +
            "              </select>" +
            "            </div>" +
            "            <div class='input-field col s12'>" +
            "              <a class='tambah-lembaga-class waves-effect waves-light btn-small modal-close'>Tambah</a>" +
            "            </div>" +
            "        </div>" +
            "    </form>" +
            "</div>"
        );
    } else if (localStorage.getItem("menu") == "kelas") {
        $(".progress").show();
        $(".modal-header-view-all-class").html("Tambah Kelas Baru");
        let contentValue = "";
        contentValue += "<div class='row'>" +
            "    <form class='col s12'>" +
            "        <div class='row'>" +
            "            <div class='input-field col s12'>" +
            "                <input id='namaKelas' type='text' required class='validate'>" +
            "                <label for='nama'>Nama Kelas</label>" +
            "            </div>" +
            "            <div class='input-field col s12'>" +
            "                <select name='' id='lembagaId'>" +
            "                  <option value='' disabled selected>Pilih Lembaga</option>"
        let lembagaRef = rootRef.ref("lembaga/");
        lembagaRef.on("child_added", function(data) {
            let dataValue = data.val();
            contentValue += "<option value='" + dataValue.id_lembaga + "'>" + dataValue.nama_lembaga + "</option>";
            $(".progress").hide();
        });

        contentValue += "</select>" +
            "            </div>" +
            "            <div class='input-field col s12'>" +
            "              <a class='tambah-kelas-class waves-effect waves-light btn-small modal-close'>Tambah</a>" +
            "            </div>" +
            "        </div>" +
            "    </form>" +
            "</div>";
        $(".modal-content-view-all-class").html(contentValue);
    } else if (localStorage.getItem("menu") == "jadwal") {
        $(".progress").show();
        $(".modal-header-view-all-class").html("Tambah Jadwal Baru");
        let contentValue = "";
        contentValue += "<div class='row'>" +
            "    <form class='col s12'>" +
            "        <div class='row'>" +
            "            <div class='input-field col s12'>" +
            "                <input id='namaJadwal' type='text' required class='validate'>" +
            "                <label for='nama'>Nama Jadwal</label>" +
            "            </div>" +
            "            <div class='input-field col s12'>" +
            "                <input id='tglJadwal' type='date' class='validate'>" +
            "                <label for='nama'>tgl</label>" +
            "            </div>" +
            "            <div class='input-field col s12'>" +
            "                <select name='' id='jamKeJadwal'>" +
            "                  <option value='' disabled selected>Jam Ke</option>" +
            "                  <option value='1' >1</option>" +
            "                  <option value='2' >2</option>" +
            "                  <option value='3' >3</option>" +
            "                  <option value='4' >4</option>" +
            "                  <option value='5' >5</option>" +
            "                  <option value='6' >6</option>" +
            "                  <option value='7' >7</option>" +
            "                  <option value='8' >8</option>" +
            "                </select>" +
            "            </div>" +
            "            <div class='input-field col s12'>" +
            "                <select name='' id='lembagaIdSelectForm'>" +
            "                  <option value='' disabled selected>Pilih Lembaga</option>"
        let lembagaRef = rootRef.ref("lembaga/");
        lembagaRef.on("child_added", function(data) {
            let dataValue = data.val();
            contentValue += "<option value='" + dataValue.id_lembaga + "'>" + dataValue.nama_lembaga + "</option>";
            $(".progress").hide();
        });
        contentValue += "</select>" +
            "            </div>" +
            "            <div class='view-kelas-select-form-jadwal'></div>" +
            "            <div class='input-field col s12'>" +
            "                <select name='' id='kuotaKaryawan'>" +
            "                  <option value='' disabled selected>Kuota Karyawan</option>" +
            "                  <option value='1' >1</option>" +
            "                  <option value='2' >2</option>" +
            "                  <option value='3' >3</option>" +
            "                  <option value='4' >4</option>" +
            "                  <option value='5' >5</option>" +
            "                  <option value='6' >6</option>" +
            "                  <option value='7' >7</option>" +
            "                  <option value='8' >8</option>" +
            "                </select>" +
            "            </div>" +
            "            <div class='input-field col s12'>" +
            "              <a class='tambah-jadwal-class waves-effect waves-light btn-small modal-close'>Tambah</a>" +
            "            </div>" +
            "        </div>" +
            "    </form>" +
            "</div>";
        $(".modal-content-view-all-class").html(contentValue);
    } else if (localStorage.getItem("menu") == "qrcode") {
        $(".progress").show();
        $(".modal-header-view-all-class").html("Tambah QRCode Baru");
        let contentValue = "";
        contentValue += "<div class='row'>" +
            "    <form class='col s12'>" +
            "        <div class='row'>" +
            "            <div class='input-field col s12'>" +
            "                <input id='namaQrcode' type='text' required class='validate'>" +
            "                <label for='nama'>Nama QRCode</label>" +
            "            </div>" +
            "            <div class='input-field col s12'>" +
            "                <input id='nilaiQrcode' type='number' class='validate'>" +
            "                <label for='nama'>Nilai QRCode</label>" +
            "            </div>" +
            "            <div class='input-field col s12'>" +
            "                <select name='' id='lembagaIdSelectFormQrcode'>" +
            "                  <option value='' disabled selected>Pilih Lembaga</option>"
        let lembagaRef = rootRef.ref("lembaga/");
        lembagaRef.on("child_added", function(data) {
            let dataValue = data.val();
            contentValue += "<option value='" + dataValue.id_lembaga + "'>" + dataValue.nama_lembaga + "</option>";
            $(".progress").hide();
        });
        contentValue += "</select>" +
            "            </div>" +
            "            <div class='input-field col s12'>" +
            "              <a class='tambah-qrcode-class waves-effect waves-light btn-small modal-close'>Tambah</a>" +
            "            </div>" +
            "        </div>" +
            "    </form>" +
            "</div>";
        $(".modal-content-view-all-class").html(contentValue);
    } else if (localStorage.getItem("menu") == "absensi") {
        $(".modal-header-view-all-class").html("");
        $(".modal-content-view-all-class").html("");
    } else {
        $(".modal-header-view-all-class").html("");
        $(".modal-content-view-all-class").html("");
    }
});
// button tambah end
$(document).on("click", ".edit-button-karyawan-class", function() {
    $(".progress").show();
    let contentIsi = "";
    let karyawanId = $(this).attr("data");
    let db = rootRef.ref("karyawan/" + karyawanId);
    db.on("value", function(data) {
        let dataValue = data.val();
        console.log(dataValue);
        $(".modal-header-view-all-class").html("Edit Karyawan");

        contentIsi += "<div class='row'>" +
            "    <form class='col s12'>" +
            "        <div class='row'>" +
            "            <div class='input-field col s12'>" +
            "                <input type='text' required id='idEdit' hidden value='" + dataValue.id_karyawan + "' >" +
            "                <input id='namaEdit' type='text' required class='validate' value='" + dataValue.nama + "'>" +
            "                <label for='nama' class='active'>Nama</label>" +
            "            </div>" +
            "            <div class='input-field col s12'>" +
            "                <select name='' id='status_idEdit'>";

        if (dataValue.status == "kepala sekolah") {
            var kpl = "selected";
        } else if (dataValue.status == "guru") {
            var gr = "selected";
        } else if (dataValue.status == "operator") {
            var op = "selected";
        } else if (dataValue.status == "tata usaha") {
            var tu = "selected";
        } else if (dataValue.status == "satpam") {
            var st = "selected";
        } else {

        }
        contentIsi += "<option value='' disabled selected>Pilih status</option>" +
            "<option value='kepala sekolah' " + kpl + " >Kepala</option>" +
            "<option value='guru' " + gr + ">Guru</option>" +
            "<option value='operator' " + op + ">Operator</option>" +
            "<option value='tata usaha' " + tu + ">Tata Usaha</option>" +
            "<option value='satpam' " + st + ">Satpam</option>" +
            "              </select>" +
            "            </div>" +
            "            <div class='input-field col s12'>" +
            "                <select name='' id='lembagaIdEdit'>" +
            "                  <option value='' disabled selected>Pilih Lembaga</option>";
        let lembagaRef = rootRef.ref("lembaga/");
        lembagaRef.on("child_added", function(data) {
            let dataValueLembaga = data.val();
            if (dataValue.lembaga_id == dataValueLembaga.id_lembaga) {
                contentIsi += "<option value='" + dataValueLembaga.id_lembaga + "' selected>" + dataValueLembaga.nama_lembaga + "</option>";
            } else {
                contentIsi += "<option value='" + dataValueLembaga.id_lembaga + "'>" + dataValueLembaga.nama_lembaga + "</option>";
            }
        });

        contentIsi += "</select>" +
            "            </div>" +
            "            <div class='input-field col s12'>" +
            "                <input id='usernameEdit' type='text' required class='validate' value='" + dataValue.username + "'>" +
            "                <label for='username' class='active'>Username</label>" +
            "            </div>" +
            "            <div class='input-field col s12'>" +
            "                <input id='passwordEdit' type='text' required class='validate' value='" + dataValue.password + "'>" +
            "                <label for='password' class='active'>Password</label>" +
            "            </div>" +
            "            <div class='input-field col s12'>" +
            "                <input id='imgEdit' type='file'>" +
            "                <input id='imgEditFile' hidden type='text' required value='" + dataValue.img + "'>" +
            "                <label for='img' class='active'>gambar</label>" +
            "            </div>" +
            "            <div class='input-field col s12'>" +
            "              <a class='edit-karyawan-class waves-effect waves-light btn-small modal-close'>Edit</a>" +
            "            </div>" +
            "        </div>" +
            "    </form>" +
            "</div>"
        $(".modal-content-view-all-class").html(contentIsi);
        $(".progress").hide();
    });
});
// karyawan end

// lembaga start
$(document).on("click", ".edit-button-lembaga-class", function() {
    $(".progress").show();
    let contentIsi = "";
    let lembagaId = $(this).attr("data");
    let db = rootRef.ref("lembaga/" + lembagaId);
    db.on("value", function(data) {
        let dataValue = data.val();
        console.log(dataValue);
        $(".modal-header-view-all-class").html("Edit Lembaga");

        contentIsi += "<div class='row'>" +
            "    <form class='col s12'>" +
            "        <div class='row'>" +
            "            <div class='input-field col s12'>" +
            "                <input type='text' required id='idEdit' hidden value='" + dataValue.id_lembaga + "' >" +
            "                <input id='namaEdit' type='text' required class='validate' value='" + dataValue.nama_lembaga + "'>" +
            "                <label for='nama' class='active'>Nama Lembaga</label>" +
            "            </div>" +
            "            <div class='input-field col s12'>" +
            "                <select name='' id='jenjangEdit'>";

        if (dataValue.jenjang == "SMK") {
            var smkV = "selected";
        } else if (dataValue.jenjang == "MTS") {
            var mtsV = "selected";
        } else if (dataValue.jenjang == "MI") {
            var miV = "selected";
        } else if (dataValue.jenjang == "pesantren") {
            var pesantrenV = "selected";
        } else {}
        contentIsi += "      <option value='' disabled selected>Pilih Jenjang</option>" +
            "                  <option value='SMK' " + smkV + ">SMK</option>" +
            "                  <option value='MTS' " + mtsV + ">MTS</option>" +
            "                  <option value='MI' " + miV + ">MI</option>" +
            "                  <option value='pesantren' " + pesantrenV + ">Pesantren</option>" +
            "              </select>" +
            "            </div>" +
            "            <div class='input-field col s12'>" +
            "              <a class='edit-lembaga-class waves-effect waves-light btn-small modal-close'>Edit</a>" +
            "            </div>" +
            "        </div>" +
            "    </form>" +
            "</div>"
        $(".modal-content-view-all-class").html(contentIsi);
        $(".progress").hide();
    });
});
// lembaga end

// kelas start
$(document).on("click", ".edit-button-kelas-class", function() {
    $(".progress").show();
    let idKelas = $(this).attr("data");
    let db = rootRef.ref("kelas/" + idKelas);
    db.on("value", function(data) {
        let dataResultKelas = data.val();
        let contentValue = "";
        $(".modal-header-view-all-class").html("Edit Kelas");
        contentValue += "<div class='row'>" +
            "    <form class='col s12'>" +
            "        <div class='row'>" +
            "            <div class='input-field col s12'>" +
            "                <input id='idKelasEdit' type='text' required hidden class='validate' value='" + dataResultKelas.id_kelas + "'>" +
            "                <input id='namaKelasEdit' type='text' required class='validate' value='" + dataResultKelas.nama_kelas + "'>" +
            "                <label for='nama' class='active'>Nama Kelas</label>" +
            "            </div>" +
            "            <div class='input-field col s12'>" +
            "                <select name='' id='lembagaIdEdit'>" +
            "                  <option value='' disabled selected>Pilih Lembaga</option>"
        let lembagaRef = rootRef.ref("lembaga/");
        lembagaRef.on("child_added", function(data) {
            let dataResultLembaga = data.val();
            if (dataResultKelas.lembaga_id == dataResultLembaga.id_lembaga) {
                contentValue += "<option value='" + dataResultLembaga.id_lembaga + "' selected>" + dataResultLembaga.nama_lembaga + "</option>";
            } else {
                contentValue += "<option value='" + dataResultLembaga.id_lembaga + "'>" + dataResultLembaga.nama_lembaga + "</option>";
            }
            $(".progress").hide();
        });

        contentValue += "</select>" +
            "            </div>" +
            "            <div class='input-field col s12'>" +
            "              <a class='edit-kelas-class waves-effect waves-light btn-small modal-close'>Edit</a>" +
            "            </div>" +
            "        </div>" +
            "    </form>" +
            "</div>";
        $(".modal-content-view-all-class").html(contentValue);
        $(".progress").hide();
    });
});
// kelas end

// jadwal start
$(document).on("click", ".edit-button-jadwal-class", function() {
    let thnTglFormatValue = $(this).attr("data2").replace("-", "/");
    let idJadwal = $(this).attr("data");
    $(".modal-header-view-all-class").html("Edit Jadwal");
    let jadwalRef = rootRef.ref("jadwal/" + thnTglFormatValue + "/" + localStorage.getItem("lembagaIdSave") + "/" + idJadwal);
    jadwalRef.on("value", function(dataJadwalValue) {
        let resultJadwal = dataJadwalValue.val();
        console.log(resultJadwal);
        let contentValue = "";
        contentValue += "<div class='row'>" +
            "    <form class='col s12'>" +
            "        <div class='row'>" +
            "            <div class='input-field col s12'>" +
            "                <input id='folderJadwalBase' hidden type='text' required class='validate' value='jadwal/" + thnTglFormatValue + "/" + localStorage.getItem("lembagaIdSave") + "/" + idJadwal + "'>" +
            "                <input id='idJadwalEdit' hidden type='text' required class='validate' value='" + resultJadwal.id_jadwal + "'>" +
            "                <input id='namaJadwalEdit' type='text' required class='validate' value='" + resultJadwal.nama_jadwal + "'>" +
            "                <label for='nama' class='active'>Nama Jadwal</label>" +
            "            </div>" +
            "            <div class='input-field col s12'>" +
            "                <input id='tglJadwalEdit' type='date' class='validate' value='" + resultJadwal.tgl + "'>" +
            "                <label for='nama' class='active'>tgl</label>" +
            "            </div>" +
            "            <div class='input-field col s12'>" +
            "                <select name='' id='jamKeJadwalEdit'>" +
            "                  <option value='' disabled selected>Jam Ke</option>";
        for (let i = 1; i < 10; i++) {
            if (i == resultJadwal.jam) {
                contentValue += " <option value='" + i + "' selected>" + i + "</option>";
            } else {
                contentValue += " <option value='" + i + "' >" + i + "</option>";
            }
        }
        contentValue += "   </select>" +
            "            </div>" +
            "            <div class='input-field col s12'>" +
            "                <select name='' id='lembagaIdSelectForm'>" +
            "                  <option value='' disabled selected>Pilih Lembaga</option>"
        let lembagaRef = rootRef.ref("lembaga/");
        lembagaRef.on("child_added", function(data) {
            let dataValue = data.val();
            if (dataValue.id_lembaga == resultJadwal.lembaga_id) {
                contentValue += "<option value='" + dataValue.id_lembaga + "' selected>" + dataValue.nama_lembaga + "</option>";
            } else {
                contentValue += "<option value='" + dataValue.id_lembaga + "'>" + dataValue.nama_lembaga + "</option>";
            }
        });
        contentValue += "</select>" +
            "            </div>" +
            "            <div class='view-kelas-select-form-jadwal'></div>" +
            "            <div class='input-field col s12'>" +
            "                <select name='' id='kuotaKaryawanEdit'>" +
            "                  <option value='' disabled selected>Kuota Karyawan</option>"
        for (let ii = 1; ii < 10; ii++) {
            if (ii == resultJadwal.kuota) {
                contentValue += " <option value='" + ii + "' selected>" + ii + "</option>";
            } else {
                contentValue += " <option value='" + ii + "' >" + ii + "</option>";
            }
        }
        contentValue += "   </select>" +
            "            </div>" +
            "            <div class='input-field col s12'>" +
            "              <a class='edit-jadwal-class waves-effect waves-light btn-small modal-close'>Edit</a>" +
            "            </div>" +
            "        </div>" +
            "    </form>" +
            "</div>";
        $(".modal-content-view-all-class").html(contentValue);
    })
})
// jadwal end

// qrcode start
$(document).on("click", ".edit-button-qrcode-class", function() {
    $(".progress").show();
    $(".modal-header-view-all-class").html("Edit QRCode");
    let idQrcode = $(this).attr("data");
    let contentValue = "";
    let qrcodeRef = rootRef.ref("qrcode/" + idQrcode);
    qrcodeRef.on("value", function(dataQrcode) {
        let qrcodeResult = dataQrcode.val();
        contentValue += "<div class='row'>" +
            "    <form class='col s12'>" +
            "        <div class='row'>" +
            "            <div class='input-field col s12'>" +
            "                <input id='idQrcode' type='text' hidden required class='validate' value='" + qrcodeResult.id_qrcode + "'>" +
            "                <input id='namaQrcode' type='text' required class='validate' value='" + qrcodeResult.nama_qrcode + "'>" +
            "                <label for='nama' class='active'>Nama QRCode</label>" +
            "            </div>" +
            "            <div class='input-field col s12'>" +
            "                <input id='nilaiQrcode' type='number' class='validate' value='" + qrcodeResult.nilai_qrcode + "'>" +
            "                <label for='nama' class='active'>Nilai QRCode</label>" +
            "            </div>" +
            "            <div class='input-field col s12'>" +
            "                <select name='' id='lembagaIdQrcode'>" +
            "                  <option value='' disabled selected>Pilih Lembaga</option>"
        let lembagaRef = rootRef.ref("lembaga/");
        lembagaRef.on("child_added", function(data) {
            let dataValue = data.val();
            if (dataValue.id_lembaga == qrcodeResult.lembaga_id) {
                contentValue += "<option value='" + dataValue.id_lembaga + "' selected>" + dataValue.nama_lembaga + "</option>";
            } else {
                contentValue += "<option value='" + dataValue.id_lembaga + "'>" + dataValue.nama_lembaga + "</option>";
            }
            $(".progress").hide();
        });
        contentValue += "</select>" +
            "            </div>" +
            "            <div class='input-field col s12'>" +
            "              <a class='edit-qrcode-class waves-effect waves-light btn-small modal-close'>Edit</a>" +
            "            </div>" +
            "        </div>" +
            "    </form>" +
            "</div>";
        $(".modal-content-view-all-class").html(contentValue);
    });

})
// qrcode end