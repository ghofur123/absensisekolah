$(document).on("change", ".lembagaSelectAllFunction", function() {
    let lembagaIdGetForm = $(this).val();
    if (localStorage.getItem("menu") == "karyawan") {
        $(".progress").show();
        let no = 1;
        let karyawanArray = "";
        karyawanArray += '<table class="kelompok-load-class">' +
            "<thead>" +
            "<tr>" +
            "<th>No</th>" +
            "<th>Nama</th>" +
            "<th>Status</th>" +
            "<th>ACT</th>" +
            "</tr>" +
            "</thead>" +
            "<tbody>";
        // select * from karyawan where lembaga_id = value
        let dbKaryawan = rootRef.ref("karyawan/");
        dbKaryawan.orderByChild("lembaga_id").equalTo(lembagaIdGetForm).on("child_added", function(data) {
            let dataValue = data.val();
            setTimeout(function() {
                var number = no++;
                karyawanArray += "  <tr>" +
                    "    <td>" + number + "</td>" +
                    "    <td>" + dataValue.nama + "</td>" +
                    "    <td>" + dataValue.status + "</td>" +
                    "    <td>" +
                    "      <a class='edit-button-karyawan-class waves-effect waves-light btn-small modal-trigger' data='" + dataValue.id_karyawan + "' href='#modal1'><img class='img-button-act' src='assets/img/outline_edit_black_24dp.png' alt=''></a>" +
                    "      <a class='delete-button-karyawab-class waves-effect red btn-small' data='" + dataValue.id_karyawan + "' value='" + dataValue.img + "'><img class='img-button-act' src='assets/img/outline_delete_black_24dp.png' alt='' srcset=''></a>" +
                    "    </td>" +
                    "  </tr>";
                $(".karyawan-load-class").html(karyawanArray + "</tbody></table>");
                $(".progress").hide();
            }, 1000);
        })
    } else if (localStorage.getItem("menu") == "kelas") {
        $(".progress").show();
        let no = 1;
        let kelasArray = "";
        kelasArray += '<table class="kelompok-load-class">' +
            "<thead>" +
            "<tr>" +
            "<th>No</th>" +
            "<th>Nama Kelas</th>" +
            "<th>Lembaga</th>" +
            "</tr>" +
            "</thead>" +
            "<tbody>";
        let kelasRef = rootRef.ref("kelas/");
        let lembagaRef = rootRef.ref("lembaga/");
        // where lembaga_id = lembagaIdGetForm
        // ini seperti query join antara kelas dan lembaga
        kelasRef.orderByChild("lembaga_id").equalTo(lembagaIdGetForm).on("child_added", function(dataKelas) {
            let dataValKelas = dataKelas.val();
            lembagaRef.child(dataValKelas.lembaga_id).on("value", function(dataLembaga) {
                let dataValLembaga = dataLembaga.val();
                setTimeout(function() {
                    kelasArray += "  <tr>" +
                        "    <td>" + no++ + "</td>" +
                        "    <td>" + dataValKelas.nama_kelas + "</td>" +
                        "    <td>" + dataValLembaga.nama_lembaga + "</td>" +
                        "    <td>" +
                        "      <a class='edit-button-kelas-class waves-effect waves-light btn-small modal-trigger' data='" + dataValKelas.id_kelas + "' href='#modal1'><img class='img-button-act' src='assets/img/outline_edit_black_24dp.png' alt=''></a>" +
                        "      <a class='delete-button-kelas-class waves-effect red btn-small' data='" + dataValKelas.id_kelas + "'><img class='img-button-act' src='assets/img/outline_delete_black_24dp.png' alt='' srcset=''></a>" +
                        "    </td>" +
                        "  </tr>";
                    $(".kelas-load-class").html(kelasArray + "</tbody></table>");
                    $(".progress").hide();
                }, 1000);
            });
        });
    } else if (localStorage.getItem("menu") == "jadwal") {
        $("#tahunSelectFormJadawal1").show();
    } else if (localStorage.getItem("menu") == "qrcode") {
        $(".qrcode-load-class").html("");
        localStorage.setItem("lembagaIdStorageLoadQrcode", lembagaIdGetForm);
        loadQrcode();
    } else if (localStorage.getItem("menu") == "absensi") {
        localStorage.setItem("selectLembagaIdValue", lembagaIdGetForm);
        loadJadwalAbsensi();
    } else if (localStorage.getItem("menu") == "laporan") {
        localStorage.setItem("lembagaIdSaveLaporan", lembagaIdGetForm);
        loadKaryawanLaporan();
    } else {}
});