$(document).on("click", ".menu-nav", function() {
    let dataVal = $(this).attr("data");
    console.log(dataVal);
    localStorage.setItem("menu", dataVal);
    if (dataVal == "dashboard") {
        $(".span-value").html("dashboard");
        $(".progress").show();
        $(".load-pages").load("pages/admin/dashboard.html");
        setTimeout(function() {
            $(".progress").hide();
            loadProfile();
        }, 1000);
    } else if (dataVal == "karyawan") {
        $(".span-value").html("Karyawan");
        $(".progress").show();
        $(".btn-plus-data-class").show();
        $(".load-pages").load("pages/admin/karyawan.html");
        setTimeout(function() {
            $(".progress").hide();
            loadLembagaSelect();
        }, 1000);
    } else if (dataVal == "lembaga") {
        $(".span-value").html("Lembaga");
        $(".progress").show();
        $(".btn-plus-data-class").show();
        $(".load-pages").load("pages/admin/lembaga.html");
        setTimeout(function() {
            $(".progress").hide();
            loadLembaga();
        }, 1000);
    } else if (dataVal == "kelas") {
        $(".span-value").html("Kelas");
        $(".progress").show();
        $(".btn-plus-data-class").show();
        $(".load-pages").load("pages/admin/kelas.html");
        setTimeout(function() {
            $(".progress").hide();
            loadLembagaSelect();
        }, 1000);
    } else if (dataVal == "jadwal") {
        $(".span-value").html("Jadwal");
        $(".progress").show();
        $(".btn-plus-data-class").show();
        $(".load-pages").load("pages/admin/jadwal.html");
        setTimeout(function() {
            $(".progress").hide();
            loadLembagaSelect();
        }, 1000);
    } else if (dataVal == "qrcode") {
        $(".span-value").html("QRCode");
        $(".progress").show();
        $(".btn-plus-data-class").show();
        $(".load-pages").load("pages/admin/qrcode.html");
        setTimeout(function() {
            loadLembagaSelect();
            $(".progress").hide();
        }, 1000);
    } else if (dataVal == "absensi") {
        $(".span-value").html("Absensi");
        $(".progress").show();
        $(".btn-plus-data-class").hide();
        $(".load-pages").load("pages/admin/absensi.html");
        setTimeout(function() {
            loadLembagaSelect();
            $(".progress").hide();
        }, 1000);
    } else if (dataVal == "logout") {
        localStorage.clear();
        window.location.href = "index.html";
    } else if (dataVal == "laporan") {
        $(".span-value").html("laporan");
        $(".progress").show();
        $(".load-pages").load("pages/admin/laporan.html");
        setTimeout(function() {
            loadLembagaSelect();
            $(".progress").hide();
        }, 1000);
    }else if (dataVal == "profil") {
        $(".span-value").html("Profil");
        $(".progress").show();
        $(".load-pages").load("pages/admin/dashboard.html");
        setTimeout(function() {
            $(".progress").hide();
            loadProfile();
        }, 1000);
    } else if (dataVal == "laporan-karyawan") {
        $(".span-value").html("laporan karyawan");
        $(".progress").show();
        $(".load-pages").load("pages/admin/laporan_karyawan.html");
        setTimeout(function() {
            $(".progress").hide();
            loadLembagaSelect();
        }, 1000);
    } else if (dataVal == "chats") {
        $(".span-value").html("Chats");
        $(".progress").show();
        $(".load-pages").load("pages/admin/chats.html");
        setTimeout(function() {
            $(".progress").hide();
            loadChats();
        }, 1000);
    } else {
        $(".btn-plus-data-class").hide();
        $(".span-value").html("YPI Nurul Mannan");
    }
    checkAppsAll();
});