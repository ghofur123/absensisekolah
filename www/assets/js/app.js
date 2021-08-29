// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAptcWZb57Fpn5zlTy8I0x7-7JYKjU_gyc",
    authDomain: "adminsekolah-f425d.firebaseapp.com",
    projectId: "adminsekolah-f425d",
    storageBucket: "adminsekolah-f425d.appspot.com",
    messagingSenderId: "1059592588944",
    appId: "1:1059592588944:web:64480a07daae0429ea1215"
  };
firebase.initializeApp(firebaseConfig);
// firebase root
// realtime database reff
let rootRef = firebase.database();

// storage ref
let storage = firebase.storage();
let storageRef = storage.ref()
// end firebase root
function checkAppsAll() {
    if(navigator.onLine){
        navigator.geolocation.getCurrentPosition(function(position){
            localStorage.setItem("checkLatitudeGeoLocationOnOf", position.coords.latitude);
        }, onError);
        if (localStorage.getItem("checkLatitudeGeoLocationOnOf") == null || localStorage.getItem("checkLatitudeGeoLocationOnOf") == "") {
            // geoLocation Not Detection
            alert("Lokasi tidak terdeteksi atau gps belum aktif");
            $(".menu-nav").attr("class", "subhedar");
        } else {
            console.log("geo Ok");
        }
    } else {
        alert("Anda Dalam Keadaan offline Periksa Koneksi")
        // offline
        // $(".menu-nav").attr("class", "subhedar");
    }
    
}
$(document).ready(function(){
    // checkAppsAll();
    $('.sidenav').sidenav();
    $('.modal').modal();
    loadLembagaSelect();
    if (localStorage.getItem("karyawanIdLogin") == null || localStorage.getItem("karyawanIdLogin") == "") {
        $(".body-dashboard").hide();
        window.location.href="login.html";
    } else {
        $(".body-dashboard").show();
    }
});
// karyawan start
$(document).on("click", ".tambah-karyawan-class", function() {
    let idV = new Date().getTime();
    let namaV = $("#nama").val();
    let statusV = $("#status_id").val();
    let lembagaId = $("#lembagaId").val();
    let usernameV = $("#username").val();
    let passwordV = $("#password").val();
    
    let imgV = $("#img").get(0).files[0];
    var sto = storageRef.child("karyawan/"+ idV+"-"+imgV.name);

    sto.put(imgV);

    let db = rootRef.ref("karyawan/" + idV);
    db.set({
        id_karyawan : idV,
        nama: namaV,
        status: statusV,
        lembaga_id: lembagaId,
        username: usernameV,
        password: passwordV,
        img: idV+"-"+imgV.name
    });
    setTimeout(function() {
        $("input:text").val("");
    }, 200);
})
$(document).on("click", ".edit-karyawan-class", function() {
    $(".progress").show();
    let idV = $("#idEdit").val();
    let namaV = $("#namaEdit").val();
    let statusV = $("#status_idEdit").val();
    let lembagaIdEdit = $("#lembagaIdEdit").val();
    let usernameV = $("#usernameEdit").val();
    let passwordV = $("#passwordEdit").val();
    let db = rootRef.ref("karyawan/" + idV);

    let imgEditFile = $("#imgEditFile").val();
    let imgV = $("#imgEdit").get(0).files[0];
    let idUniq = new Date().getTime();
    let fileUpload = storageRef.child("karyawan/"+ idUniq+"-"+imgV.name);
    fileUpload.put(imgV);
    db.set({
        id_karyawan : idV,
        nama: namaV,
        status: statusV,
        lembaga_id: lembagaIdEdit, 
        username: usernameV,
        password: passwordV,
        img: idUniq+"-"+imgV.name
    });

    let deleteImagesBase = storageRef.child('karyawan/' + imgEditFile);
    deleteImagesBase.delete().then(function() {
        }).catch(function(error) {
        });
    setTimeout(function() {
        loadKaryawan();
    }, 1000);
});
$(document).on("click", ".delete-button-karyawab-class", function () {
    if (confirm("Hapus")) {
        let idKaryawan = $(this).attr("data");
        let db = rootRef.ref("karyawan/" + idKaryawan);
        db.remove();

        // delete file
        let imgageFile = $(this).attr("value");
        var desertRef = storageRef.child('karyawan/' + imgageFile);
        desertRef.delete().then(function() {
        }).catch(function(error) {
        });
        loadKaryawan();
    }else{}
});
function loadLembagaSelect() {
    $(".progress").show();
    let itemLembaga = "";
    setTimeout(function() {
        itemLembaga +="<div class='input-field col s12'>"
        +"         <select name='' class='lembagaSelectAllFunction'>"
        +"             <option value='' disabled selected>Pilih Lembaga</option>"
        let lembagaRef = rootRef.ref("lembaga/");
        lembagaRef.on("child_added", function(data) {
            let dataValue = data.val();
            itemLembaga += "<option value='"+dataValue.id_lembaga+"'>"+dataValue.nama_lembaga+"</option>";
            $(".progress").hide();
        });
        itemLembaga += "</select>";
        $(".load-lembaga-view-select-class").html(itemLembaga);
    }, 1000);
}
// karyawan end

// lembaga start
$(document).on("click", ".tambah-lembaga-class", function() {
    $(".progress").show();
    let idLembaga = new Date().getTime();
    let namaLembaga = $("#namaLembaga").val();
    let jenjang = $("#jenjang").val();
    let db = rootRef.ref("lembaga/" + idLembaga);
    db.set({
        id_lembaga : idLembaga,
        nama_lembaga: namaLembaga,
        jenjang: jenjang
    });
    setTimeout(function() {
        $("input:text").val("");
        $(".progress").hide();
    }, 200);
});
function loadLembaga(){
    $(".progress").show();
    let no = 1;
    let lembagaArray = "";
    lembagaArray += '<table class="kelompok-load-class">'
    +"<thead>"
    +"<tr>"
    +"<th>No</th>"
    +"<th>Nama Lembaga</th>"
    +"<th>Jenjang</th>"
    +"</tr>"
    +"</thead>"
    +"<tbody>";
    let db = rootRef.ref("lembaga/");
    db.on("child_added", function(data) {
        let dataValue = data.val();
        setTimeout(function(){
                lembagaArray +="  <tr>"
                +"    <td>"+no++ +"</td>"
                +"    <td>"+ dataValue.nama_lembaga+"</td>"
                +"    <td>"+ dataValue.jenjang+"</td>"
                +"    <td>"
                +"      <a class='edit-button-lembaga-class waves-effect waves-light btn-small modal-trigger' data='"+ dataValue.id_lembaga +"' href='#modal1'><img class='img-button-act' src='assets/img/outline_edit_black_24dp.png' alt=''></a>"
                +"      <a class='delete-button-lembaga-class waves-effect red btn-small' data='"+ dataValue.id_lembaga +"'><img class='img-button-act' src='assets/img/outline_delete_black_24dp.png' alt='' srcset=''></a>"
                +"    </td>"
                +"  </tr>";
            $(".lembaga-load-class").html(lembagaArray + "</tbody></table>");
            $(".progress").hide();    
        }, 1000);
    });
}
$(document).on("click", ".edit-lembaga-class", function() {
    let idV = $("#idEdit").val();
    let namaV = $("#namaEdit").val();
    let jenjangEdit = $("#jenjangEdit").val();
    let db = rootRef.ref("lembaga/" + idV);
    db.set({
        id_lembaga : idV,
        nama_lembaga: namaV,
        jenjang: jenjangEdit
    });
    setTimeout(function(){
        loadLembaga();
    }, 200);
});
$(document).on("click", ".delete-button-lembaga-class", function () {
   
    if (confirm("Hapus")) {
        let idLembaga = $(this).attr("data");
        let db = rootRef.ref("lembaga/" + idLembaga);
        db.remove();
        loadLembaga();
    }else{}
});
// lembaga end

// kelas start
$(document).on("click", ".tambah-kelas-class", function() {
    $(".progress").show();
    let idKelas = new Date().getTime();
    let namaKelas = $("#namaKelas").val();
    let lembagaId = $("#lembagaId").val();
    let db = rootRef.ref("kelas/" + idKelas);
    db.set({
        id_kelas : idKelas,
        nama_kelas: namaKelas,
        lembaga_id: lembagaId
    });
    setTimeout(function() {
        $("input:text").val("");
        $(".progress").hide();
    }, 200);
});
$(document).on("click", ".edit-kelas-class", function () {
    $(".progress").show();
    let idKelasEdit = $("#idKelasEdit").val();
    let namaKelasEdit = $("#namaKelasEdit").val();
    let lembagaIdEdit = $("#lembagaIdEdit").val();
    let db = rootRef.ref("kelas/" + idKelasEdit);
    db.set({
        id_kelas : idKelasEdit,
        nama_kelas: namaKelasEdit,
        lembaga_id: lembagaIdEdit
    });
    setTimeout(function() {
        $(".progress").hide();
        KelasLoad();
    }, 1000);
});
$(document).on("click", ".delete-button-kelas-class", function() {
    if (confirm("Hapus")) {
        let idKelas = $(this).attr("data");
    let db = rootRef.ref("kelas/" + idKelas);
    db.remove();
    setTimeout(function() {
        $(".progress").hide();
        KelasLoad();
    }, 1000);
    }else{}
});
// kelas end

// jadwal start
$(document).on("change", "#lembagaIdSelectForm", function() {
    let idLembaga = $(this).val();
    let contentValue = "";
    contentValue +="<div class='input-field col s12'>"
    +"                <select name='' id='kelasIdSelectFormJadwal'>"
    +"                  <option value='' disabled selected>Pilih Kelas</option>"
    let kelasRef = rootRef.ref("kelas/");
    kelasRef.orderByChild("lembaga_id").equalTo(idLembaga).on("child_added", function(data) {
        let dataValue = data.val();
        contentValue += "<option value='"+dataValue.id_kelas+"'>"+dataValue.nama_kelas+"</option>";
    });
    contentValue += "</select>"
    +"            </div>";
    $(".view-kelas-select-form-jadwal").html(contentValue);
});
$(document).on("click", ".tambah-jadwal-class", function () {
    let idJadwal = new Date().getTime();
    let namaJadwal = $("#namaJadwal").val();
    let tglJadwal = $("#tglJadwal").val();
    let jamKeJadwal = $("#jamKeJadwal").val();
    let lembagaIdSelectForm = $("#lembagaIdSelectForm").val();
    let kelasIdSelectFormJadwal = $("#kelasIdSelectFormJadwal").val();
    let kuotaKaryawan = $("#kuotaKaryawan").val();
    let tahunInput = tglJadwal.substring(0,4);
    let bulanInput = tglJadwal.substring(7, 5);

    let tableRef = rootRef.ref("jadwal/" + tahunInput + "/" + bulanInput + "/"+ lembagaIdSelectForm + "/" + idJadwal);
    tableRef.set({
        id_jadwal: idJadwal,
        nama_jadwal: namaJadwal,
        tgl: tglJadwal,
        jam: jamKeJadwal,
        lembaga_id: lembagaIdSelectForm,
        kelas_id: kelasIdSelectFormJadwal,
        kuota: kuotaKaryawan
    });
    loadJadwalAll();
});
$(document).on("change", "#tahunSelectFormJadawal1", function() {
    $("#bulanSelectFormJadawal1").show();
});
$(document).on("change", "#bulanSelectFormJadawal1", function() {
    
    let lembagaId = $(".lembagaSelectAllFunction").val();
    let tahunSelect = $("#tahunSelectFormJadawal1").val();
    let bulanSelect = $("#bulanSelectFormJadawal1").val();
    localStorage.setItem("lembagaIdSave", lembagaId);
    localStorage.setItem("tahunSelectSave", tahunSelect);
    localStorage.setItem("bulanSelectSave", bulanSelect);
    loadJadwalAll();
});
function loadJadwalAll() {
    $(".progress").show();
    let lembagaId = localStorage.getItem("lembagaIdSave");
    let tahunSelect = localStorage.getItem("tahunSelectSave");
    let bulanSelect = localStorage.getItem("bulanSelectSave");

    let hitungHari = new Date(tahunSelect,bulanSelect,0).getDate();

    let namaBulanIndo = ['', 'Januari', 'Februari', 'Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
    // console.log(bulanSelect);
    // console.log(namaBulanIndo[bulanSelect]);
        let bulanValid
        if (bulanSelect < 10) {
            bulanValid = "0"+bulanSelect;
        } else {
            bulanValid = bulanSelect;
        }
        for(let iii = 1; iii < 31; iii++){
            if(iii < 10){
                var ooo = "class-isi-jadwal-"+localStorage.getItem("tahunSelectSave")+"-"+bulanValid+"-0"+iii;
            } else {
                var ooo = "class-isi-jadwal-"+localStorage.getItem("tahunSelectSave")+"-"+bulanValid+"-"+iii;
            }
            localStorage.removeItem(ooo);
        }
        var dateData = "";
        let dateData2 = "</ul>";
        dateData += "<div class='month'>"
            +"<ul>"
                +"<li class='prev'>&#10094;</li>"
                +"<li class='next'>&#10095;</li>"
                +"<li>"
                    +namaBulanIndo[bulanSelect]+"<br>"
                    +"<span style='font-size:18px'>"+tahunSelect+"</span>"
                +"</li>"
            +"</ul>"
        +"</div>"
        +"<ul class='weekdays'>";
        let date = new Date(tahunSelect+"-"+bulanValid+"-"+1);
        let dayNumber = date.getDay();
        let ahirNumber = dayNumber + 6;
        for(let numbe = dayNumber; numbe <= ahirNumber; numbe++){
            if (numbe == 0 || numbe == 7) {
                dateData += "<li>Ahad</li>";
            } else if (numbe == 1 || numbe == 8) {
                dateData += "<li>Senin</li>";
            } else if (numbe == 2 || numbe == 9) {
                dateData += "<li>Selasa</li>";
            }  else if (numbe == 3 || numbe == 10) {
                dateData += "<li>Rabu</li>";
            } else if (numbe == 4 || numbe == 11) {
                dateData += "<li>Kamis</li>";
            } else if (numbe == 5 || numbe == 12) {
                dateData += "<li>jum'at</li>";
            } else if (numbe == 6 || numbe == 13) {
                dateData += "<li>Saptu</li>";
            }
        }
        dateData += "</ul>"
        +"<ul class='days'>";
    let jadwalRef = rootRef.ref("jadwal/" + tahunSelect + "/" + bulanValid + "/" + lembagaId +"/");
    setTimeout(function(){
        jadwalRef.on("child_added", function(dataJadwal) {
            let resultJadwal = dataJadwal.val();
            $(".progress").hide();
            localStorage.setItem("class-isi-jadwal-"+resultJadwal.tgl, "style='background-color: rgb(162, 174, 209) ;color: black; border-radius: 10px;'")
        });
        for(var i = 0; i < hitungHari; i++){
            let iPlus = i +1;
            let iPlusValid;
            if (iPlus < 10) {
                iPlusValid = "0"+iPlus;
            } else {
                iPlusValid = iPlus;
            }
            let allTgl = tahunSelect+"-"+bulanValid+"-"+iPlusValid;
            dateData += "<li class='modal-trigger' "+localStorage.getItem("class-isi-jadwal-"+allTgl)+" href='#modal1' data='"+tahunSelect+"-"+bulanValid+"-"+iPlusValid+"'>"+iPlus+"</li>";
            $(".jadwal-kalender-load-class").html(dateData + dateData2);
        }
    }, 1000);
    
}
$(document).on("click", ".days li", function() {
    $(".modal-content-view-all-class").html("");
    let tglValue = $(this).attr("data");
    let blnValue = tglValue.substring(7,0);
    let bulanFormat = blnValue.replace("-", "/")+"/";

    let JadwalArray = "";
    JadwalArray += '<table class="kelompok-load-class">'
    +"<thead>"
    +"<tr>"
    +"<th>Jam</th>"
    +"<th>Jadwal</th>"
    +"</tr>"
    +"</thead>"
    +"<tbody>";
    rootRef.ref("jadwal/" + bulanFormat + "/"+ localStorage.getItem("lembagaIdSave") + "/").orderByChild("tgl").equalTo(tglValue).on("child_added", function(dataValueJadwalTgl) {
        let dataResultTgl = dataValueJadwalTgl.val();
        let thnTglFormat = dataResultTgl.tgl.substring(7,0)
        JadwalArray +="  <tr>"
                +"    <td>"+ dataResultTgl.jam +"</td>"
                +"    <td>"+ dataResultTgl.nama_jadwal+"</td>"
                +"    <td>"
                +"      <a class='edit-button-jadwal-class waves-effect waves-light btn-small modal-trigger' data2='"+thnTglFormat+"' data='"+ dataResultTgl.id_jadwal +"' href='#modal1'><img class='img-button-act' src='assets/img/outline_edit_black_24dp.png' alt=''></a>"
                +"      <a class='delete-button-jadwal-class waves-effect red btn-small modal-close' data1='"+dataResultTgl.tgl+"' data='jadwal/" + bulanFormat+ dataResultTgl.id_jadwal +"'><img class='img-button-act' src='assets/img/outline_delete_black_24dp.png' alt='' srcset=''></a>"
                +"    </td>"
                +"  </tr>";
        $(".modal-content-view-all-class").html(JadwalArray + "</tbody></table>");
        $(".modal-header-view-all-class").html("");
    })
});
$(document).on("click", ".edit-jadwal-class", function() {
    let folderJadwalBase = $("#folderJadwalBase").val();
    console.log(folderJadwalBase);
    let idJadwalEdit = $("#idJadwalEdit").val();
    let namaJadwal = $("#namaJadwalEdit").val();
    let tglJadwal = $("#tglJadwalEdit").val();
    let jamKeJadwal = $("#jamKeJadwalEdit").val();
    let lembagaIdSelectForm = $("#lembagaIdSelectForm").val();
    let kelasIdSelectFormJadwal = $("#kelasIdSelectFormJadwal").val();
    let kuotaKaryawan = $("#kuotaKaryawanEdit").val();
    console.log(kelasIdSelectFormJadwal);
    
    let tableRef = rootRef.ref(folderJadwalBase);
    tableRef.set({
        id_jadwal: idJadwalEdit,
        nama_jadwal: namaJadwal,
        tgl: tglJadwal,
        jam: jamKeJadwal,
        lembaga_id: lembagaIdSelectForm,
        kelas_id: kelasIdSelectFormJadwal,
        kuota: kuotaKaryawan
    });
    loadJadwalAll();
});
$(document).on("click", ".delete-button-jadwal-class", function() {
    let tglJadwal = $(this).attr("data1");
    let FolderAndId = $(this).attr("data");
    let jadwalRefDel = rootRef.ref(FolderAndId);
    jadwalRefDel.remove();
    localStorage.removeItem("class-isi-jadwal-"+tglJadwal);
    loadJadwalAll();
});
// jadwal end

// qrcode start
$(document).on("click", ".tambah-qrcode-class", function() {
    let idQrcode = new Date().getTime();
    let namaQrcode = $("#namaQrcode").val();
    let nilaiQrcode = $("#nilaiQrcode").val();
    let lembagaIdSelectFormQrcode = $("#lembagaIdSelectFormQrcode").val();

    navigator.geolocation.getCurrentPosition(function(position){
        localStorage.setItem("latitudeQrcode", position.coords.latitude);
        localStorage.setItem("longitudeQrcode", position.coords.longitude);
    }, onError);
    let qrcodeRef = rootRef.ref("qrcode/" + idQrcode);
    qrcodeRef.set({
        id_qrcode: idQrcode,
        nama_qrcode: namaQrcode,
        nilai_qrcode: nilaiQrcode,
        lembaga_id: lembagaIdSelectFormQrcode,
        latitude : localStorage.getItem("latitudeQrcode"),
        longitude: localStorage.getItem("longitudeQrcode")
    });
});
function loadQrcode() {
    $(".progress").show();
    let no = 1;
    let qrcodeArray = "";
    qrcodeArray += '<table>'
    +"<thead>"
    +"<tr>"
    +"<th>No</th>"
    +"<th>Nama QRCode</th>"
    +"<th>Nilai</th>"
    +"<th>Latitude</th>"
    +"<th>Langitude</th>"
    +"</tr>"
    +"</thead>"
    +"<tbody>";
    let lembagaId = localStorage.getItem("lembagaIdStorageLoadQrcode");
    let db = rootRef.ref("qrcode/").orderByChild("lembaga_id").equalTo(lembagaId);
    db.on("child_added", function(data) {
        let dataValue = data.val();
        setTimeout(function(){
                qrcodeArray +="  <tr>"
                +"    <td>"+no++ +"</td>"
                +"    <td>"+ dataValue.nama_qrcode+"</td>"
                +"    <td>"+ dataValue.nilai_qrcode+"</td>"
                +"    <td>"+ dataValue.latitude+"</td>"
                +"    <td>"+ dataValue.longitude+"</td>"
                +"    <td>"
                +"      <a class='edit-button-qrcode-class waves-effect waves-light btn-small modal-trigger' data='"+ dataValue.id_qrcode +"' href='#modal1'><img class='img-button-act' src='assets/img/outline_edit_black_24dp.png' alt=''></a>"
                +"      <a class='delete-button-qrcode-class waves-effect red btn-small' data='"+ dataValue.id_qrcode +"'><img class='img-button-act' src='assets/img/outline_delete_black_24dp.png' alt='' srcset=''></a>"
                +"    </td>"
                +"  </tr>";
            $(".qrcode-load-class").html(qrcodeArray + "</tbody></table>");
            $(".progress").hide();    
        }, 1000);
    });
}
$(document).on("click", ".edit-qrcode-class", function() {
    navigator.geolocation.getCurrentPosition(function(position){
        localStorage.setItem("latitudeQrcodeEdit", position.coords.latitude);
        localStorage.setItem("longitudeQrcodeEdit", position.coords.longitude);
    }, onError);
    let idQrcode = $("#idQrcode").val();
    let namaQrcode = $("#namaQrcode").val();
    let nilaiQrcode = $("#nilaiQrcode").val();
    let lembagaIdQrcode = $("#lembagaIdQrcode").val();

    let qrcodeRef = rootRef.ref("qrcode/"+ idQrcode);
    qrcodeRef.set({
        id_qrcode: idQrcode,
        nama_qrcode: namaQrcode,
        nilai_qrcode: nilaiQrcode,
        lembaga_id: lembagaIdQrcode,
        latitude : localStorage.getItem("latitudeQrcodeEdit"),
        longitude: localStorage.getItem("longitudeQrcodeEdit")
    });
    loadQrcode();
});
$(document).on("click", ".delete-button-qrcode-class", function() {
    let idQrcode = $(this).attr("data");
    let qrcodeRef = rootRef.ref("qrcode/"+ idQrcode);
    qrcodeRef.remove();
    loadQrcode();
});
// qrcode end

//  absesnsi start
function loadJadwalAbsensi() {
    $(".progress").show();
    $(".load-absensi-jadwal-class").html("");
    let waktu = new Date();
    let tahun = waktu.getFullYear();
    let bulan = waktu.getMonth() + 1;
    let tgl = waktu.getDate();
    if (bulan.toString().length == 1) {
        bulan2 = "0"+bulan;
    } else {
        bulan2 = bulan;
    }
    if (tgl.toString().length == 1) {
        tgl2 = "0"+tgl;
    } else {
        tgl2 = tgl;
    }
    console.log(tahun+"-"+bulan2+"-"+tgl2);
    let absensiVr = "";
    absensiVr += "<div class='collection'>";
    absensiVrBottom = "</div>";
    let jadwalAbsensiRef = rootRef.ref("jadwal/" + tahun + "/" + bulan2 + "/" + localStorage.getItem("selectLembagaIdValue") + "/");
    jadwalAbsensiRef.orderByChild("tgl")
            .equalTo(tahun+"-"+bulan2+"-"+tgl2)
            .on("child_added", function(data) {
        let resultJadwalAbsensi = data.val();
        console.log(resultJadwalAbsensi);
        
        absensiVr += "<a class='collection-item akses-absensi-class' data2='"+resultJadwalAbsensi.kuota+"' data1='"+resultJadwalAbsensi.lembaga_id+"' data='"+resultJadwalAbsensi.id_jadwal+"'>"+resultJadwalAbsensi.nama_jadwal+"</a>";
        $(".load-absensi-jadwal-class").html(absensiVr+absensiVrBottom);
        $(".progress").hide();
    });
}
$(document).on("click", ".akses-absensi-class", function(){
    console.log("okkkkk");
    $(".colom-2-class-input-absensi2").hide();
    let waktu = new Date();
    let jamAbsensi = waktu.getHours();
    let tahun = waktu.getFullYear();
    let bulan = waktu.getMonth() + 1;
    let tgl = waktu.getDate();
    if (bulan.toString().length == 1) {
        bulan2 = "0"+bulan;
    } else {
        bulan2 = bulan;
    }
    if (tgl.toString().length == 1) {
        tgl2 = "0"+tgl;
    } else {
        tgl2 = tgl;
    }
    console.log(tahun+"-"+bulan2+"-"+tgl2);
    let idJadwal = $(this).attr("data");
    let lembagaId = $(this).attr("data1");
    let tglAbsensi = tahun+"-"+bulan2+"-"+tgl2;
    let kuotaAbsensi = $(this).attr("data2");


    let nomerVV = 0;
    let checkAbsensiJadwalId = rootRef.ref("absensi/" + tahun + "/" + bulan2 + "/" + lembagaId + "/").orderByChild("jadwal_id").equalTo(idJadwal);
    checkAbsensiJadwalId.on("value", function(dataCheckJadwal){
        let dataCheckJadwalResult = dataCheckJadwal.val();
        console.log(dataCheckJadwalResult);
        // let mh = nomerVV++;
        // belum fix
        if (dataCheckJadwalResult == null) {
            console.log("kosong");
            console.log(nomerVV++);
            setTimeout(function(){
                $("#jadwalIdAbsensi2").val(idJadwal);
                $("#lembagaIdAbsensi2").val(lembagaId);
                $("#tglAbsensi2").val(tglAbsensi);
                $("#jamAbsensi2").val(jamAbsensi);
                $("#pembahasanAbsensi2").val("");
            }, 1000);
            $(".load-pages").load("pages/admin/input_absensi.html");
        } else {
            let kk = nomerVV++;
            if (kk.toString().length == kuotaAbsensi) {
                var buttonCheckIsi = "<div class='input-field col s12'><button class='button-check-isi-classs waves-effect waves-light btn-small s12' data='absensi/"+tahun+"/"+bulan2+"/"+lembagaId+"' data2='"+idJadwal+"'>Check yang sudah mengisi</button></div>";
                $(".message-check-kuota-absensi-class").html(buttonCheckIsi);
                M.toast({html: 'Jadwal Sudah ada yang mengisi'})
            } else {
                console.log("kuota dan lebih kecil absensi"+kk.toString().length);
                setTimeout(function(){
                    $("#jadwalIdAbsensi2").val(idJadwal);
                    $("#lembagaIdAbsensi2").val(lembagaId);
                    $("#tglAbsensi2").val(tglAbsensi);
                    $("#jamAbsensi2").val(jamAbsensi);
                    $("#pembahasanAbsensi2").val("");
                }, 1000);
                $(".load-pages").load("pages/admin/input_absensi.html");
            }
        }
    });
});
$(document).on("click", ".button-check-qrcode-absensi2 ", function(){
    cordova.plugins.barcodeScanner.scan(
        function (result) {
            // console.log("qrcode/" + result.text);
            let checkQrCode = rootRef.ref("qrcode/" + result.text);
            checkQrCode.on("value", function(data) {
                let qrcodeData = data.val();
                if(qrcodeData == null || qrcodeData == ""){
                    $(".message-qrcode-absensi2").html("QRCode Salah atau Coba Lagi...");
                    $("#qrcodeCheckAbsensi2").val("");
                    $("#nilaiAbsensi2").val("");
                    $(".colom-2-class-input-absensi2").hide();
                    $(".colom-3-class-input-absensi2").hide();
                } else {
                    localStorage.setItem("latitudeScanAbsensi", qrcodeData.latitude);
                    localStorage.setItem("longitudeScanAbsensi", qrcodeData.longitude);
                    $(".message-qrcode-absensi2").html("Scan Berhasil");
                    $("#qrcodeCheckAbsensi2").val(qrcodeData.id_qrcode);
                    $("#nilaiAbsensi2").val(qrcodeData.nilai_qrcode);
                    $(".colom-2-class-input-absensi2").show();
                    $(".colom-3-class-input-absensi2").hide();
                }
                
            });
        },
        function (error) {
            alert("Scan Gagal: " + error);
        },
        {
            preferFrontCamera : true, // iOS and Android
            showFlipCameraButton : true, // iOS and Android
            showTorchButton : true, // iOS and Android
            torchOn: true, // Android, launch with the torch switched on (if available)
            saveHistory: true, // Android, save scan history (default false)
            prompt : "Place a barcode inside the scan area", // Android
            resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
            formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
            orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
            disableAnimations : true, // iOS
            disableSuccessBeep: false // iOS and Android
        }
    );
});
$(document).on("click", ".button-check-lokasi-absensi2", function(){
    
    navigator.geolocation.getCurrentPosition(function(position){
        localStorage.setItem("latitudeCheckAb", position.coords.latitude);
        let lat1 = position.coords.latitude;
        let lon1 = position.coords.longitude;
        let lat2 = localStorage.getItem("latitudeScanAbsensi");
        let lon2 = localStorage.getItem("longitudeScanAbsensi");
        console.log( "lat"+lat1 + "lon"+ lon1 + "lat2" + lat2 + "lon2" + lon2);
        const RRum = 6371e3; // metres
        const φ1 = lat1 * Math.PI/180; // φ, λ in radians
        const φ2 = lat2 * Math.PI/180;
        const Δφ = (lat2-lat1) * Math.PI/180;
        const Δλ = (lon2-lon1) * Math.PI/180;

        const aRum = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ/2) * Math.sin(Δλ/2);
        const cRum = 2 * Math.atan2(Math.sqrt(aRum), Math.sqrt(1-aRum));

        const dRum = RRum * cRum; // in metres
        setTimeout(function () {
            $("#latitudeAbsensi2").val(position.coords.latitude);
            $("#longitudeAbsensi2").val(position.coords.longitude);
            $("#jarakLokasi2").val(dRum.toFixed(0));
        }, 500);
    }, onError);
    if(localStorage.getItem("latitudeCheckAb") == null || localStorage.getItem("latitudeCheckAb") == ""){
        $(".message-location-absensi2").html("lokasi tidak terdeteksi");
        $(".colom-3-class-input-absensi2").hide();
    } else {
        $(".message-location-absensi2").html("lokasi berhasil");
        $(".colom-3-class-input-absensi2").show();
    }
});
$(document).on("click", ".tambah-absensi2-karyawan-qr", function () {
    let qrcodeCheckAbsensi2 = $("#qrcodeCheckAbsensi2").val();
    let nilaiAbsensi2 = $("#nilaiAbsensi2").val();
    let latitudeAbsensi2 = $("#latitudeAbsensi2").val();
    let longitudeAbsensi2 = $("#longitudeAbsensi2").val();
    let jarakLokasi2 = $("#jarakLokasi2").val();
    let jadwalIdAbsensi2 = $("#jadwalIdAbsensi2").val();
    let lembagaIdAbsensi2 = $("#lembagaIdAbsensi2").val();
    let tglAbsensi2 = $("#tglAbsensi2").val();
    let jamAbsensi2 = $("#jamAbsensi2").val();
    let pembahasanAbsensi2 = $("#pembahasanAbsensi2").val();
    let karyawanId = localStorage.getItem("karyawanIdLogin");

    let folderTahunFormat = tglAbsensi2.substring(7,0).replace("-", "/")+"/"+lembagaIdAbsensi2+"/"+karyawanId+"-"+jadwalIdAbsensi2;
    console.log(folderTahunFormat);
    let absensiRef = rootRef.ref("absensi/"+folderTahunFormat);
    absensiRef.set({
        id_absensi: karyawanId+"-"+jadwalIdAbsensi2,
        jadwal_id: jadwalIdAbsensi2,
        karyawan_id: karyawanId,
        tgl: tglAbsensi2,
        jam: jamAbsensi2,
        pembahasan: pembahasanAbsensi2,
        nilai: nilaiAbsensi2,
        latitude: latitudeAbsensi2,
        longitude: longitudeAbsensi2,
        jarak_lokasi: jarakLokasi2
    });
    $(".load-pages").load("pages/admin/absensi.html");
    setTimeout(function () {
        loadLembagaSelect();
        // loadJadwalAbsensi();
    }, 1000);
});
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}
$(document).on("click", ".button-check-isi-classs", function(){
    let data1 = $(this).attr("data");
    let data2 = $(this).attr("Data2");
    // console.log(data1 +"//////"+ data2);
    var isiKarywan ="";
    let karyawanCheck = rootRef.ref("karyawan/");
    let checkjadwalIsi = rootRef.ref(data1).orderByChild("jadwal_id").equalTo(data2);
    checkjadwalIsi.on("child_added", function(snap){
        let result = snap.val();
        karyawanCheck.child(result.karyawan_id).on("value", function(snapKaryawan){
            let resultKaryawan = snapKaryawan.val();
            console.log(resultKaryawan.nama);
            isiKarywan += resultKaryawan.nama + "<br />";
        });
        $(".message-class").show();
        $(".message-content-view").html("yang sudah mengisi : "+isiKarywan);
        setTimeout(function(){
            $(".message-class").hide()
        }, 3000);
    });
})
// end absensi

// start profile
function loadProfile(){
    $()
    let karyawanRef = rootRef.ref("karyawan/" + localStorage.getItem("karyawanIdLogin"));
    karyawanRef.on("value", function(dataProfile){
        let data = dataProfile.val();
        $("#karyawanIdProfile").val(data.id_karyawan);
        $("#imgProfile").val(data.img);
        $("#lembagaIdProfile").val(data.lembaga_id);
        $("#namaProfile").val(data.nama);
        $("#statusProfile").val(data.status);
        $("#usernameProfile").val(data.username);
        $("#passwordProfile").val(data.password);
    });
}
$(document).on("click", ".simpan-profile-class", function(){
    $(".progress").show();
    let karyawanIdProfile=  $("#karyawanIdProfile").val();
    let imgProfile = $("#imgProfile").val();
    let lembagaIdProfile = $("#lembagaIdProfile").val();
    let namaProfile = $("#namaProfile").val();
    let statusProfile = $("#statusProfile").val();
    let usernameProfile = $("#usernameProfile").val();
    let passwordProfile = $("#passwordProfile").val();
    let karyawanRef = rootRef.ref("karyawan/" + karyawanIdProfile);
    karyawanRef.set({
        id_karyawan : karyawanIdProfile,
        nama: namaProfile,
        status: statusProfile,
        lembaga_id: lembagaIdProfile,
        username: usernameProfile,
        password: passwordProfile,
        img: imgProfile
    });
    setTimeout(function () {
        $(".progress").hide();
        loadProfile();
    }, 1000);
});
// end profile

// laporan start
function loadKaryawanLaporan() {
    $(".progress").show();
    let itemKaryawanLaporan = "";
    itemKaryawanLaporan +="<div class='input-field col s4'>"
        +"         <select name='' class='karyawanLaporanSelect'>"
        +"             <option value='' disabled selected>Pilih Karyawan</option>"
    let dbKaryawan = rootRef.ref("karyawan/");
    dbKaryawan.orderByChild("lembaga_id").equalTo(localStorage.getItem("lembagaIdSaveLaporan")).on("child_added", function(data) {
        let dataKaryawan = data.val();
        console.log(dataKaryawan);
        itemKaryawanLaporan += "<option value='"+dataKaryawan.id_karyawan+"'>"+dataKaryawan.nama+"</option>";
        let itemKaryawanLaporan2 = "</select></div>";
        $(".load-karyawan-laporan-class").html(itemKaryawanLaporan + itemKaryawanLaporan2);
        $(".progress").hide();
    });
}
$(document).on("change", ".karyawanLaporanSelect", function () {
    let karyawanId = $(this).val();
    localStorage.setItem("karyawanIdSelectSaveLaporan", karyawanId);
    $("#tahunSelectFormLaporan").show();
})
$(document).on("change", "#tahunSelectFormLaporan", function() {
    let tahunSelect = $(this).val();
    localStorage.setItem("tahunSelectSaveLaporan", tahunSelect);
    $("#bulanSelectFormLaporan").show();
});
$(document).on("change", "#bulanSelectFormLaporan", function() {
    let bulanSelect = $(this).val();
    localStorage.setItem("bulanSelectSaveLaporan", bulanSelect);
    loadLaporanAll();
});
function loadLaporanAll() {
    $(".laporan-class").html("");
    $(".progress").show();
    let bulanVal = localStorage.getItem("bulanSelectSaveLaporan");
    if (bulanVal > 9) {
        var bulan = bulanVal;
    } else {
        var bulan = "0"+bulanVal;
    }
    let laporanArray = "";
    laporanArray += '<table>'
    +"<thead>"
    +"<tr>"
    +"<th>Jadwal</th>"
    +"<th>Tgl</th>"
    +"<th>Jarak</th>"
    +"<th>Nilai</th>"
    +"</tr>"
    +"</thead>"
    +"<tbody>";
    let sumNilai = 0;
    let jadwalAbsensi = rootRef.ref("jadwal/" + localStorage.getItem("tahunSelectSaveLaporan") +"/"+ bulan +"/");
    let checkAbsensi = rootRef.ref("absensi/" + localStorage.getItem("tahunSelectSaveLaporan") +"/"+ bulan +"/"+ localStorage.getItem("lembagaIdSaveLaporan")+"/");
    checkAbsensi.orderByChild("karyawan_id").equalTo(localStorage.getItem("karyawanIdSelectSaveLaporan")).on("child_added", function(dataSnap){
        let resultData = dataSnap.val();
        jadwalAbsensi.child(resultData.jadwal_id).on("value", function (dataJadwal) {
            let dataJadwalResult = dataJadwal.val();
            setTimeout(function(){
                laporanArray +="  <tr>"
                laporanArray +="<td>"+ dataJadwalResult.nama_jadwal+"</td>"
                +"<td>"+ resultData.tgl+"</td>";
                let jrk = resultData.jarak_lokasi / 1000;
                laporanArray +="<td>"+ resultData.jarak_lokasi+" M /"+jrk+" KM</td>"
                +"    <td>Rp. "+parseInt(resultData.nilai).toLocaleString("id-ID")+"</td>"
                +"  </tr>";
                sumNilai += parseInt(resultData.nilai);
                let laporanArray2 ="  <tr>"
                +"    <td></td>"
                +"    <td></td>"
                +"    <td>jumlah</td>"
                +"    <td>Rp. "+ sumNilai.toLocaleString("id-ID")+"</td>"
                +"  </tr>";
                $(".laporan-class").html(laporanArray +laporanArray2+ "</tbody></table>");
                $(".progress").hide();    
            }, 1000); 
        });
    });
}
// laporan end