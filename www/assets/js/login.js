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
$(document).ready(function(){
    console.log(localStorage.getItem("karyawanIdLogin"));
    if (localStorage.getItem("karyawanIdLogin") == null || localStorage.getItem("karyawanIdLogin") == "") {
        $(".body-login").show();
    } else {
        $(".body-login").hide();
        window.location.href="dashboard.html";
    }
});
$(document).on("click", ".button-login-normally", function(){
    let usernameV = $("#username").val();
    let passwordV = $("#password").val();

    let checkKaryawan = rootRef.ref("karyawan/")
        .orderByChild("username")
        .equalTo(usernameV);
    checkKaryawan.on("child_added", function (data) {
        let result = data.val();
        console.log(result);
        if (result == null || result == "") {
            var pesan = "Username atau Password Salah";
        } else {
            console.log(result.password +"="+ passwordV);
            if (result.password == passwordV) {
                localStorage.setItem("karyawanIdLogin", result.id_karyawan);
                localStorage.setItem("karyawanNamaLogin", result.nama);
                localStorage.setItem("karyawanStatusLogin", result.status);
                var pesan = "Berhasil";
                window.location.href="dashboard.html";
            } else {
                var pesan = "Username atau Password Salah";
            }
        }
        $(".message-login").html(pesan);
    })
});
$(document).on("click", ".button-login-qrcode", function(){
    cordova.plugins.barcodeScanner.scan(
        function (result) {
            console.log(result.text);
            let checkKaryawan = rootRef.ref("karyawan/" + result.text);
            checkKaryawan.on("value", function (data) {
                let resultData = data.val();
                if (resultData == null || resultData == "") {
                    var pesanKryw = "QRCode salah atau coba sekali lagi";
                }else {
                    var pesanKryw = "Sukses";
                    localStorage.setItem("karyawanIdLogin", resultData.id_karyawan);
                    localStorage.setItem("karyawanNamaLogin", resultData.nama);
                    localStorage.setItem("karyawanStatusLogin", resultData.status);
                    window.location.href="dashboard.html";
                }
                $(".message-login").html(pesanKryw);
            });
        },
        function (error) {
            // alert("Scanning failed: " + error);
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
        });
});
