var soDong = 0;
var heDiemCu = "4";
var khoaLuu = "gpa-uni-co-ban";
var KHOA_PHIEN_DANG_NHAP = "gpa-uni-nguoi-dung-hien-tai";
var KHOA_GIAO_DIEN = "gpa-uni-giao-dien";

function lay(id) {
    return document.getElementById(id);
}

function apDungGiaoDienToi(laToi) {
    if (laToi) {
        document.body.classList.add("che-do-toi");
    } else {
        document.body.classList.remove("che-do-toi");
    }
    var nut = lay("nut-doi-giao-dien");
    if (nut) {
        nut.setAttribute("aria-checked", laToi ? "true" : "false");
        nut.setAttribute("title", laToi ? "Đang bật Giao diện Tối. Bấm để chuyển sang Giao diện Sáng." : "Đang bật Giao diện Sáng. Bấm để chuyển sang Giao diện Tối.");
    }
    if (typeof veBieuDoTichLuy === "function" && typeof danhSachMocTichLuy !== "undefined") {
        var khungBieuDo = lay("khung-bieu-do-tich-luy");
        if (khungBieuDo && khungBieuDo.style.display !== "none") {
            veBieuDoTichLuy(danhSachMocTichLuy);
        }
    }
}

function batTatGiaoDienToi() {
    var dangToi = document.body.classList.contains("che-do-toi");
    var trangThaiMoi = !dangToi;
    apDungGiaoDienToi(trangThaiMoi);
    ghiLuuTru(KHOA_GIAO_DIEN, trangThaiMoi ? "toi" : "sang");
}

function khoiTaoGiaoDienToi() {
    var daLuu = docLuuTru(KHOA_GIAO_DIEN);
    if (daLuu === "toi") {
        apDungGiaoDienToi(true);
    } else {
        apDungGiaoDienToi(false);
    }
}

function docLuuTru(khoa) {
    try {
        return localStorage.getItem(khoa);
    } catch (loi) {
        return null;
    }
}

function ghiLuuTru(khoa, giaTri) {
    localStorage.setItem(khoa, giaTri);
}

function xoaLuuTru(khoa) {
    localStorage.removeItem(khoa);
}

function docNguoiDungDangNhap() {
    if (typeof layNguoiDungHienTai === "function") {
        return layNguoiDungHienTai();
    }
    try {
        var duLieu = docLuuTru(KHOA_PHIEN_DANG_NHAP);
        if (duLieu) return JSON.parse(duLieu);
        var duLieuPhien = sessionStorage.getItem(KHOA_PHIEN_DANG_NHAP);
        return duLieuPhien ? JSON.parse(duLieuPhien) : null;
    } catch (loi) {
        return null;
    }
}

function layKhoaLuu() {
    var nguoiDung = docNguoiDungDangNhap();
    if (nguoiDung && typeof nguoiDung.email === "string" && nguoiDung.email.trim() !== "") {
        return "gpa-uni-du-lieu-" + nguoiDung.email.trim().toLowerCase();
    }
    return khoaLuu;
}

function layKhoaLuuDanhSachKy() {
    return layKhoaLuu() + "-tat-ca-hoc-ky";
}

function layKhoaLuuBieuDo() {
    return layKhoaLuu() + "-bieu-do-tich-luy";
}

function layKhoaLuuMucTieu() {
    return layKhoaLuu() + "-muc-tieu-tot-nghiep";
}

function hienSo(so) {
    return so.toFixed(2).replace(".", ",");
}

function docSo(chuoi) {
    var giaTri = String(chuoi).trim().replace(",", ".");
    if (giaTri === "" || !/^\d+(\.\d+)?$/.test(giaTri)) return NaN;
    return Number(giaTri);
}

function hopLe(so, nhoNhat, lonNhat) {
    return !isNaN(so) && so >= nhoNhat && so <= lonNhat;
}

function xepLoai(gpa, he) {
    if (he === "10") {
        if (gpa >= 9.0) return "Xuất sắc";
        if (gpa >= 8.0) return "Giỏi";
        if (gpa >= 7.0) return "Khá";
        if (gpa >= 5.0) return "Trung bình";
        if (gpa >= 4.0) return "Yếu";
        return "Kém";
    }
    if (gpa >= 3.6) return "Xuất sắc";
    if (gpa >= 3.2) return "Giỏi";
    if (gpa >= 2.5) return "Khá";
    if (gpa >= 2) return "Trung bình";
    if (gpa >= 1) return "Yếu";
    return "Kém";
}

function quyDoi(diem, he) {
    if (he === "chu") {
        var chu = String(diem).trim().toUpperCase();
        var bangDiemChu = {
            "A+": 4.0,
            "A": 4.0,
            "B+": 3.5,
            "B": 3.0,
            "C+": 2.5,
            "C": 2.0,
            "D+": 1.5,
            "D": 1.0,
            "F": 0.0
        };
        return Object.prototype.hasOwnProperty.call(bangDiemChu, chu)
            ? bangDiemChu[chu]
            : NaN;
    }

    var so = docSo(diem);
    if (he === "4") {
        return hopLe(so, 0, 4) ? so : NaN;
    }

    if (!hopLe(so, 0, 10)) return NaN;
    if (so >= 9.0) return 4.0; // A+
    if (so >= 8.5) return 4.0; // A
    if (so >= 8.0) return 3.5; // B+
    if (so >= 7.0) return 3.0; // B
    if (so >= 6.5) return 2.5; // C+
    if (so >= 5.5) return 2.0; // C
    if (so >= 5.0) return 1.5; // D+
    if (so >= 4.0) return 1.0; // D
    return 0.0; // F
}

function layThongTinXepLoai(diem, he) {
    if (he === "10") {
        if (diem >= 9.0) return { tenClass: "muc-xuat-sac", icon: "🏆", ten: "Xuất sắc" };
        if (diem >= 8.0) return { tenClass: "muc-gioi", icon: "🥇", ten: "Giỏi" };
        if (diem >= 7.0) return { tenClass: "muc-kha", icon: "🥈", ten: "Khá" };
        if (diem >= 5.0) return { tenClass: "muc-trung-binh", icon: "🥉", ten: "Trung bình" };
        if (diem >= 4.0) return { tenClass: "muc-yeu", icon: "⚠️", ten: "Yếu" };
        return { tenClass: "muc-kem", icon: "❌", ten: "Kém" };
    }
    if (diem >= 3.6) return { tenClass: "muc-xuat-sac", icon: "🏆", ten: "Xuất sắc" };
    if (diem >= 3.2) return { tenClass: "muc-gioi", icon: "🥇", ten: "Giỏi" };
    if (diem >= 2.5) return { tenClass: "muc-kha", icon: "🥈", ten: "Khá" };
    if (diem >= 2.0) return { tenClass: "muc-trung-binh", icon: "🥉", ten: "Trung bình" };
    if (diem >= 1.0) return { tenClass: "muc-yeu", icon: "⚠️", ten: "Yếu" };
    return { tenClass: "muc-kem", icon: "❌", ten: "Kém" };
}

function xoaKetQua() {
    if (!lay("gpa-ky")) return;
    var khungKetQua = document.querySelector(".ket-qua");
    if (khungKetQua) {
        khungKetQua.classList.remove(
            "muc-xuat-sac",
            "muc-gioi",
            "muc-kha",
            "muc-trung-binh",
            "muc-yeu",
            "muc-kem"
        );
    }
    if (lay("icon-vong-diem")) {
        lay("icon-vong-diem").innerText = "";
    }
    lay("gpa-ky").innerText = "—";
    var he = lay("he-diem") ? lay("he-diem").value : "4";
    if (lay("mau-so-gpa-ky")) {
        lay("mau-so-gpa-ky").innerText = he === "10" ? "/ 10,0" : "/ 4,00";
    }
    lay("xep-loai-ky").innerText = "Chưa có kết quả";
    lay("tong-tin-chi").innerText = "—";
    lay("tong-so-mon").innerText = "—";
    if (lay("diem-cao-nhat")) {
        lay("diem-cao-nhat").innerText = "—";
    }
    lay("thong-tin-ky").innerText = "Nhập điểm và bấm tính để xem kết quả.";
    lay("diem-he-10").innerText = "";
    lay("phep-tinh").innerText = "";
    lay("loi-mon").innerText = "";
}

function hienThiKetQuaHocKy(ketQuaKy, he) {
    if (!lay("gpa-ky") || !ketQuaKy) return;
    var gpa = ketQuaKy.gpa;
    var soMon = ketQuaKy.soMon !== undefined ? ketQuaKy.soMon : 0;
    var tongTinChi = ketQuaKy.tongTinChi !== undefined ? ketQuaKy.tongTinChi : 0;
    var tongDiem = ketQuaKy.tongDiem !== undefined ? ketQuaKy.tongDiem : (gpa * tongTinChi);
    var tcHienThi = String(tongTinChi).replace(".", ",");
    var laHe10 = (he === "10" && typeof ketQuaKy.diemHe10Tb === "number" && !isNaN(ketQuaKy.diemHe10Tb));
    var diemXepLoai = laHe10 ? ketQuaKy.diemHe10Tb : gpa;
    var heXepLoai = laHe10 ? "10" : "4";
    var xl = xepLoai(diemXepLoai, heXepLoai);
    var thongTinXl = layThongTinXepLoai(diemXepLoai, heXepLoai);

    var khungKetQua = document.querySelector(".ket-qua");
    if (khungKetQua) {
        khungKetQua.classList.remove(
            "muc-xuat-sac",
            "muc-gioi",
            "muc-kha",
            "muc-trung-binh",
            "muc-yeu",
            "muc-kem"
        );
        khungKetQua.classList.add(thongTinXl.tenClass);
    }

    if (lay("icon-vong-diem")) {
        lay("icon-vong-diem").innerText = thongTinXl.icon;
    }

    if (he === "10" && typeof ketQuaKy.diemHe10Tb === "number" && !isNaN(ketQuaKy.diemHe10Tb)) {
        lay("gpa-ky").innerText = hienSo(ketQuaKy.diemHe10Tb);
        if (lay("mau-so-gpa-ky")) {
            lay("mau-so-gpa-ky").innerText = "/ 10,0";
        }
    } else {
        lay("gpa-ky").innerText = hienSo(gpa);
        if (lay("mau-so-gpa-ky")) {
            lay("mau-so-gpa-ky").innerText = "/ 4,00";
        }
    }

    lay("xep-loai-ky").innerText = thongTinXl.icon + "  " + xl;
    lay("tong-tin-chi").innerText = tcHienThi;
    lay("tong-so-mon").innerText = soMon;

    if (lay("diem-cao-nhat")) {
        var strDiemCaoNhat = "—";
        if (he === "10") {
            if (typeof ketQuaKy.diemCaoNhat10 === "number" && !isNaN(ketQuaKy.diemCaoNhat10)) {
                strDiemCaoNhat = (Math.round(ketQuaKy.diemCaoNhat10 * 10) / 10).toFixed(1).replace(".", ",");
            } else if (typeof ketQuaKy.diemCaoNhatHe4 === "number" && !isNaN(ketQuaKy.diemCaoNhatHe4)) {
                var d10QuyDoi = Math.round(ketQuaKy.diemCaoNhatHe4 * 2.5 * 10) / 10;
                strDiemCaoNhat = d10QuyDoi.toFixed(1).replace(".", ",");
            }
        } else if (he === "chu") {
            if (ketQuaKy.diemChuCaoNhat) {
                strDiemCaoNhat = ketQuaKy.diemChuCaoNhat;
            } else if (typeof ketQuaKy.diemCaoNhatHe4 === "number" && !isNaN(ketQuaKy.diemCaoNhatHe4)) {
                strDiemCaoNhat = (Math.round(ketQuaKy.diemCaoNhatHe4 * 10) / 10).toFixed(1).replace(".", ",");
            }
        } else {
            if (typeof ketQuaKy.diemCaoNhatHe4 === "number" && !isNaN(ketQuaKy.diemCaoNhatHe4)) {
                strDiemCaoNhat = (Math.round(ketQuaKy.diemCaoNhatHe4 * 10) / 10).toFixed(1).replace(".", ",");
            }
        }
        lay("diem-cao-nhat").innerText = strDiemCaoNhat;
    }

    lay("thong-tin-ky").innerText = xl + " · " + soMon + " môn · " + tcHienThi + " tín chỉ";
    lay("phep-tinh").innerText = "Tổng điểm × Tín chỉ: " + hienSo(tongDiem) + "; chia cho " + tcHienThi + " tín chỉ.";

    if (he === "10") {
        if (typeof ketQuaKy.diemHe10Tb === "number" && !isNaN(ketQuaKy.diemHe10Tb)) {
            lay("diem-he-10").innerText = "Trung bình hệ 10: " + hienSo(ketQuaKy.diemHe10Tb);
        } else {
            lay("diem-he-10").innerText = "Trung bình hệ 10: Chỉ tính được khi tất cả môn đều có điểm hệ 10.";
        }
    } else {
        lay("diem-he-10").innerText = "";
    }
    if (lay("loi-mon")) lay("loi-mon").innerText = "";
}

function timDiemChuTuDiemSo(chuoiDiem, he) {
    var so = docSo(chuoiDiem);
    if (isNaN(so)) return "";
    if (he === "10") {
        if (!hopLe(so, 0, 10)) return "";
        if (so >= 9.0) return "A+";
        if (so >= 8.5) return "A";
        if (so >= 8.0) return "B+";
        if (so >= 7.0) return "B";
        if (so >= 6.5) return "C+";
        if (so >= 5.5) return "C";
        if (so >= 5.0) return "D+";
        if (so >= 4.0) return "D";
        return "F";
    }
    if (!hopLe(so, 0, 4)) return "";
    if (so >= 3.85) return "A+";
    if (so >= 3.5) return "A";
    if (so >= 3.25) return "B+";
    if (so >= 2.75) return "B";
    if (so >= 2.25) return "C+";
    if (so >= 1.75) return "C";
    if (so >= 1.25) return "D+";
    if (so >= 1.0) return "D";
    return "F";
}

function lopMauHuyHieuChu(chu) {
    if (chu === "A+" || chu === "A") return "muc-a";
    if (chu === "B+" || chu === "B") return "muc-b";
    if (chu === "C+" || chu === "C") return "muc-c";
    if (chu === "D+" || chu === "D") return "muc-d";
    if (chu === "F") return "muc-f";
    return "muc-trong";
}

function capNhatHuyHieuHeChuDong(dong) {
    if (!dong) return;
    var oDiem = dong.querySelector(".diem");
    var oDiem10 = dong.querySelector(".diem-10");
    var huyHieu = dong.querySelector(".huy-hieu-he-chu");
    if (!oDiem || !huyHieu) return;
    var he = lay("he-diem") ? lay("he-diem").value : "4";
    var chu = "";
    if (he === "10" && oDiem10 && oDiem10.value.trim() !== "") {
        chu = timDiemChuTuDiemSo(oDiem10.value, "10");
    }
    if (chu === "") {
        chu = timDiemChuTuDiemSo(oDiem.value, "4");
    }
    if (chu === "") {
        huyHieu.innerText = "—";
        huyHieu.className = "huy-hieu-he-chu muc-trong";
    } else {
        huyHieu.innerText = chu;
        huyHieu.className = "huy-hieu-he-chu " + lopMauHuyHieuChu(chu);
    }
}

function capNhatTieuDeCotDiem() {
    var bang = document.querySelector(".bang-mon");
    var he = lay("he-diem") ? lay("he-diem").value : "4";
    var thDiem = lay("cot-tieu-de-diem");
    var thDiem10 = lay("cot-tieu-de-diem-10");
    if (he === "10") {
        if (bang) bang.classList.add("che-do-he-10");
        if (thDiem) thDiem.innerHTML = 'ĐIỂM HỆ 4 <span class="gioi-han-diem">(MAX 4.0)</span>';
        if (thDiem10) thDiem10.innerHTML = 'ĐIỂM HỆ 10 <span class="gioi-han-diem">(MAX 10)</span>';
    } else {
        if (bang) bang.classList.remove("che-do-he-10");
        if (thDiem) thDiem.innerHTML = 'ĐIỂM <span class="gioi-han-diem">(MAX 4.0)</span>';
    }
    if (bang) {
        var cacODiem = bang.querySelectorAll(".diem");
        for (var i = 0; i < cacODiem.length; i++) {
            cacODiem[i].readOnly = (he === "10");
        }
    }
}

function capNhatSoThuTuVaHeChuBangMon() {
    if (!lay("danh-sach-mon")) return;
    capNhatTieuDeCotDiem();
    var dong = lay("danh-sach-mon").getElementsByTagName("tr");
    for (var i = 0; i < dong.length; i++) {
        var oStt = dong[i].querySelector(".so-thu-tu-mon");
        if (oStt) oStt.innerText = i + 1;
        capNhatHuyHieuHeChuDong(dong[i]);
    }
}

function themMon(duLieu, khongTuLuu) {
    if (!lay("danh-sach-mon")) return;
    soDong++;
    var dong = document.createElement("tr");
    dong.innerHTML =
        '<td class="cot-stt"><span class="so-thu-tu-mon"></span></td>' +
        '<td class="cot-tinh"><input class="tinh" type="checkbox" checked aria-label="Tính môn vào GPA" name="tinh_mon_' + soDong + '" id="tinh-mon-' + soDong + '"></td>' +
        '<td class="cot-ten"><span class="nhan-di-dong">Tên môn học</span><input class="ten" type="text" placeholder="Tên môn (tùy chọn)..." maxlength="100" aria-label="Tên môn" name="ten_mon_' + soDong + '" id="ten-mon-' + soDong + '"></td>' +
        '<td class="cot-tc"><span class="nhan-di-dong">Tín chỉ</span><input class="tin-chi" type="text" inputmode="decimal" maxlength="10" aria-label="Số tín chỉ" name="tin_chi_' + soDong + '" id="tin-chi-' + soDong + '"><span class="loi loi-tin-chi"></span></td>' +
        '<td class="cot-diem"><span class="nhan-di-dong">Điểm hệ 4</span><input class="diem" type="text" inputmode="decimal" maxlength="10" aria-label="Điểm hệ 4" name="diem_he4_' + soDong + '" id="diem-he4-' + soDong + '"><span class="loi loi-diem"></span></td>' +
        '<td class="cot-diem-10"><span class="nhan-di-dong">Điểm hệ 10</span><input class="diem-10" type="text" inputmode="decimal" maxlength="10" aria-label="Điểm hệ 10" name="diem_he10_' + soDong + '" id="diem-he10-' + soDong + '"><span class="loi loi-diem-10"></span></td>' +
        '<td class="cot-he-chu"><span class="nhan-di-dong">Hệ chữ</span><span class="huy-hieu-he-chu muc-trong">—</span></td>' +
        '<td class="cot-xoa"><button type="button" class="xoa" aria-label="Xóa môn" title="Xóa môn">✕</button></td>';

    var oTinh = dong.querySelector(".tinh");
    var oTen = dong.querySelector(".ten");
    var oTc = dong.querySelector(".tin-chi");
    var oDiem = dong.querySelector(".diem");
    var oDiem10 = dong.querySelector(".diem-10");
    var loiTc = dong.querySelector(".loi-tin-chi");
    var loiDiem = dong.querySelector(".loi-diem");
    var loiDiem10 = dong.querySelector(".loi-diem-10");

    oTc.value = "3";
    if (duLieu) {
        oTinh.checked = duLieu.tinh;
        oTen.value = duLieu.ten || "";
        oTc.value = duLieu.tinChi || "3";
        var diemLuu = duLieu.diem || "";
        var diemQuyHe4 = quyDoi(diemLuu, "chu");
        if (!isNaN(diemQuyHe4) && isNaN(docSo(diemLuu))) {
            diemLuu = String(diemQuyHe4).replace(".", ",");
        }
        oDiem.value = diemLuu;
        oDiem10.value = duLieu.diem10 || "";
    }

    loiTc.id = "loi-tin-chi-" + soDong;
    loiDiem.id = "loi-diem-" + soDong;
    loiDiem10.id = "loi-diem-10-" + soDong;
    oTc.setAttribute("aria-describedby", loiTc.id);
    oDiem.setAttribute("aria-describedby", loiDiem.id);
    oDiem10.setAttribute("aria-describedby", loiDiem10.id);

    var heHienTai = lay("he-diem") ? lay("he-diem").value : "4";
    oDiem.readOnly = (heHienTai === "10");

    dong.querySelector(".xoa").onclick = function () {
        dong.parentNode.removeChild(dong);
        capNhatSoThuTuVaHeChuBangMon();
        tuDongLuuVaDongBoTichLuy();
    };

    oDiem10.oninput = function () {
        var chuoi10 = oDiem10.value.trim();
        if (chuoi10 !== "") {
            var so10 = docSo(chuoi10);
            if (!isNaN(so10) && hopLe(so10, 0, 10)) {
                var d4 = quyDoi(chuoi10, "10");
                if (!isNaN(d4)) {
                    oDiem.value = String(d4).replace(".", ",");
                }
            }
        }
        capNhatHuyHieuHeChuDong(dong);
        tuDongLuuVaDongBoTichLuy();
    };

    oDiem.oninput = function () {
        if (oDiem10.value.trim() !== "") {
            var q = quyDoi(oDiem10.value, "10");
            var d = docSo(oDiem.value);
            if (isNaN(q) || isNaN(d) || q !== d) {
                oDiem10.value = "";
            }
        }
        capNhatHuyHieuHeChuDong(dong);
        tuDongLuuVaDongBoTichLuy();
    };

    dong.oninput = function (e) {
        if (e.target !== oDiem && e.target !== oDiem10) {
            capNhatHuyHieuHeChuDong(dong);
            tuDongLuuVaDongBoTichLuy();
        }
    };
    dong.onchange = function () {
        capNhatHuyHieuHeChuDong(dong);
        tuDongLuuVaDongBoTichLuy();
    };

    lay("danh-sach-mon").appendChild(dong);
    capNhatSoThuTuVaHeChuBangMon();
    if (!khongTuLuu) {
        tuDongLuuVaDongBoTichLuy();
    }
}

function docTatCaHocKyDaLuu() {
    try {
        var chuoi = docLuuTru(layKhoaLuuDanhSachKy());
        if (!chuoi) return {};
        var duLieu = JSON.parse(chuoi);
        if (!duLieu || typeof duLieu !== "object" || Array.isArray(duLieu)) return {};
        var ketQua = {};
        for (var k in duLieu) {
            if (Object.prototype.hasOwnProperty.call(duLieu, k)) {
                var tenChuan = chuanHoaTenHocKy(k);
                ketQua[tenChuan] = duLieu[k];
                if (ketQua[tenChuan] && typeof ketQua[tenChuan].tenKy === "string") {
                    ketQua[tenChuan].tenKy = chuanHoaTenHocKy(ketQua[tenChuan].tenKy);
                }
            }
        }
        return ketQua;
    } catch (loi) {
        return {};
    }
}

function luuBieuDoTichLuyVaoBoNho() {
    try {
        ghiLuuTru(layKhoaLuuBieuDo(), JSON.stringify({
            dangDungMocMau: dangDungMocMau,
            moc: danhSachMocTichLuy,
            daXoa: danhSachKyDaXoaKhoiBieuDo
        }));
    } catch (loi) { }
    if (typeof capNhatWidgetTrangChu === "function") {
        capNhatWidgetTrangChu();
    }
}

function taiBieuDoTichLuyTuBoNho() {
    try {
        var chuoi = docLuuTru(layKhoaLuuBieuDo());
        if (!chuoi) return;
        var duLieu = JSON.parse(chuoi);
        if (duLieu && Array.isArray(duLieu.moc)) {
            dangDungMocMau = Boolean(duLieu.dangDungMocMau);
            danhSachMocTichLuy = duLieu.moc;
            for (var i = 0; i < danhSachMocTichLuy.length; i++) {
                if (danhSachMocTichLuy[i] && danhSachMocTichLuy[i].ten) {
                    danhSachMocTichLuy[i].ten = chuanHoaTenHocKy(danhSachMocTichLuy[i].ten);
                }
            }
            if (Array.isArray(duLieu.daXoa)) {
                danhSachKyDaXoaKhoiBieuDo = [];
                for (var j = 0; j < duLieu.daXoa.length; j++) {
                    danhSachKyDaXoaKhoiBieuDo.push(chuanHoaTenHocKy(duLieu.daXoa[j]));
                }
            }
        }
    } catch (loi) { }
}

function tinhGpaHopLeTuDanhSachMon(monList, he) {
    if (!Array.isArray(monList)) return null;
    var tongTinChi = 0;
    var tongDiem = 0;
    var tongHe10 = 0;
    var soMon = 0;
    var soMonCoDiem10 = 0;
    var coMon = false;
    var diemChuDaiDien = "";
    var diemCaoNhatHe4 = -1;
    var diemCaoNhatHe10 = -1;
    var diemChuCaoNhat = "";
    var thuTuChu = ["F", "D", "D+", "C", "C+", "B", "B+", "A", "A+"];

    for (var i = 0; i < monList.length; i++) {
        var mon = monList[i];
        if (!mon || !mon.tinh) continue;
        var chuoiTc = String(mon.tinChi || "").trim();
        var chuoiDiem = String(mon.diem || "").trim();
        var chuoiDiem10 = String(mon.diem10 || "").trim();
        if (chuoiTc === "") continue;

        var tc = docSo(chuoiTc);
        if (!(tc > 0 && tc <= 100)) continue;

        var diem = NaN;
        if (he === "10" && chuoiDiem10 !== "") {
            diem = quyDoi(chuoiDiem10, "10");
        }
        if (isNaN(diem) && chuoiDiem !== "") {
            diem = quyDoi(chuoiDiem, "4");
        }
        if (!hopLe(diem, 0, 4)) continue;

        if (diem > diemCaoNhatHe4) {
            diemCaoNhatHe4 = diem;
        }

        if (chuoiDiem10 !== "") {
            var so10 = docSo(chuoiDiem10);
            if (hopLe(so10, 0, 10)) {
                tongHe10 += so10 * tc;
                soMonCoDiem10++;
                if (so10 > diemCaoNhatHe10) {
                    diemCaoNhatHe10 = so10;
                }
            }
        } else if (he === "10" && !isNaN(diem)) {
            var d10Qd = diem * 2.5;
            if (d10Qd > diemCaoNhatHe10) {
                diemCaoNhatHe10 = d10Qd;
            }
        }

        var chuMon = chuoiDiem.toUpperCase();
        var idxChu = thuTuChu.indexOf(chuMon);
        if (idxChu !== -1) {
            var maxIdx = thuTuChu.indexOf(diemChuCaoNhat);
            if (maxIdx === -1 || idxChu > maxIdx) {
                diemChuCaoNhat = chuMon;
            }
        }

        tongTinChi += tc;
        tongDiem += diem * tc;
        soMon++;
        coMon = true;
        if (he === "chu") {
            diemChuDaiDien = chuoiDiem.toUpperCase();
        }
    }

    if (!coMon || tongTinChi <= 0) return null;
    var gpa = tongDiem / tongTinChi;

    if (he === "chu") {
        if (gpa >= 3.85) diemChuDaiDien = "A";
        else if (gpa >= 3.25) diemChuDaiDien = "B+";
        else if (gpa >= 2.75) diemChuDaiDien = "B";
        else if (gpa >= 2.25) diemChuDaiDien = "C+";
        else if (gpa >= 1.75) diemChuDaiDien = "C";
        else if (gpa >= 1.25) diemChuDaiDien = "D+";
        else if (gpa >= 0.5) diemChuDaiDien = "D";
        else diemChuDaiDien = "F";
    }

    var ketQua = {
        gpa: gpa,
        tongTinChi: tongTinChi,
        soMon: soMon,
        tongDiem: tongDiem,
        kieuNhap: he === "chu" ? "chu" : "so",
        diemChu: diemChuDaiDien,
        diemCaoNhatHe4: diemCaoNhatHe4 >= 0 ? diemCaoNhatHe4 : null,
        diemCaoNhat10: diemCaoNhatHe10 >= 0 ? diemCaoNhatHe10 : null,
        diemChuCaoNhat: diemChuCaoNhat || null
    };

    if (soMonCoDiem10 === soMon && soMon > 0) {
        ketQua.diemHe10Tb = tongHe10 / tongTinChi;
    }

    return ketQua;
}

function dongBoHocKySangTichLuy(tenKy, ketQuaKy) {
    if (!tenKy) return;

    if (ketQuaKy) {
        var viTriDaXoa = danhSachKyDaXoaKhoiBieuDo.indexOf(tenKy);
        if (viTriDaXoa !== -1) {
            danhSachKyDaXoaKhoiBieuDo.splice(viTriDaXoa, 1);
        }
        if (dangDungMocMau) {
            danhSachMocTichLuy = [];
            dangDungMocMau = false;
        }
        var viTri = -1;
        for (var i = 0; i < danhSachMocTichLuy.length; i++) {
            if (danhSachMocTichLuy[i].ten === tenKy) {
                viTri = i;
                break;
            }
        }
        var diem10Tb = (typeof ketQuaKy.diemHe10Tb === "number" && !isNaN(ketQuaKy.diemHe10Tb))
            ? ketQuaKy.diemHe10Tb
            : null;
        var mocMoi = {
            ten: tenKy,
            gpa: ketQuaKy.gpa,
            diemHe10: diem10Tb,
            tongTinChi: ketQuaKy.tongTinChi || 0,
            kieuNhap: ketQuaKy.kieuNhap,
            diemChu: ketQuaKy.diemChu || "",
            tuBangMon: true
        };
        if (viTri !== -1) {
            danhSachMocTichLuy[viTri] = mocMoi;
        } else {
            danhSachMocTichLuy.push(mocMoi);
        }
        sapXepMocTheoHocKy(danhSachMocTichLuy);
        luuBieuDoTichLuyVaoBoNho();
        veBieuDoTichLuy(danhSachMocTichLuy);
    } else if (!dangDungMocMau) {
        for (var j = danhSachMocTichLuy.length - 1; j >= 0; j--) {
            if (danhSachMocTichLuy[j].ten === tenKy && danhSachMocTichLuy[j].tuBangMon) {
                danhSachMocTichLuy.splice(j, 1);
            }
        }
        luuBieuDoTichLuyVaoBoNho();
        veBieuDoTichLuy(danhSachMocTichLuy);
    }
}

function tuDongLuuVaDongBoTichLuy() {
    if (!lay("danh-sach-mon") || !lay("ten-ky") || !lay("he-diem")) return;
    var tenKy = lay("ten-ky").value;
    var he = lay("he-diem").value;
    var danhSach = [];
    var dong = lay("danh-sach-mon").getElementsByTagName("tr");
    for (var i = 0; i < dong.length; i++) {
        var oTinh = dong[i].querySelector(".tinh");
        var oTen = dong[i].querySelector(".ten");
        var oTc = dong[i].querySelector(".tin-chi");
        var oDiem = dong[i].querySelector(".diem");
        var oDiem10 = dong[i].querySelector(".diem-10");
        if (!oTinh) continue;
        danhSach.push({
            tinh: oTinh.checked,
            ten: oTen ? oTen.value : "",
            tinChi: oTc ? oTc.value : "",
            diem: oDiem ? oDiem.value : "",
            diem10: oDiem10 ? oDiem10.value : ""
        });
    }

    var duLieuKy = { tenKy: tenKy, he: he, mon: danhSach };
    var tatCaKy = docTatCaHocKyDaLuu();
    tatCaKy[tenKy] = duLieuKy;

    try {
        ghiLuuTru(layKhoaLuu(), JSON.stringify(duLieuKy));
        ghiLuuTru(layKhoaLuuDanhSachKy(), JSON.stringify(tatCaKy));
    } catch (loi) { }

    var ketQuaKy = tinhGpaHopLeTuDanhSachMon(danhSach, he);
    dongBoHocKySangTichLuy(tenKy, ketQuaKy);

    if (ketQuaKy && ketQuaKy.soMon > 0) {
        hienThiKetQuaHocKy(ketQuaKy, he);
    } else {
        xoaKetQua();
    }

    capNhatHuyHieuDanhSachHocKy();

    if (lay("trang-thai-luu")) {
        lay("trang-thai-luu").innerText = ketQuaKy
            ? "Đã tự động lưu \"" + tenKy + "\" và đồng bộ điểm (" + hienSo(ketQuaKy.gpa) + ") sang mục GPA tích lũy."
            : "Đã tự động lưu danh sách môn của \"" + tenKy + "\".";
    }
}

function moCustomSelectHocKy() {
    var ds = lay("danh-sach-lua-chon-ky");
    var nut = lay("nut-kich-hoat-ten-ky");
    if (!ds || !nut) return;
    ds.removeAttribute("hidden");
    nut.setAttribute("aria-expanded", "true");
    var daChon = ds.querySelector('.muc-lua-chon-ky[aria-selected="true"]');
    if (daChon && typeof daChon.focus === "function") {
        daChon.focus();
    }
}

function dongCustomSelectHocKy() {
    var ds = lay("danh-sach-lua-chon-ky");
    var nut = lay("nut-kich-hoat-ten-ky");
    if (!ds || !nut) return;
    ds.setAttribute("hidden", "hidden");
    nut.setAttribute("aria-expanded", "false");
}

function moDongCustomSelectHocKy() {
    var nut = lay("nut-kich-hoat-ten-ky");
    if (!nut) return;
    var dangMo = nut.getAttribute("aria-expanded") === "true";
    if (dangMo) {
        dongCustomSelectHocKy();
    } else {
        moCustomSelectHocKy();
    }
}

function chonHocKyCustomSelect(tenKy) {
    if (!tenKy) return;
    var selectGoc = lay("ten-ky");
    if (selectGoc) {
        selectGoc.value = tenKy;
    }
    dongCustomSelectHocKy();
    chuyenHocKyTinhGpa();
}

function capNhatHuyHieuDanhSachHocKy() {
    var selectGoc = lay("ten-ky");
    var tenKyHienTai = selectGoc ? selectGoc.value : "";
    var nhanHienThi = lay("nhan-ky-dang-chon");
    if (nhanHienThi && tenKyHienTai) {
        nhanHienThi.innerText = tenKyHienTai;
    }

    var tatCaKy = docTatCaHocKyDaLuu();
    var ds = lay("danh-sach-lua-chon-ky");
    if (ds) {
        var items = ds.querySelectorAll(".muc-lua-chon-ky");
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var ten = item.getAttribute("data-value");
            var duLieuKy = tatCaKy[ten];
            var soMon = 0;
            if (duLieuKy && Array.isArray(duLieuKy.mon)) {
                var kq = tinhGpaHopLeTuDanhSachMon(duLieuKy.mon, duLieuKy.he);
                if (kq) soMon = kq.soMon;
            }

            var huyHieu = item.querySelector(".huy-hieu-so-mon-ky");
            if (huyHieu) {
                if (soMon > 0) {
                    huyHieu.innerText = soMon + " môn";
                    huyHieu.removeAttribute("hidden");
                } else {
                    huyHieu.innerText = "";
                    huyHieu.setAttribute("hidden", "hidden");
                }
            }

            if (ten === tenKyHienTai) {
                item.setAttribute("aria-selected", "true");
            } else {
                item.setAttribute("aria-selected", "false");
            }
        }
    }

    if (selectGoc && selectGoc.options) {
        for (var j = 0; j < selectGoc.options.length; j++) {
            var opt = selectGoc.options[j];
            var tenOpt = opt.value;
            var dl = tatCaKy[tenOpt];
            var sm = 0;
            if (dl && Array.isArray(dl.mon)) {
                var kqOpt = tinhGpaHopLeTuDanhSachMon(dl.mon, dl.he);
                if (kqOpt) sm = kqOpt.soMon;
            }
            if (sm > 0) {
                opt.text = tenOpt + " (" + sm + " môn)";
            } else {
                opt.text = tenOpt;
            }
        }
    }
}

function khoiTaoCustomSelectHocKy() {
    var nut = lay("nut-kich-hoat-ten-ky");
    var ds = lay("danh-sach-lua-chon-ky");
    if (!nut || !ds) return;

    nut.onclick = function (e) {
        if (e && typeof e.stopPropagation === "function") e.stopPropagation();
        moDongCustomSelectHocKy();
    };

    nut.onkeydown = function (e) {
        if (!e) return;
        if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter" || e.key === " ") {
            if (typeof e.preventDefault === "function") e.preventDefault();
            moCustomSelectHocKy();
        } else if (e.key === "Escape") {
            dongCustomSelectHocKy();
        }
    };

    var items = ds.querySelectorAll(".muc-lua-chon-ky");
    for (var i = 0; i < items.length; i++) {
        (function (item) {
            item.onclick = function (e) {
                if (e && typeof e.stopPropagation === "function") e.stopPropagation();
                var val = item.getAttribute("data-value");
                if (val) chonHocKyCustomSelect(val);
            };
            item.onkeydown = function (e) {
                if (!e) return;
                if (e.key === "Enter" || e.key === " ") {
                    if (typeof e.preventDefault === "function") e.preventDefault();
                    var val = item.getAttribute("data-value");
                    if (val) chonHocKyCustomSelect(val);
                } else if (e.key === "ArrowDown") {
                    if (typeof e.preventDefault === "function") e.preventDefault();
                    var next = item.nextElementSibling;
                    if (next && typeof next.focus === "function") next.focus();
                } else if (e.key === "ArrowUp") {
                    if (typeof e.preventDefault === "function") e.preventDefault();
                    var prev = item.previousElementSibling;
                    if (prev && typeof prev.focus === "function") prev.focus();
                } else if (e.key === "Escape") {
                    dongCustomSelectHocKy();
                    if (typeof nut.focus === "function") nut.focus();
                }
            };
        })(items[i]);
    }

    capNhatHuyHieuDanhSachHocKy();
}

function chuyenHocKyTinhGpa() {
    if (!lay("ten-ky") || !lay("danh-sach-mon")) return;
    var tenKyMoi = lay("ten-ky").value;
    var tatCaKy = docTatCaHocKyDaLuu();
    var duLieuKy = tatCaKy[tenKyMoi];
    var heHienTai = lay("he-diem") ? lay("he-diem").value : "4";

    lay("danh-sach-mon").innerHTML = "";
    if (duLieuKy && Array.isArray(duLieuKy.mon) && duLieuKy.mon.length > 0) {
        lay("he-diem").value = heHienTai;
        heDiemCu = heHienTai;
        for (var i = 0; i < duLieuKy.mon.length; i++) {
            themMon(duLieuKy.mon[i], true);
        }
        capNhatSoThuTuVaHeChuBangMon();

        var ketQuaKy = tinhGpaHopLeTuDanhSachMon(duLieuKy.mon, heHienTai);
        if (ketQuaKy && ketQuaKy.soMon > 0) {
            hienThiKetQuaHocKy(ketQuaKy, heHienTai);
        } else {
            xoaKetQua();
        }

        if (lay("trang-thai-luu")) {
            lay("trang-thai-luu").innerText = "Đã tải dữ liệu môn học đã lưu của \"" + tenKyMoi + "\".";
        }
    } else {
        lay("he-diem").value = heHienTai;
        heDiemCu = heHienTai;
        themMon(null, true);
        themMon(null, true);
        capNhatSoThuTuVaHeChuBangMon();
        xoaKetQua();
        if (lay("trang-thai-luu")) {
            lay("trang-thai-luu").innerText = "Đang chọn \"" + tenKyMoi + "\". Dữ liệu sẽ tự động lưu khi bạn điền môn học.";
        }
    }
    dongBoTichLuySangMucTieu();
    capNhatHuyHieuDanhSachHocKy();
}

function tinhGPA() {
    var dong = lay("danh-sach-mon").getElementsByTagName("tr");
    var he = lay("he-diem").value;
    var tongTinChi = 0, tongDiem = 0, tongHe10 = 0, soMon = 0;
    var soMonCoDiem10 = 0;
    var coLoi = false;
    var diemCaoNhatHe4 = -1;
    var diemCaoNhatHe10 = -1;
    var diemChuCaoNhat = "";
    var thuTuChu = ["F", "D", "D+", "C", "C+", "B", "B+", "A", "A+"];

    for (var i = 0; i < dong.length; i++) {
        var oTinh = dong[i].querySelector(".tinh");
        var oTc = dong[i].querySelector(".tin-chi");
        var oDiem = dong[i].querySelector(".diem");
        var oDiem10 = dong[i].querySelector(".diem-10");
        var loiTc = dong[i].querySelector(".loi-tin-chi");
        var loiDiem = dong[i].querySelector(".loi-diem");
        var loiDiem10 = dong[i].querySelector(".loi-diem-10");

        if (loiTc) loiTc.innerText = "";
        if (loiDiem) loiDiem.innerText = "";
        if (loiDiem10) loiDiem10.innerText = "";
        if (oTc) oTc.setAttribute("aria-invalid", "false");
        if (oDiem) oDiem.setAttribute("aria-invalid", "false");
        if (oDiem10) oDiem10.setAttribute("aria-invalid", "false");

        if (!oTinh || !oTinh.checked) continue;

        var tinChi = docSo(oTc.value);
        if (!(tinChi > 0 && tinChi <= 100)) {
            if (loiTc) loiTc.innerText = "Nhập tín chỉ > 0 và ≤ 100.";
            if (oTc) oTc.setAttribute("aria-invalid", "true");
            coLoi = true;
        }

        var diemHe4 = NaN;
        if (he === "10") {
            var chuoi10 = oDiem10 ? oDiem10.value.trim() : "";
            if (chuoi10 !== "") {
                var so10 = docSo(chuoi10);
                if (hopLe(so10, 0, 10)) {
                    diemHe4 = quyDoi(chuoi10, "10");
                    tongHe10 += so10 * tinChi;
                    soMonCoDiem10++;
                    if (so10 > diemCaoNhatHe10) {
                        diemCaoNhatHe10 = so10;
                    }
                } else {
                    if (loiDiem10) loiDiem10.innerText = "Nhập điểm từ 0 đến 10.";
                    if (oDiem10) oDiem10.setAttribute("aria-invalid", "true");
                    coLoi = true;
                }
            } else {
                diemHe4 = quyDoi(oDiem.value, "4");
                if (!hopLe(diemHe4, 0, 4)) {
                    if (loiDiem10) loiDiem10.innerText = "Nhập điểm hệ 10 từ 0 đến 10.";
                    if (oDiem10) oDiem10.setAttribute("aria-invalid", "true");
                    coLoi = true;
                }
            }
        } else {
            diemHe4 = quyDoi(oDiem.value, "4");
            if (!hopLe(diemHe4, 0, 4)) {
                if (loiDiem) loiDiem.innerText = "Nhập điểm từ 0 đến 4.";
                if (oDiem) oDiem.setAttribute("aria-invalid", "true");
                coLoi = true;
            }
        }

        if (hopLe(diemHe4, 0, 4) && tinChi > 0 && tinChi <= 100) {
            tongTinChi += tinChi;
            tongDiem += diemHe4 * tinChi;
            soMon++;
            if (diemHe4 > diemCaoNhatHe4) {
                diemCaoNhatHe4 = diemHe4;
            }
            if (he === "10" && (chuoi10 === "" || isNaN(so10))) {
                var d10Qd = diemHe4 * 2.5;
                if (d10Qd > diemCaoNhatHe10) {
                    diemCaoNhatHe10 = d10Qd;
                }
            }
            if (oDiem) {
                var chuMonVal = oDiem.value.trim().toUpperCase();
                var idxC = thuTuChu.indexOf(chuMonVal);
                if (idxC !== -1) {
                    var maxC = thuTuChu.indexOf(diemChuCaoNhat);
                    if (maxC === -1 || idxC > maxC) {
                        diemChuCaoNhat = chuMonVal;
                    }
                }
            }
        }
    }
    if (coLoi) {
        lay("loi-mon").innerText = "Chưa tính được: hãy sửa các ô được đánh dấu.";
        return;
    }
    if (tongTinChi === 0) {
        lay("loi-mon").innerText = "Chưa có môn được chọn để tính GPA.";
        return;
    }
    var gpa = tongDiem / tongTinChi;
    var ketQua = {
        gpa: gpa,
        tongTinChi: tongTinChi,
        soMon: soMon,
        tongDiem: tongDiem,
        diemCaoNhatHe4: diemCaoNhatHe4 >= 0 ? diemCaoNhatHe4 : null,
        diemCaoNhat10: diemCaoNhatHe10 >= 0 ? diemCaoNhatHe10 : null,
        diemChuCaoNhat: diemChuCaoNhat || null
    };
    if (he === "10" && soMonCoDiem10 === soMon && soMon > 0) {
        ketQua.diemHe10Tb = tongHe10 / tongTinChi;
    }
    hienThiKetQuaHocKy(ketQua, he);
    tuDongLuuVaDongBoTichLuy();
    capNhatHuyHieuDanhSachHocKy();
}

function doiHeDiem() {
    heDiemCu = lay("he-diem").value;
    capNhatSoThuTuVaHeChuBangMon();
    tuDongLuuVaDongBoTichLuy();
    capNhatHuyHieuDanhSachHocKy();
    if (lay("mau-so-gpa-ky")) {
        lay("mau-so-gpa-ky").innerText = heDiemCu === "10" ? "/ 10,0" : "/ 4,00";
    }
}

function lamMoi() {
    if (!confirm("Xóa danh sách môn đang nhập của học kỳ này?")) return;
    lay("danh-sach-mon").innerHTML = "";
    themMon();
}

function napDuLieuMauKhongHoi() {
    lay("danh-sach-mon").innerHTML = "";
    lay("he-diem").value = "4";
    heDiemCu = "4";
    if (!lay("ten-ky").value) {
        lay("ten-ky").value = "HK1 2024-2025";
    }
    themMon({ tinh: true, ten: "Marketing Dịch vụ", tinChi: "3", diem: "4" }, true);
    themMon({ tinh: true, ten: "Social Media Marketing", tinChi: "3", diem: "3,5" }, true);
    themMon({ tinh: true, ten: "Quản trị bán hàng", tinChi: "2", diem: "3" }, true);
    themMon({ tinh: true, ten: "Khoa học dữ liệu", tinChi: "3", diem: "3,5" }, true);
    themMon({ tinh: true, ten: "Thiết kế Web", tinChi: "3", diem: "4" }, true);
    themMon({ tinh: true, ten: "Tiếng Anh ngành Marketing", tinChi: "4", diem: "3,5" }, true);
    tinhGPA();
}

function duLieuMau() {
    if (!confirm("Thay danh sách đang nhập bằng dữ liệu mẫu?")) return;
    napDuLieuMauKhongHoi();
}

function kichHoatDuLieuMauTrangChu() {
    moTrang("tinh-gpa");
    var dsMon = lay("danh-sach-mon");
    if (!dsMon || dsMon.children.length === 0) {
        napDuLieuMauKhongHoi();
    } else {
        duLieuMau();
    }
    if (!danhSachMocTichLuy || danhSachMocTichLuy.length === 0) {
        napDuLieuBieuDoMau();
    }
}

var EMAIL_QUAN_TRI = "ducanh05012k6@gmail.com";
var thangBieuDoTichLuy = 4;
var dangDungMocMau = true;

function chuanHoaTenHocKy(ten) {
    if (!ten || typeof ten !== "string") return "";
    return ten.trim().replace(/\bHK\s+[hH][eèé]/i, "HK Hè");
}

var THU_TU_HOC_KY = [
    "HK1 2023-2024",
    "HK2 2023-2024",
    "HK1 2024-2025",
    "HK2 2024-2025",
    "HK Hè 2024-2025",
    "HK1 2025-2026",
    "HK2 2025-2026",
    "HK Hè 2025-2026",
    "HK1 2026-2027"
];

var danhSachMocTichLuy = [
    { ten: "HK1 2024-2025", gpa: 3.10, diemHe10: 7.75, tongTinChi: 12, kieuNhap: "so" },
    { ten: "HK2 2024-2025", gpa: 3.18, diemHe10: 7.95, tongTinChi: 12, kieuNhap: "so" },
    { ten: "HK1 2025-2026", gpa: 3.25, diemHe10: 8.12, tongTinChi: 12, kieuNhap: "so" },
    { ten: "HK2 2025-2026", gpa: 3.28, diemHe10: 8.20, tongTinChi: 12, kieuNhap: "so" },
    { ten: "HK1 2026-2027", gpa: 3.32, diemHe10: 8.30, tongTinChi: 12, kieuNhap: "so" }
];
var tenMocDangChon = null;
var danhSachKyDaXoaKhoiBieuDo = [];

function layTinChiCuaHocKy(tenKy, mocItem) {
    if (mocItem && typeof mocItem.tongTinChi === "number" && mocItem.tongTinChi > 0) {
        return mocItem.tongTinChi;
    }
    try {
        var tatCaKy = docTatCaHocKyDaLuu();
        if (tatCaKy && tatCaKy[tenKy] && Array.isArray(tatCaKy[tenKy].mon)) {
            var kq = tinhGpaHopLeTuDanhSachMon(tatCaKy[tenKy].mon, tatCaKy[tenKy].he);
            if (kq && typeof kq.tongTinChi === "number" && kq.tongTinChi > 0) {
                return kq.tongTinChi;
            }
        }
    } catch (loi) { }
    return 0;
}

function layDiemHe10CuaHocKy(tenKy, mocItem) {
    if (mocItem && typeof mocItem.diemHe10 === "number" && !isNaN(mocItem.diemHe10)) {
        return mocItem.diemHe10;
    }
    try {
        var tatCaKy = docTatCaHocKyDaLuu();
        if (tatCaKy && tatCaKy[tenKy] && Array.isArray(tatCaKy[tenKy].mon)) {
            var kq = tinhGpaHopLeTuDanhSachMon(tatCaKy[tenKy].mon, tatCaKy[tenKy].he || "10");
            if (kq && typeof kq.diemHe10Tb === "number" && !isNaN(kq.diemHe10Tb)) {
                return kq.diemHe10Tb;
            }
        }
    } catch (loi) { }
    return null;
}

function sapXepMocTheoHocKy(danhSach) {
    danhSach.sort(function (a, b) {
        var tenA = chuanHoaTenHocKy(a && a.ten ? a.ten : "");
        var tenB = chuanHoaTenHocKy(b && b.ten ? b.ten : "");
        var viTriA = THU_TU_HOC_KY.indexOf(tenA);
        var viTriB = THU_TU_HOC_KY.indexOf(tenB);
        if (viTriA === -1 && viTriB === -1) return 0;
        if (viTriA === -1) return 1;
        if (viTriB === -1) return -1;
        return viTriA - viTriB;
    });
}

function layMocHienThiTheoThang(danhSach) {
    if (!Array.isArray(danhSach)) return [];
    if (thangBieuDoTichLuy === 10) {
        var ketQua = [];
        for (var i = 0; i < danhSach.length; i++) {
            if (danhSach[i].kieuNhap !== "chu") {
                var d10 = layDiemHe10CuaHocKy(danhSach[i].ten, danhSach[i]);
                if (typeof d10 === "number" && !isNaN(d10)) {
                    ketQua.push(danhSach[i]);
                }
            }
        }
        return ketQua;
    }
    return danhSach.slice();
}

function coMocDiemSo() {
    for (var i = 0; i < danhSachMocTichLuy.length; i++) {
        if (danhSachMocTichLuy[i].kieuNhap !== "chu") {
            return true;
        }
    }
    return false;
}

function coMocHe10() {
    for (var i = 0; i < danhSachMocTichLuy.length; i++) {
        if (danhSachMocTichLuy[i].kieuNhap !== "chu") {
            var d10 = layDiemHe10CuaHocKy(danhSachMocTichLuy[i].ten, danhSachMocTichLuy[i]);
            if (typeof d10 === "number" && !isNaN(d10)) {
                return true;
            }
        }
    }
    return false;
}

function kichHoatTheSvg(tenThe, thuocTinh) {
    var phanTu = document.createElementNS("http://www.w3.org/2000/svg", tenThe);
    if (thuocTinh) {
        for (var khoa in thuocTinh) {
            if (Object.prototype.hasOwnProperty.call(thuocTinh, khoa)) {
                phanTu.setAttribute(khoa, thuocTinh[khoa]);
            }
        }
    }
    return phanTu;
}

function doiDiemTheoThangBieuDo(diemHe4, diemHe10) {
    if (thangBieuDoTichLuy === 10) {
        if (typeof diemHe10 === "number" && !isNaN(diemHe10)) {
            return diemHe10;
        }
        return diemHe4 * 2.5;
    }
    return diemHe4;
}

function layNutDoiThangBieuDo() {
    return lay("nut-doi-thang-bieu-do") || document.querySelector(".nhan-thang-diem");
}

function layMauSoThangBieuDo() {
    return lay("mau-so-thang-bieu-do") || document.querySelector(".chan-bieu-do-tich-luy .tren-bon");
}

function ganSuKienNutDoiThang() {
    var nutThang = layNutDoiThangBieuDo();
    if (!nutThang) return;
    if (!nutThang.onclick) {
        nutThang.onclick = doiThangBieuDoTichLuy;
    }
    if (nutThang.tagName !== "BUTTON") {
        nutThang.setAttribute("role", "button");
        nutThang.setAttribute("tabindex", "0");
        nutThang.onkeydown = function (suKien) {
            if (suKien.key === "Enter" || suKien.key === " ") {
                suKien.preventDefault();
                doiThangBieuDoTichLuy();
            }
        };
    }
}

function doiThangBieuDoTichLuy() {
    if (thangBieuDoTichLuy === 4) {
        if (!coMocHe10()) {
            if (lay("thong-bao-bieu-do")) {
                lay("thong-bao-bieu-do").innerText = "Chưa có mốc nào có dữ liệu điểm hệ 10 từ bảng môn học để hiển thị trên Thang 10.0.";
            }
            return;
        }
        thangBieuDoTichLuy = 10;
    } else {
        thangBieuDoTichLuy = 4;
    }

    veBieuDoTichLuy(danhSachMocTichLuy);
    if (lay("thong-bao-bieu-do")) {
        lay("thong-bao-bieu-do").innerText = thangBieuDoTichLuy === 10
            ? "Đã chuyển sang Thang 10.0 (chỉ tính và hiển thị các mốc học kỳ có điểm hệ 10 thực tế)."
            : "Đã chuyển biểu đồ về hiển thị chuẩn theo Thang 4.0.";
    }
}

function tinhTrungBinhMocBieuDo(moc) {
    if (!Array.isArray(moc) || moc.length === 0) return null;
    var tongDiemNhanTcHe4 = 0;
    var tongDiemNhanTcHienThi = 0;
    var tongTinChi = 0;
    var tongHe4DonGian = 0;
    var tongHienThiDonGian = 0;

    for (var i = 0; i < moc.length; i++) {
        var diemMocHe4 = Number(moc[i].gpa);
        var d10 = layDiemHe10CuaHocKy(moc[i].ten, moc[i]);
        var diemMocHienThi = doiDiemTheoThangBieuDo(diemMocHe4, d10);
        var tc = layTinChiCuaHocKy(moc[i].ten, moc[i]);

        tongHe4DonGian += diemMocHe4;
        tongHienThiDonGian += diemMocHienThi;

        if (typeof tc === "number" && tc > 0) {
            tongDiemNhanTcHe4 += diemMocHe4 * tc;
            tongDiemNhanTcHienThi += diemMocHienThi * tc;
            tongTinChi += tc;
        }
    }

    var tbHe4 = tongTinChi > 0 ? (tongDiemNhanTcHe4 / tongTinChi) : (tongHe4DonGian / moc.length);
    var tbHienThi = tongTinChi > 0 ? (tongDiemNhanTcHienThi / tongTinChi) : (tongHienThiDonGian / moc.length);

    return {
        gpaHe4: tbHe4,
        gpaXepLoaiHe4: Math.round(tbHe4 * 100) / 100,
        gpaHienThi: Math.round(tbHienThi * 100) / 100,
        tongTinChi: tongTinChi,
        soHocKy: moc.length
    };
}

function veBieuDoTichLuy(danhSachMoc, gpaTichLuyChung) {
    ganSuKienNutDoiThang();
    var svg = lay("bieu-do-gpa-svg");
    if (!svg) return;

    var laCheDoToi = document.body.classList.contains("che-do-toi");
    var moc = layMocHienThiTheoThang(danhSachMoc);

    var mauSo = layMauSoThangBieuDo();
    if (mauSo) {
        mauSo.innerText = thangBieuDoTichLuy === 10 ? "/ 10,0" : "/ 4,0";
    }
    var nutThang = layNutDoiThangBieuDo();
    if (nutThang) {
        nutThang.innerText = thangBieuDoTichLuy === 10 ? "↻ Thang 10.0" : "↻ Thang 4.0";
        if (thangBieuDoTichLuy === 10 || coMocHe10()) {
            nutThang.classList.remove("bi-khoa");
            nutThang.title = "Bấm để chuyển đổi hiển thị giữa Thang 4.0 và Thang 10.0";
        } else {
            nutThang.classList.add("bi-khoa");
            nutThang.title = "Cần có ít nhất 1 mốc có điểm hệ 10 để đổi sang Thang 10.0";
        }
    }

    while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
    }

    var laDiDong = (typeof window !== "undefined" && window.innerWidth <= 640) ||
                   (svg.clientWidth > 0 && svg.clientWidth <= 480);
    var rong = laDiDong ? 420 : 740;
    var cao = laDiDong ? 230 : 300;
    svg.setAttribute("viewBox", "0 0 " + rong + " " + cao);

    var leTrucTrai = laDiDong ? 34 : 48;
    var leTrucPhai = laDiDong ? 16 : 30;
    var leTren = laDiDong ? 32 : 48;
    var leDuoi = laDiDong ? 38 : 52;
    var vungCao = cao - leTren - leDuoi;

    var leTraiMoc = laDiDong ? 52 : 90;
    var lePhaiMoc = laDiDong ? 26 : 50;
    var vungRongMoc = rong - leTraiMoc - lePhaiMoc;

    function tinhY(diemHe4, diemHe10) {
        if (thangBieuDoTichLuy === 10 && typeof diemHe10 === "number" && !isNaN(diemHe10)) {
            var gioiHan10 = Math.max(0, Math.min(10, diemHe10));
            return leTren + vungCao - (gioiHan10 / 10) * vungCao;
        }
        var gioiHan = Math.max(0, Math.min(4, diemHe4));
        return leTren + vungCao - (gioiHan / 4) * vungCao;
    }

    function tinhX(chiSo, tongSo) {
        if (tongSo <= 1) return leTraiMoc + vungRongMoc / 2;
        return leTraiMoc + (chiSo * vungRongMoc) / (tongSo - 1);
    }

    var cacMocNgangHe4 = [1.0, 2.0, 3.0, 4.0];
    for (var g = 0; g < cacMocNgangHe4.length; g++) {
        var giaTriHe4 = cacMocNgangHe4[g];
        var yMoc = tinhY(giaTriHe4);
        var laMocChinh = giaTriHe4 === 3.0 || giaTriHe4 === 4.0;
        var nhanMoc = doiDiemTheoThangBieuDo(giaTriHe4);

        svg.appendChild(kichHoatTheSvg("line", {
            x1: leTrucTrai,
            y1: yMoc,
            x2: rong - leTrucPhai,
            y2: yMoc,
            stroke: laCheDoToi
                ? (laMocChinh ? "#475569" : "#334155")
                : (laMocChinh ? "#cbd5e1" : "#e2e8f0"),
            "stroke-width": laMocChinh ? "1.2" : "1",
            "stroke-dasharray": "4 4"
        }));

        var nhanY = kichHoatTheSvg("text", {
            x: leTrucTrai - (laDiDong ? 6 : 10),
            y: yMoc + 4,
            "text-anchor": "end",
            fill: laCheDoToi
                ? (laMocChinh ? "#cbd5e1" : "#94a3b8")
                : (laMocChinh ? "#475569" : "#94a3b8"),
            "font-size": laDiDong ? "12" : "11",
            "font-weight": laMocChinh ? "bold" : "600"
        });
        nhanY.textContent = nhanMoc.toFixed(1).replace(".", ",");
        svg.appendChild(nhanY);
    }

    var theChenhLech = lay("chenh-lech-gpa-tich-luy");
    var theGoiY = lay("goi-y-tuong-tac-bieu-do");

    if (moc.length === 0) {
        boChonMocBieuDo();
        if (theGoiY) {
            theGoiY.style.display = "none";
        }
        if (lay("so-gpa-tich-luy-lon")) {
            lay("so-gpa-tich-luy-lon").innerText = "—";
        }
        if (theChenhLech) {
            theChenhLech.className = "nhan-chenh-lech";
            theChenhLech.innerText = "Chưa có mốc học kỳ trên biểu đồ";
        }
        dongBoTichLuySangMucTieu(null);

        var tamX = leTraiMoc + vungRongMoc / 2;
        var tamY = leTren + vungCao / 2;
        var theRong = laDiDong ? 330 : 420;
        var theCao = laDiDong ? 122 : 132;
        var theX = tamX - theRong / 2;
        var theY = tamY - theCao / 2;

        var theNen = kichHoatTheSvg("rect", {
            x: theX,
            y: theY,
            width: theRong,
            height: theCao,
            rx: "14",
            ry: "14",
            fill: laCheDoToi ? "#151d30" : "#ffffff",
            stroke: laCheDoToi ? "#243048" : "#e0e7ff",
            "stroke-width": "1.5",
            "class": "nen-the-trong-bieu-do"
        });
        svg.appendChild(theNen);

        var tieuDeTrong = kichHoatTheSvg("text", {
            x: tamX,
            y: theY + (laDiDong ? 34 : 38),
            "text-anchor": "middle",
            fill: laCheDoToi ? "#f8fafc" : "#0f172a",
            "font-size": laDiDong ? "13.5" : "14.5",
            "font-weight": "bold"
        });
        tieuDeTrong.textContent = "📊 Chưa có dữ liệu tiến trình học kỳ";
        svg.appendChild(tieuDeTrong);

        var moTaTrong = kichHoatTheSvg("text", {
            x: tamX,
            y: theY + (laDiDong ? 58 : 64),
            "text-anchor": "middle",
            fill: laCheDoToi ? "#94a3b8" : "#64748b",
            "font-size": laDiDong ? "11" : "11.5"
        });
        moTaTrong.textContent = "Lưu học kỳ từ bảng bên dưới hoặc trải nghiệm dữ liệu mẫu";
        svg.appendChild(moTaTrong);

        var nutRong = laDiDong ? 152 : 164;
        var nutCao = laDiDong ? 32 : 34;
        var nutX = tamX - nutRong / 2;
        var nutY = theY + (laDiDong ? 74 : 80);

        var nhomNutMau = kichHoatTheSvg("g", {
            "class": "nhom-nut-thu-mau-svg",
            "role": "button",
            "tabindex": "0",
            "aria-label": "Thử dữ liệu mẫu cho biểu đồ tiến trình"
        });

        var nenNutMau = kichHoatTheSvg("rect", {
            x: nutX,
            y: nutY,
            width: nutRong,
            height: nutCao,
            rx: "8",
            ry: "8",
            fill: "#4f46e5",
            "class": "nen-nut-thu-mau-svg"
        });
        nhomNutMau.appendChild(nenNutMau);

        var chuNutMau = kichHoatTheSvg("text", {
            x: tamX,
            y: nutY + (laDiDong ? 20 : 21),
            "text-anchor": "middle",
            fill: "#ffffff",
            "font-size": laDiDong ? "11.5" : "12",
            "font-weight": "bold"
        });
        chuNutMau.textContent = "✦ Thử dữ liệu mẫu";
        nhomNutMau.appendChild(chuNutMau);

        nhomNutMau.onclick = function (suKien) {
            if (suKien && suKien.stopPropagation) suKien.stopPropagation();
            kichHoatDuLieuMauTrangChu();
        };

        nhomNutMau.onkeydown = function (suKien) {
            if (suKien.key === "Enter" || suKien.key === " ") {
                suKien.preventDefault();
                kichHoatDuLieuMauTrangChu();
            }
        };

        svg.appendChild(nhomNutMau);
        return;
    }

    if (theGoiY) {
        theGoiY.style.display = "flex";
    }

    var ketQuaTb = tinhTrungBinhMocBieuDo(moc);
    var gpaHienThi = 0;
    var gpaXepLoaiHe4 = 0;

    if (typeof gpaTichLuyChung === "number" && !isNaN(gpaTichLuyChung)) {
        gpaHienThi = doiDiemTheoThangBieuDo(gpaTichLuyChung);
        gpaXepLoaiHe4 = gpaTichLuyChung;
    } else if (ketQuaTb) {
        gpaHienThi = ketQuaTb.gpaHienThi;
        gpaXepLoaiHe4 = ketQuaTb.gpaXepLoaiHe4;
    }

    if (lay("so-gpa-tich-luy-lon")) {
        lay("so-gpa-tich-luy-lon").innerText = hienSo(gpaHienThi);
    }

    if (theChenhLech) {
        theChenhLech.className = "nhan-chenh-lech";
        theChenhLech.innerText = "Tính trên " + moc.length + " học kỳ · Xếp loại: " + xepLoai(gpaXepLoaiHe4);
    }

    dongBoTichLuySangMucTieu(tinhTrungBinhMocBieuDo(danhSachMoc));

    var defs = kichHoatTheSvg("defs");
    var gradient = kichHoatTheSvg("linearGradient", {
        id: "gradient-vung-gpa",
        x1: "0%",
        y1: "0%",
        x2: "0%",
        y2: "100%"
    });
    gradient.appendChild(kichHoatTheSvg("stop", {
        offset: "0%",
        "stop-color": "#4f46e5",
        "stop-opacity": "0.22"
    }));
    gradient.appendChild(kichHoatTheSvg("stop", {
        offset: "100%",
        "stop-color": "#4f46e5",
        "stop-opacity": "0.02"
    }));
    defs.appendChild(gradient);
    svg.insertBefore(defs, svg.firstChild);

    var dayY = leTren + vungCao;

    svg.appendChild(kichHoatTheSvg("line", {
        x1: leTrucTrai,
        y1: dayY,
        x2: rong - leTrucPhai,
        y2: dayY,
        stroke: laCheDoToi ? "#334155" : "#f1f5f9",
        "stroke-width": "1"
    }));

    var danhSachToaDo = [];
    for (var i = 0; i < moc.length; i++) {
        var tcMoc = layTinChiCuaHocKy(moc[i].ten, moc[i]);
        var d10Moc = layDiemHe10CuaHocKy(moc[i].ten, moc[i]);
        danhSachToaDo.push({
            x: tinhX(i, moc.length),
            y: tinhY(moc[i].gpa, d10Moc),
            ten: moc[i].ten,
            gpaHe4: moc[i].gpa,
            diemHe10: d10Moc,
            tongTinChi: tcMoc,
            kieuNhap: moc[i].kieuNhap || "so",
            diemChu: moc[i].diemChu || "",
            gpaHienThi: doiDiemTheoThangBieuDo(moc[i].gpa, d10Moc)
        });
    }

    if (danhSachToaDo.length >= 2) {
        var diemDaGiac = danhSachToaDo[0].x + "," + dayY + " ";
        var diemDuong = "";
        for (var k = 0; k < danhSachToaDo.length; k++) {
            var diemHienTai = danhSachToaDo[k].x + "," + danhSachToaDo[k].y;
            diemDaGiac += diemHienTai + " ";
            diemDuong += (k === 0 ? "" : " ") + diemHienTai;
        }
        diemDaGiac += danhSachToaDo[danhSachToaDo.length - 1].x + "," + dayY;

        svg.appendChild(kichHoatTheSvg("polygon", {
            points: diemDaGiac,
            fill: "url(#gradient-vung-gpa)"
        }));

        svg.appendChild(kichHoatTheSvg("polyline", {
            points: diemDuong,
            fill: "none",
            stroke: "#4f46e5",
            "stroke-width": laDiDong ? "4" : "3.5",
            "stroke-linecap": "round",
            "stroke-linejoin": "round"
        }));
    }

    for (var j = 0; j < danhSachToaDo.length; j++) {
        var diemNut = danhSachToaDo[j];
        var laDiemCuoi = j === danhSachToaDo.length - 1;
        var laDiemChon = tenMocDangChon === diemNut.ten;
        svg.appendChild(kichHoatTheSvg("line", {
            x1: diemNut.x,
            y1: diemNut.y + (laDiemChon ? 11 : 8),
            x2: diemNut.x,
            y2: dayY,
            stroke: laDiemChon ? "#fca5a5" : (laCheDoToi ? (laDiemCuoi ? "#4338ca" : "#334155") : (laDiemCuoi ? "#c7d2fe" : "#e2e8f0")),
            "stroke-width": "1.2",
            "stroke-dasharray": "3 3"
        }));
    }

    for (var m = 0; m < danhSachToaDo.length; m++) {
        var nut = danhSachToaDo[m];
        var laNutCuoi = m === danhSachToaDo.length - 1;
        var dangChon = tenMocDangChon === nut.ten;

        var moTaTc = nut.tongTinChi > 0 ? ", " + String(nut.tongTinChi).replace(".", ",") + " tín chỉ" : "";
        var nhomNut = kichHoatTheSvg("g", {
            "class": "nhom-nut-moc-gpa" + (dangChon ? " dang-chon" : "") + (laNutCuoi ? " nut-cuoi" : ""),
            "data-ten-moc": nut.ten,
            "tabindex": "0",
            "role": "button",
            "aria-label": "Mốc học kỳ " + nut.ten + ", điểm GPA " + hienSo(nut.gpaHienThi) + moTaTc + ". Bấm để chọn và xóa."
        });

        var vongHit = kichHoatTheSvg("circle", {
            cx: nut.x,
            cy: nut.y,
            r: laDiDong ? "22" : "18",
            fill: "transparent",
            "class": "vong-hit-moc"
        });
        nhomNut.appendChild(vongHit);

        var vongSang = kichHoatTheSvg("circle", {
            cx: nut.x,
            cy: nut.y,
            r: dangChon ? (laDiDong ? "17" : "16") : (laNutCuoi ? (laDiDong ? "14" : "13") : "11"),
            fill: dangChon ? "#e11d48" : (laNutCuoi ? "#4f46e5" : "transparent"),
            "fill-opacity": dangChon ? "0.22" : (laNutCuoi ? "0.15" : "0"),
            "class": "vong-sang-moc"
        });
        nhomNut.appendChild(vongSang);

        var vongTron = kichHoatTheSvg("circle", {
            cx: nut.x,
            cy: nut.y,
            r: dangChon ? "8" : (laDiDong ? "7" : "6.5"),
            fill: dangChon ? "#fff1f2" : "#ffffff",
            stroke: dangChon ? "#e11d48" : (laNutCuoi ? "#4f46e5" : "#6366f1"),
            "stroke-width": dangChon ? "3.5" : (laDiDong ? "3.5" : "3.2"),
            "class": "cham-moc-gpa"
        });
        var chuThich = kichHoatTheSvg("title");
        chuThich.textContent = nut.ten + ": " + hienSo(nut.gpaHienThi) + " / " + (thangBieuDoTichLuy === 10 ? "10,00" : "4,00") +
            (nut.diemChu ? " (" + nut.diemChu + ")" : "") + moTaTc + " — Bấm để chọn và xóa";
        vongTron.appendChild(chuThich);
        nhomNut.appendChild(vongTron);

        if (nhomNut.addEventListener) {
            nhomNut.addEventListener("click", (function (tTen, nX, nY, nDiem, nChu, nTc) {
                return function (suKien) {
                    suKien.stopPropagation();
                    chonMocBieuDo(tTen, nX, nY, nDiem, nChu, nTc);
                };
            })(nut.ten, nut.x, nut.y, nut.gpaHienThi, nut.diemChu, nut.tongTinChi));

            nhomNut.addEventListener("dblclick", (function (tTen) {
                return function (suKien) {
                    if (suKien && suKien.preventDefault) suKien.preventDefault();
                    if (suKien && suKien.stopPropagation) suKien.stopPropagation();
                    chuyenDenHocKyTuBieuDo(tTen);
                };
            })(nut.ten));

            var thoiGianChamCuoi = 0;
            nhomNut.addEventListener("touchend", (function (tTen) {
                return function (suKien) {
                    var bayGio = Date.now ? Date.now() : new Date().getTime();
                    var khoangCach = bayGio - thoiGianChamCuoi;
                    if (khoangCach > 0 && khoangCach < 380) {
                        if (suKien && suKien.preventDefault) suKien.preventDefault();
                        if (suKien && suKien.stopPropagation) suKien.stopPropagation();
                        chuyenDenHocKyTuBieuDo(tTen);
                        thoiGianChamCuoi = 0;
                        return;
                    }
                    thoiGianChamCuoi = bayGio;
                };
            })(nut.ten));

            nhomNut.addEventListener("keydown", (function (tTen, nX, nY, nDiem, nChu, nTc) {
                return function (suKien) {
                    if (suKien.key === "Enter" || suKien.key === " ") {
                        suKien.preventDefault();
                        suKien.stopPropagation();
                        chonMocBieuDo(tTen, nX, nY, nDiem, nChu, nTc);
                    } else if (suKien.key === "Delete" || suKien.key === "Backspace") {
                        suKien.preventDefault();
                        suKien.stopPropagation();
                        xoaMocTheoTen(tTen);
                    } else if (suKien.key === "Escape") {
                        suKien.preventDefault();
                        boChonMocBieuDo();
                    }
                };
            })(nut.ten, nut.x, nut.y, nut.gpaHienThi, nut.diemChu, nut.tongTinChi));
        } else {
            nhomNut.onclick = (function (tTen, nX, nY, nDiem, nChu, nTc) {
                return function (suKien) {
                    if (suKien && suKien.stopPropagation) suKien.stopPropagation();
                    chonMocBieuDo(tTen, nX, nY, nDiem, nChu, nTc);
                };
            })(nut.ten, nut.x, nut.y, nut.gpaHienThi, nut.diemChu, nut.tongTinChi);

            nhomNut.ondblclick = (function (tTen) {
                return function (suKien) {
                    if (suKien && suKien.stopPropagation) suKien.stopPropagation();
                    chuyenDenHocKyTuBieuDo(tTen);
                };
            })(nut.ten);
        }

        svg.appendChild(nhomNut);

        var doLechY = 0;
        if (m > 0) {
            var nutTruoc = danhSachToaDo[m - 1];
            if (Math.abs(nut.x - nutTruoc.x) < 70 && Math.abs(nut.y - nutTruoc.y) < 18) {
                doLechY = (m % 2 === 1) ? -7 : 5;
            }
        }
        var yGoc = nut.y - (laDiDong ? 10 : 14) + doLechY;
        var yNhanDiem = Math.max(laDiDong ? 16 : 20, yGoc);

        var nhanDiem = kichHoatTheSvg("text", {
            x: nut.x,
            y: yNhanDiem,
            "text-anchor": "middle",
            fill: dangChon ? "#e11d48" : (laCheDoToi ? (laNutCuoi ? "#818cf8" : "#f1f5f9") : (laNutCuoi ? "#4338ca" : "#334155")),
            "font-size": laDiDong ? "13.5" : "11.5",
            "font-weight": "bold"
        });
        nhanDiem.textContent = nut.kieuNhap === "chu" && nut.diemChu && thangBieuDoTichLuy === 4
            ? hienSo(nut.gpaHienThi) + " (" + nut.diemChu + ")"
            : hienSo(nut.gpaHienThi);
        svg.appendChild(nhanDiem);

        var nhanKy = kichHoatTheSvg("text", {
            x: nut.x,
            y: cao - (laDiDong ? 12 : 16),
            "text-anchor": "middle",
            fill: dangChon ? "#e11d48" : (laCheDoToi ? (laNutCuoi ? "#c7d2fe" : "#94a3b8") : (laNutCuoi ? "#1e1b4b" : "#64748b")),
            "font-size": laDiDong ? (danhSachToaDo.length > 5 ? "11" : "12.5") : (danhSachToaDo.length > 6 ? "10" : "11"),
            "font-weight": (laNutCuoi || dangChon) ? "bold" : "600"
        });
        var tenNhan = String(nut.ten || "");
        if (danhSachToaDo.length >= 4 && tenNhan) {
            tenNhan = tenNhan
                .replace(/\b20(\d{2})-20(\d{2})\b/g, "$1-$2")
                .replace(/\bHK\s*(?:hè|he)/gi, "Hè");
        }
        if ((danhSachToaDo.length >= 7 || (laDiDong && danhSachToaDo.length >= 5)) && tenNhan) {
            tenNhan = tenNhan.replace(/\bHK(\d+)\b/gi, "K$1");
        }
        nhanKy.textContent = tenNhan;
        svg.appendChild(nhanKy);
    }

    svg.onclick = function (suKien) {
        if (!suKien.target.closest || !suKien.target.closest(".nhom-nut-moc-gpa")) {
            boChonMocBieuDo();
        }
    };

    var timThayMocChon = null;
    if (tenMocDangChon) {
        for (var n = 0; n < danhSachToaDo.length; n++) {
            if (danhSachToaDo[n].ten === tenMocDangChon) {
                timThayMocChon = danhSachToaDo[n];
                break;
            }
        }
    }
    if (timThayMocChon) {
        capNhatViTriHopXoaMoc(timThayMocChon);
    } else {
        boChonMocBieuDo();
    }
}

function capNhatViTriHopXoaMoc(nut) {
    var hop = lay("hop-xoa-moc-bieu-do");
    if (!hop || !nut) return;
    var oTen = lay("ten-moc-dang-chon");
    var oDiem = lay("diem-moc-dang-chon");
    var oTinChi = lay("tin-chi-moc-dang-chon");
    if (oTen) {
        var tenHien = String(nut.ten || "");
        oTen.innerText = tenHien.replace(/\b20(\d{2})-20(\d{2})\b/g, "$1-$2");
        oTen.title = nut.ten;
    }
    if (oDiem) {
        oDiem.innerText = hienSo(nut.gpaHienThi) + (nut.diemChu && thangBieuDoTichLuy === 4 ? " (" + nut.diemChu + ")" : "");
    }
    if (oTinChi) {
        if (typeof nut.tongTinChi === "number" && nut.tongTinChi > 0) {
            oTinChi.innerText = String(nut.tongTinChi).replace(".", ",") + " TC";
            oTinChi.style.display = "";
        } else {
            oTinChi.innerText = "— TC";
            oTinChi.style.display = "";
        }
    }
    var bieuDoSvg = lay("bieu-do-gpa-svg");
    var vBox = bieuDoSvg && bieuDoSvg.viewBox && bieuDoSvg.viewBox.baseVal ? bieuDoSvg.viewBox.baseVal : null;
    var laManHinhNho = (typeof window !== "undefined" && window.innerWidth <= 640) ||
                       (bieuDoSvg && bieuDoSvg.clientWidth > 0 && bieuDoSvg.clientWidth <= 480);
    var vRong = (vBox && vBox.width) ? vBox.width : (laManHinhNho ? 420 : 740);
    var vCao = (vBox && vBox.height) ? vBox.height : (laManHinhNho ? 230 : 300);

    var phanTramX = (nut.x / vRong) * 100;
    var phanTramY = (nut.y / vCao) * 100;
    hop.style.left = phanTramX.toFixed(2) + "%";
    hop.style.top = phanTramY.toFixed(2) + "%";

    hop.classList.remove("lech-trai", "lech-phai", "o-duoi", "neo-trai", "neo-phai");
    if (phanTramX < 26) {
        hop.classList.add("neo-trai");
    } else if (phanTramX > 74) {
        hop.classList.add("neo-phai");
    } else if (nut.x < 135) {
        hop.classList.add("lech-trai");
    } else if (nut.x > vRong - 135) {
        hop.classList.add("lech-phai");
    }

    if (phanTramY < 28 || nut.y < 75) {
        hop.classList.add("o-duoi");
    }
    hop.removeAttribute("hidden");
}

function boChonMocBieuDo() {
    tenMocDangChon = null;
    var hop = lay("hop-xoa-moc-bieu-do");
    if (hop) {
        hop.setAttribute("hidden", "hidden");
    }
    var cacNut = document.querySelectorAll ? document.querySelectorAll(".nhom-nut-moc-gpa.dang-chon") : [];
    for (var i = 0; i < cacNut.length; i++) {
        cacNut[i].classList.remove("dang-chon");
    }
}

function chonMocBieuDo(tenMoc, x, y, diemHienThi, diemChu, tongTinChi) {
    if (tenMocDangChon === tenMoc) {
        boChonMocBieuDo();
        return;
    }
    tenMocDangChon = tenMoc;
    capNhatViTriHopXoaMoc({
        x: x,
        y: y,
        ten: tenMoc,
        gpaHienThi: diemHienThi,
        diemChu: diemChu,
        tongTinChi: tongTinChi
    });
    var cacNut = document.querySelectorAll ? document.querySelectorAll(".nhom-nut-moc-gpa") : [];
    for (var i = 0; i < cacNut.length; i++) {
        if (cacNut[i].getAttribute("data-ten-moc") === tenMoc) {
            cacNut[i].classList.add("dang-chon");
            if (typeof cacNut[i].focus === "function") {
                cacNut[i].focus();
            }
        } else {
            cacNut[i].classList.remove("dang-chon");
        }
    }
}

function xoaMocTheoTen(tenMoc) {
    var thongBao = lay("thong-bao-bieu-do");
    if (!tenMoc) return;
    dangDungMocMau = false;

    var viTri = -1;
    for (var i = 0; i < danhSachMocTichLuy.length; i++) {
        if (danhSachMocTichLuy[i].ten === tenMoc) {
            viTri = i;
            break;
        }
    }
    if (viTri === -1) {
        if (thongBao) thongBao.innerText = "Không tìm thấy mốc \"" + tenMoc + "\" trên biểu đồ.";
        return;
    }

    var daXoa = danhSachMocTichLuy.splice(viTri, 1)[0];
    if (danhSachKyDaXoaKhoiBieuDo.indexOf(tenMoc) === -1) {
        danhSachKyDaXoaKhoiBieuDo.push(tenMoc);
    }

    if (thangBieuDoTichLuy === 10 && !coMocHe10()) {
        thangBieuDoTichLuy = 4;
    }

    boChonMocBieuDo();
    luuBieuDoTichLuyVaoBoNho();
    veBieuDoTichLuy(danhSachMocTichLuy);

    if (thongBao) {
        thongBao.innerText = danhSachMocTichLuy.length > 0
            ? "Đã xóa mốc \"" + daXoa.ten + "\" khỏi biểu đồ."
            : "Đã xóa hết các mốc học kỳ trên biểu đồ.";
    }
}

function xoaMocDangChonBieuDo() {
    if (tenMocDangChon) {
        xoaMocTheoTen(tenMocDangChon);
    }
}

function chuyenDenHocKyTuBieuDo(tenMoc) {
    if (!tenMoc) return;

    var selectGoc = lay("ten-ky");
    var tenKyTimThay = "";
    if (selectGoc && selectGoc.options) {
        var tenChuanHoa = String(tenMoc).trim().toLowerCase().replace(/\s+/g, " ");
        for (var i = 0; i < selectGoc.options.length; i++) {
            var optVal = String(selectGoc.options[i].value).trim().toLowerCase().replace(/\s+/g, " ");
            if (optVal === tenChuanHoa) {
                tenKyTimThay = selectGoc.options[i].value;
                break;
            }
        }
    }
    if (!tenKyTimThay) {
        tenKyTimThay = tenMoc;
    }

    chonHocKyCustomSelect(tenKyTimThay);
    boChonMocBieuDo();

    var theMonHoc = lay("the-nhap-mon-hoc");
    if (theMonHoc && typeof theMonHoc.scrollIntoView === "function") {
        theMonHoc.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    var hopSelect = lay("nut-kich-hoat-ten-ky") || lay("khung-tuy-bien-ky");
    if (hopSelect) {
        hopSelect.classList.remove("hieu-ung-nhan-ky-pulse");
        void hopSelect.offsetWidth;
        hopSelect.classList.add("hieu-ung-nhan-ky-pulse");
        setTimeout(function () {
            hopSelect.classList.remove("hieu-ung-nhan-ky-pulse");
        }, 1500);
    }
}

function chuyenDenHocKyTuMocDangChon() {
    if (tenMocDangChon) {
        chuyenDenHocKyTuBieuDo(tenMocDangChon);
    }
}

function napDuLieuBieuDoMau() {
    dangDungMocMau = true;
    danhSachKyDaXoaKhoiBieuDo = [];
    boChonMocBieuDo();
    danhSachMocTichLuy = [
        { ten: "HK1 2024-2025", gpa: 3.10, diemHe10: 7.75, tongTinChi: 12, kieuNhap: "so" },
        { ten: "HK2 2024-2025", gpa: 3.18, diemHe10: 7.95, tongTinChi: 12, kieuNhap: "so" },
        { ten: "HK1 2025-2026", gpa: 3.25, diemHe10: 8.12, tongTinChi: 12, kieuNhap: "so" },
        { ten: "HK2 2025-2026", gpa: 3.28, diemHe10: 8.20, tongTinChi: 12, kieuNhap: "so" },
        { ten: "HK1 2026-2027", gpa: 3.32, diemHe10: 8.30, tongTinChi: 12, kieuNhap: "so" }
    ];
    luuBieuDoTichLuyVaoBoNho();
    veBieuDoTichLuy(danhSachMocTichLuy);
    if (lay("thong-bao-bieu-do")) {
        lay("thong-bao-bieu-do").innerText = "Đã nạp bộ dữ liệu biểu đồ mẫu gồm 5 mốc học kỳ.";
    }
}

function chonLoaiTotNghiepMucTieu() {
    var oLoai = lay("loai-tot-nghiep-muc-tieu");
    var oGpaMucTieu = lay("gpa-muc-tieu");
    if (!oLoai || !oGpaMucTieu) return;
    if (oLoai.value !== "") {
        var soMucTieu = Number(oLoai.value);
        oGpaMucTieu.value = hienSo(soMucTieu);
    }
    dongBoHuyHieuHangMucTieu(oLoai.value);
    luuMucTieuVaoBoNho();
    capNhatThanhTienDoTinChi();
}

function dongBoHuyHieuHangMucTieu(val) {
    var buttons = document.querySelectorAll(".nut-hang-nhanh");
    for (var i = 0; i < buttons.length; i++) {
        var gpaAttr = buttons[i].getAttribute("data-gpa");
        if (val && gpaAttr === String(val)) {
            buttons[i].classList.add("dang-chon");
            buttons[i].setAttribute("aria-pressed", "true");
        } else {
            buttons[i].classList.remove("dang-chon");
            buttons[i].setAttribute("aria-pressed", "false");
        }
    }
}

function chonNhanhHangMucTieu(giaTri) {
    var oLoai = lay("loai-tot-nghiep-muc-tieu");
    var oGpaMucTieu = lay("gpa-muc-tieu");
    if (!oGpaMucTieu) return;
    if (oLoai) oLoai.value = giaTri;
    oGpaMucTieu.value = hienSo(Number(giaTri));
    dongBoHuyHieuHangMucTieu(giaTri);
    luuMucTieuVaoBoNho();
    capNhatThanhTienDoTinChi();

    var chuoiConLai = lay("tin-chi-con-lai") ? lay("tin-chi-con-lai").value.trim() : "";
    var chuoiToanKhoa = lay("tong-tc-toan-khoa") ? lay("tong-tc-toan-khoa").value.trim() : "";
    if (chuoiConLai !== "" || chuoiToanKhoa !== "") {
        tinhMucTieu();
    }
}

function capNhatThanhTienDoTinChi() {
    var oHienTai = lay("tin-chi-hien-tai");
    var oToanKhoa = lay("tong-tc-toan-khoa");
    var oConLai = lay("tin-chi-con-lai");
    var nhan = lay("nhan-tien-do-tin-chi");
    var fill = lay("tien-do-tc-fill");
    var progressbar = document.querySelector(".thanh-tien-do-tc");
    if (!nhan || !fill) return;

    var tcHienTai = oHienTai && oHienTai.value.trim() !== "" ? docSo(oHienTai.value) : 0;
    var tcToanKhoa = oToanKhoa && oToanKhoa.value.trim() !== "" ? docSo(oToanKhoa.value) : 0;
    var tcConLai = oConLai && oConLai.value.trim() !== "" ? docSo(oConLai.value) : 0;

    if (isNaN(tcHienTai) || tcHienTai < 0) tcHienTai = 0;
    if (isNaN(tcToanKhoa) || tcToanKhoa <= 0) {
        if (!isNaN(tcConLai) && tcConLai > 0) {
            tcToanKhoa = tcHienTai + tcConLai;
        }
    }

    if (tcToanKhoa > 0) {
        var phanTram = Math.min(100, Math.max(0, Math.round((tcHienTai / tcToanKhoa) * 100)));
        nhan.innerText = hienSo(tcHienTai) + " / " + hienSo(tcToanKhoa) + " TC (" + phanTram + "%)";
        fill.style.width = phanTram + "%";
        if (progressbar) progressbar.setAttribute("aria-valuenow", String(phanTram));
    } else {
        nhan.innerText = "0 / 0 TC (0%)";
        fill.style.width = "0%";
        if (progressbar) progressbar.setAttribute("aria-valuenow", "0");
    }
}


function lamMoiMucTieu() {
    if (!confirm("Xóa toàn bộ thông tin đang nhập trong phần Mục tiêu GPA?")) return;
    if (lay("loai-tot-nghiep-muc-tieu")) lay("loai-tot-nghiep-muc-tieu").value = "";
    if (lay("gpa-muc-tieu")) lay("gpa-muc-tieu").value = "";
    if (lay("gpa-hien-tai")) lay("gpa-hien-tai").value = "";
    if (lay("tong-tc-toan-khoa")) lay("tong-tc-toan-khoa").value = "";
    if (lay("tin-chi-hien-tai")) lay("tin-chi-hien-tai").value = "";
    if (lay("tin-chi-con-lai")) lay("tin-chi-con-lai").value = "";
    dongBoHuyHieuHangMucTieu("");
    capNhatThanhTienDoTinChi();
    try {
        xoaLuuTru(layKhoaLuuMucTieu());
    } catch (e) { }

    var ketQua = lay("ket-qua-muc-tieu");
    if (ketQua) {
        ketQua.className = "ket-qua hop-ket-qua-du-doan";
        ketQua.innerHTML =
            '<h3>KẾT QUẢ DỰ ĐOÁN</h3>' +
            '<div class="vong-diem vong-diem-muc-tieu">' +
            '    <span class="icon-vong-diem" aria-hidden="true">🎯</span>' +
            '    <strong>—</strong>' +
            '    <span>/ 4,00 CẦN ĐẠT</span>' +
            '</div>' +
            '<p class="xep-loai">Chưa có kết quả</p>' +
            '<div class="thong-ke">' +
            '    <div><strong>—</strong><span>GPA hiện tại</span></div>' +
            '    <div><strong>—</strong><span>Mục tiêu</span></div>' +
            '    <div><strong>—</strong><span>TC còn lại</span></div>' +
            '</div>' +
            '<p class="mo-ta-cho-du-doan">Điền thông tin và bấm <strong>"Dự đoán mục tiêu tốt nghiệp"</strong> để xem phân tích khả thi và gợi ý tổ hợp điểm chữ chi tiết.</p>';
    }
}

function luuMucTieuVaoBoNho() {
    try {
        var duLieu = {
            loai: lay("loai-tot-nghiep-muc-tieu") ? lay("loai-tot-nghiep-muc-tieu").value : "",
            gpaHienTai: lay("gpa-hien-tai") ? lay("gpa-hien-tai").value : "",
            gpaMucTieu: lay("gpa-muc-tieu") ? lay("gpa-muc-tieu").value : "",
            tongTcToanKhoa: lay("tong-tc-toan-khoa") ? lay("tong-tc-toan-khoa").value : "",
            tinChiHienTai: lay("tin-chi-hien-tai") ? lay("tin-chi-hien-tai").value : "",
            tinChiConLai: lay("tin-chi-con-lai") ? lay("tin-chi-con-lai").value : ""
        };
        ghiLuuTru(layKhoaLuuMucTieu(), JSON.stringify(duLieu));
    } catch (loi) { }
}

function taiMucTieuTuBoNho() {
    try {
        var chuoi = docLuuTru(layKhoaLuuMucTieu());
        if (!chuoi) return;
        var duLieu = JSON.parse(chuoi);
        if (!duLieu || typeof duLieu !== "object") return;
        if (lay("loai-tot-nghiep-muc-tieu") && typeof duLieu.loai === "string") {
            lay("loai-tot-nghiep-muc-tieu").value = duLieu.loai;
        }
        if (lay("gpa-hien-tai") && typeof duLieu.gpaHienTai === "string") {
            lay("gpa-hien-tai").value = duLieu.gpaHienTai;
        }
        if (lay("gpa-muc-tieu") && typeof duLieu.gpaMucTieu === "string") {
            lay("gpa-muc-tieu").value = duLieu.gpaMucTieu;
        }
        if (lay("tong-tc-toan-khoa") && typeof duLieu.tongTcToanKhoa === "string") {
            lay("tong-tc-toan-khoa").value = duLieu.tongTcToanKhoa;
        }
        if (lay("tin-chi-hien-tai") && typeof duLieu.tinChiHienTai === "string") {
            lay("tin-chi-hien-tai").value = duLieu.tinChiHienTai;
        }
        if (lay("tin-chi-con-lai") && typeof duLieu.tinChiConLai === "string") {
            lay("tin-chi-con-lai").value = duLieu.tinChiConLai;
        }
        dongBoHuyHieuHangMucTieu(lay("loai-tot-nghiep-muc-tieu") ? lay("loai-tot-nghiep-muc-tieu").value : "");
        capNhatThanhTienDoTinChi();
    } catch (loi) { }
}

function dongBoLoaiTotNghiepTuGpa() {
    var oLoai = lay("loai-tot-nghiep-muc-tieu");
    var oGpaMucTieu = lay("gpa-muc-tieu");
    if (!oLoai || !oGpaMucTieu) return;
    var diem = docSo(oGpaMucTieu.value);
    if (isNaN(diem)) {
        oLoai.value = "";
        dongBoHuyHieuHangMucTieu("");
        return;
    }
    var cacMuc = ["3.60", "3.20", "2.50", "2.00", "1.00", "0.00"];
    var khop = "";
    for (var i = 0; i < cacMuc.length; i++) {
        if (Math.abs(diem - Number(cacMuc[i])) < 0.001) {
            khop = cacMuc[i];
            break;
        }
    }
    oLoai.value = khop;
    dongBoHuyHieuHangMucTieu(khop);
}

function capNhatTinChiTuToanKhoa() {
    var oToanKhoa = lay("tong-tc-toan-khoa");
    var oHienTai = lay("tin-chi-hien-tai");
    var oConLai = lay("tin-chi-con-lai");
    if (!oToanKhoa || !oHienTai || !oConLai) return;

    var chuoiToanKhoa = oToanKhoa.value.trim();
    if (chuoiToanKhoa === "") return;

    var tcToanKhoa = docSo(chuoiToanKhoa);
    var tcHienTai = oHienTai.value.trim() === "" ? 0 : docSo(oHienTai.value);
    if (!isNaN(tcToanKhoa) && !isNaN(tcHienTai) && tcToanKhoa >= tcHienTai) {
        var conLai = Math.round((tcToanKhoa - tcHienTai) * 100) / 100;
        oConLai.value = String(conLai).replace(".", ",");
    }
    capNhatThanhTienDoTinChi();
}

function capNhatToanKhoaTuTinChiConLai() {
    var oToanKhoa = lay("tong-tc-toan-khoa");
    var oHienTai = lay("tin-chi-hien-tai");
    var oConLai = lay("tin-chi-con-lai");
    if (!oToanKhoa || !oHienTai || !oConLai) return;

    var chuoiConLai = oConLai.value.trim();
    if (chuoiConLai === "") return;

    var tcConLai = docSo(chuoiConLai);
    var tcHienTai = oHienTai.value.trim() === "" ? 0 : docSo(oHienTai.value);
    if (!isNaN(tcConLai) && !isNaN(tcHienTai) && tcConLai >= 0 && tcHienTai >= 0) {
        var tongTc = Math.round((tcHienTai + tcConLai) * 100) / 100;
        oToanKhoa.value = String(tongTc).replace(".", ",");
    }
    capNhatThanhTienDoTinChi();
}

function dongBoTichLuySangMucTieu(ketQuaTb) {
    if (!ketQuaTb && Array.isArray(danhSachMocTichLuy) && danhSachMocTichLuy.length > 0) {
        var mocHienThi = layMocHienThiTheoThang(danhSachMocTichLuy);
        ketQuaTb = tinhTrungBinhMocBieuDo(mocHienThi);
    }
    var oGpaHienTai = lay("gpa-hien-tai");
    var oTcHienTai = lay("tin-chi-hien-tai");

    if (oGpaHienTai) {
        if (ketQuaTb && ketQuaTb.soHocKy > 0) {
            oGpaHienTai.value = hienSo(ketQuaTb.gpaXepLoaiHe4);
        } else if (danhSachMocTichLuy.length === 0) {
            oGpaHienTai.value = "";
        }
    }

    if (oTcHienTai) {
        var tongTinChiTichLuy = 0;
        var coTc = false;
        var tatCaKy = docTatCaHocKyDaLuu();
        for (var i = 0; i < danhSachMocTichLuy.length; i++) {
            var item = danhSachMocTichLuy[i];
            var tc = item.tongTinChi || 0;
            if (tc <= 0 && tatCaKy[item.ten] && Array.isArray(tatCaKy[item.ten].mon)) {
                var kq = tinhGpaHopLeTuDanhSachMon(tatCaKy[item.ten].mon, tatCaKy[item.ten].he);
                if (kq && kq.tongTinChi > 0) {
                    tc = kq.tongTinChi;
                    item.tongTinChi = tc;
                }
            }
            if (tc > 0) {
                tongTinChiTichLuy += tc;
                coTc = true;
            }
        }

        if (coTc) {
            oTcHienTai.value = String(tongTinChiTichLuy).replace(".", ",");
            capNhatTinChiTuToanKhoa();
        } else if (danhSachMocTichLuy.length === 0) {
            oTcHienTai.value = "";
            capNhatTinChiTuToanKhoa();
        }
    }

    capNhatThanhTienDoTinChi();
    luuMucTieuVaoBoNho();
}

function goiYToHopDiemChu(diemCanDat) {
    if (diemCanDat > 4) return [];
    if (diemCanDat >= 3.995) {
        return ["100% điểm A / A+"];
    }
    if (diemCanDat <= 1.0) {
        return ["100% điểm D trở lên"];
    }
    var bacDiem = [
        { ten: "A", diem: 4.0 },
        { ten: "B+", diem: 3.5 },
        { ten: "B", diem: 3.0 },
        { ten: "C+", diem: 2.5 },
        { ten: "C", diem: 2.0 },
        { ten: "D+", diem: 1.5 },
        { ten: "D", diem: 1.0 }
    ];
    for (var i = 0; i < bacDiem.length - 1; i++) {
        var cao = bacDiem[i];
        var thap = bacDiem[i + 1];
        if (diemCanDat <= cao.diem && diemCanDat >= thap.diem) {
            var tyLeCao = Math.round(((diemCanDat - thap.diem) / (cao.diem - thap.diem)) * 100);
            tyLeCao = Math.ceil(tyLeCao / 5) * 5;
            if (tyLeCao > 100) tyLeCao = 100;
            if (tyLeCao < 0) tyLeCao = 0;
            var tyLeThap = 100 - tyLeCao;
            if (tyLeCao === 100) {
                return ["100% điểm " + cao.ten];
            }
            if (tyLeThap === 100) {
                return ["100% điểm " + thap.ten];
            }
            return [tyLeCao + "% điểm " + cao.ten, tyLeThap + "% điểm " + thap.ten];
        }
    }
    return ["100% điểm D"];
}

function tinhMucTieu() {
    var chuoiGpaHienTai = lay("gpa-hien-tai").value.trim();
    var chuoiTcHienTai = lay("tin-chi-hien-tai").value.trim();
    var tc = chuoiTcHienTai === "" ? 0 : docSo(chuoiTcHienTai);
    var gpa = (tc === 0 && chuoiGpaHienTai === "") ? 0 : docSo(chuoiGpaHienTai);
    var mucTieu = docSo(lay("gpa-muc-tieu").value);

    var chuoiConLai = lay("tin-chi-con-lai").value.trim();
    var chuoiToanKhoa = lay("tong-tc-toan-khoa") ? lay("tong-tc-toan-khoa").value.trim() : "";
    var conLai = NaN;

    if (chuoiConLai !== "") {
        conLai = docSo(chuoiConLai);
    } else if (chuoiToanKhoa !== "") {
        var tcToanKhoa = docSo(chuoiToanKhoa);
        if (!isNaN(tcToanKhoa) && !isNaN(tc) && tcToanKhoa >= tc) {
            conLai = Math.round((tcToanKhoa - tc) * 100) / 100;
            lay("tin-chi-con-lai").value = String(conLai).replace(".", ",");
        }
    }

    if (chuoiToanKhoa === "" && !isNaN(tc) && !isNaN(conLai) && lay("tong-tc-toan-khoa")) {
        lay("tong-tc-toan-khoa").value = String(Math.round((tc + conLai) * 100) / 100).replace(".", ",");
    }

    capNhatThanhTienDoTinChi();

    var ketQua = lay("ket-qua-muc-tieu");
    var loiMt = lay("loi-muc-tieu");
    if (loiMt) loiMt.innerText = "";

    if (!hopLe(gpa, 0, 4) || !hopLe(mucTieu, 0, 4) ||
        !hopLe(tc, 0, 10000) || !hopLe(conLai, 0, 10000)) {
        if (loiMt) loiMt.innerText = "Hãy nhập đủ GPA từ 0 đến 4 và số tín chỉ hợp lệ từ 0 đến 10.000.";
        return;
    }
    if (tc + conLai === 0) {
        if (loiMt) loiMt.innerText = "Chưa có tín chỉ để dự đoán mục tiêu tốt nghiệp.";
        return;
    }

    var loaiMucTieu = xepLoai(mucTieu);
    var nhanBangMucTieu = mucTieu >= 2.0 ? "bằng " + loaiMucTieu : "xếp loại " + loaiMucTieu;
    var tcHienThi = String(tc).replace(".", ",");
    var conLaiHienThi = String(conLai).replace(".", ",");

    if (conLai === 0) {
        var daDat = gpa >= mucTieu;
        ketQua.className = "ket-qua hop-ket-qua-du-doan " + (daDat ? "muc-xuat-sac" : "muc-kem");
        ketQua.innerHTML =
            '<h3>KẾT QUẢ DỰ ĐOÁN</h3>' +
            '<div class="vong-diem vong-diem-muc-tieu">' +
            '    <span class="icon-vong-diem" aria-hidden="true">' + (daDat ? '🏆' : '⚠️') + '</span>' +
            '    <strong>' + hienSo(gpa) + '</strong>' +
            '    <span>GPA TÍCH LŨY</span>' +
            '</div>' +
            '<p class="xep-loai">' + (daDat ? '✓ Đã đạt mục tiêu ' + nhanBangMucTieu : '✕ Chưa đạt mục tiêu ' + nhanBangMucTieu) + '</p>' +
            '<div class="thong-ke">' +
            '    <div><strong>' + hienSo(gpa) + '</strong><span>Hiện tại</span></div>' +
            '    <div><strong>' + hienSo(mucTieu) + '</strong><span>Mục tiêu</span></div>' +
            '    <div><strong>0</strong><span>TC còn lại</span></div>' +
            '</div>' +
            '<p class="mo-ta-xep-loai-du-doan">' +
            (daDat
                ? 'Không còn tín chỉ mới. GPA hiện tại (<strong>' + hienSo(gpa) + '</strong>) đã đạt mục tiêu <strong>' + nhanBangMucTieu + '</strong>.'
                : 'Không còn tín chỉ mới. GPA hiện tại (<strong>' + hienSo(gpa) + '</strong>) chưa đạt mục tiêu <strong>' + nhanBangMucTieu + '</strong>.') +
            '</p>' +
            '<p class="chan-ket-qua-du-doan">Đang tính trên toàn bộ ' + tcHienThi + ' TC đã tích lũy.</p>';
        return;
    }

    var canDat = (mucTieu * (tc + conLai) - gpa * tc) / conLai;
    var toiDa = (gpa * tc + 4 * conLai) / (tc + conLai);
    var canDatHienThi = canDat < 0 ? 0 : canDat;
    var xepLoaiConLai = xepLoai(canDatHienThi);
    var dsGoiYDiem = goiYToHopDiemChu(canDatHienThi);

    var classMuc = "muc-gioi";
    var iconMuc = "🎯";
    var nhanTrangThai = "";

    if (canDat > 4) {
        classMuc = "muc-kem";
        iconMuc = "⚠️";
        nhanTrangThai = "✕ Vượt mức tối đa 4,00";
    } else if (canDat <= 0) {
        classMuc = "muc-xuat-sac";
        iconMuc = "✓";
        nhanTrangThai = "✓ Chắc chắn đạt mục tiêu";
    } else if (canDat >= 3.6) {
        classMuc = "muc-yeu";
        iconMuc = "⚡";
        nhanTrangThai = "⚡ Thử thách lớn (Cần GPA ≥ 3,60)";
    } else if (canDat >= 3.2) {
        classMuc = "muc-trung-binh";
        iconMuc = "🎯";
        nhanTrangThai = "🎯 Cần nỗ lực cao (Cần GPA ≥ 3,20)";
    } else if (canDat >= 2.5) {
        classMuc = "muc-gioi";
        iconMuc = "💪";
        nhanTrangThai = "💪 Trong tầm tay (Cần GPA ≥ 2,50)";
    } else {
        classMuc = "muc-xuat-sac";
        iconMuc = "✨";
        nhanTrangThai = "✨ Rất an toàn (Cần GPA < 2,50)";
    }

    ketQua.className = "ket-qua hop-ket-qua-du-doan " + classMuc;

    var htmlHuyHieuDiem = "";
    if (canDat > 0 && canDat <= 4 && dsGoiYDiem.length > 0) {
        htmlHuyHieuDiem += '<div class="goi-y-to-hop-wrap">';
        htmlHuyHieuDiem += '<p class="tieu-de-to-hop-diem">Tương đương ít nhất:</p>';
        htmlHuyHieuDiem += '<div class="danh-sach-huy-hieu-diem">';
        for (var i = 0; i < dsGoiYDiem.length; i++) {
            htmlHuyHieuDiem += '<span class="huy-hieu-diem-du-doan">' + dsGoiYDiem[i] + '</span>';
        }
        htmlHuyHieuDiem += '</div></div>';
    }

    var moTaChiTiet = "";
    if (canDat > 4) {
        moTaChiTiet = 'Vượt mức tối đa <strong>4,00</strong>. Mục tiêu không khả thi nếu chỉ cộng thêm tín chỉ mới (GPA tối đa có thể đạt: <strong>' + hienSo(toiDa) + '</strong>).';
    } else if (canDat <= 0) {
        moTaChiTiet = 'GPA tích lũy hiện tại đã đủ đảm bảo mục tiêu nếu hoàn thành số tín chỉ còn lại (GPA tối đa có thể đạt: <strong>' + hienSo(toiDa) + '</strong>).';
    } else {
        moTaChiTiet = 'Để tốt nghiệp <strong>' + nhanBangMucTieu + '</strong> (GPA ≥ ' + hienSo(mucTieu) + '), với <strong>' + conLaiHienThi + ' tín chỉ</strong> còn lại bạn phải đạt GPA trung bình <strong>' + hienSo(canDatHienThi) + '</strong> (loại <strong>' + xepLoaiConLai + '</strong>).';
    }

    ketQua.innerHTML =
        '<h3>KẾT QUẢ DỰ ĐOÁN</h3>' +
        '<div class="vong-diem vong-diem-muc-tieu">' +
        '    <span class="icon-vong-diem" aria-hidden="true">' + iconMuc + '</span>' +
        '    <strong>' + hienSo(canDatHienThi) + '</strong>' +
        '    <span>' + (canDat > 4 ? 'VƯỢT NGƯỠNG' : '/ 4,00 CẦN ĐẠT') + '</span>' +
        '</div>' +
        '<p class="xep-loai">' + nhanTrangThai + '</p>' +
        '<div class="thong-ke">' +
        '    <div><strong>' + hienSo(gpa) + '</strong><span>Hiện tại</span></div>' +
        '    <div><strong>' + hienSo(mucTieu) + '</strong><span>Mục tiêu</span></div>' +
        '    <div><strong>' + conLaiHienThi + '</strong><span>TC còn lại</span></div>' +
        '</div>' +
        '<p class="mo-ta-xep-loai-du-doan">' + moTaChiTiet + '</p>' +
        htmlHuyHieuDiem +
        '<p class="chan-ket-qua-du-doan">Đang tính trên GPA tích lũy <strong>' + hienSo(gpa) + '</strong> của ' + tcHienThi + ' TC đã có điểm.</p>';
}


function capNhatXemTruocGopY() {
    var oHoTen = lay("ho-ten");
    var oTieuDe = lay("tieu-de");
    var oNoiDung = lay("noi-dung");
    var oBanGopY = lay("ban-gop-y");
    var oDemKyTu = lay("dem-ky-tu-gop-y");
    var oTrangThai = lay("trang-thai-gop-y");

    var hoTen = oHoTen ? oHoTen.value.trim() : "";
    var tieuDe = oTieuDe ? oTieuDe.value.trim() : "";
    var noiDung = oNoiDung ? oNoiDung.value : "";

    if (oDemKyTu && oNoiDung) {
        var soKyTu = noiDung.length;
        oDemKyTu.innerText = soKyTu + " / 2000 ký tự";
        if (soKyTu > 1800) {
            oDemKyTu.classList.add("canh-bao");
        } else {
            oDemKyTu.classList.remove("canh-bao");
        }
    }

    if (oTrangThai && (tieuDe !== "" || noiDung.trim() !== "")) {
        oTrangThai.innerText = "";
    }

    if (!oBanGopY) return;

    if (tieuDe === "" && noiDung.trim() === "") {
        oBanGopY.value = "";
        return;
    }

    var nguoiDung = docNguoiDungDangNhap();
    var tenNguoiGui = hoTen !== ""
        ? hoTen
        : (nguoiDung && nguoiDung.hoTen ? nguoiDung.hoTen : "Sinh viên (chưa để lại tên)");
    var emailNguoiGui = nguoiDung && nguoiDung.email ? " (" + nguoiDung.email + ")" : "";
    var thoiGianGui = new Date().toLocaleString("vi-VN");

    var noiDungThu =
        "GÓP Ý TỪ NGƯỜI DÙNG GPA UNI\n" +
        "----------------------------------------\n" +
        "Người gửi: " + tenNguoiGui + emailNguoiGui + "\n" +
        "Thời gian: " + thoiGianGui + "\n" +
        "Tiêu đề: " + (tieuDe !== "" ? tieuDe : "(Chưa có tiêu đề)") + "\n" +
        "----------------------------------------\n\n" +
        (noiDung.trim() !== "" ? noiDung : "(Đang nhập nội dung...)");

    oBanGopY.value = noiDungThu;
}

var DANH_SACH_GOI_Y_CHU_DE = [
    "Đề xuất thêm tính năng...",
    "Báo lỗi tính điểm môn...",
    "Góp ý giao diện...",
    "Hỏi về quy chế điểm..."
];

function chonChuDeGopY(chuDe, goiYTieuDe) {
    var oTieuDe = lay("tieu-de");
    var oNoiDung = lay("noi-dung");
    if (oTieuDe) {
        var hienTai = oTieuDe.value.trim();
        var tienTo = "[" + chuDe + "] ";
        var phanNoiDungSau = hienTai.replace(/^\[[^\]]+\]\s*/, "").trim();
        var laGoiYMacDinh = phanNoiDungSau === "" || DANH_SACH_GOI_Y_CHU_DE.indexOf(phanNoiDungSau) !== -1;

        if (laGoiYMacDinh) {
            oTieuDe.value = tienTo + (goiYTieuDe || "");
        } else {
            oTieuDe.value = tienTo + phanNoiDungSau;
        }
    }

    var buttons = document.querySelectorAll(".nut-chu-de-gop-y");
    for (var i = 0; i < buttons.length; i++) {
        if (buttons[i].innerText.indexOf(chuDe) !== -1) {
            buttons[i].classList.add("dang-chon");
            buttons[i].setAttribute("aria-pressed", "true");
        } else {
            buttons[i].classList.remove("dang-chon");
            buttons[i].setAttribute("aria-pressed", "false");
        }
    }

    if (oNoiDung && oNoiDung.value.trim() === "") {
        oNoiDung.focus();
    }
    capNhatXemTruocGopY();
}

function duLieuMauGopY() {
    if (lay("ho-ten")) lay("ho-ten").value = "Nguyễn Lê Đức Anh";
    if (lay("tieu-de")) lay("tieu-de").value = "[Đề xuất tính năng] Bổ sung tính năng xuất kết quả GPA học kỳ ra file PDF";
    if (lay("noi-dung")) {
        lay("noi-dung").value =
            "Chào ban quản trị GPA Uni,\n\n" +
            "Mình là sinh viên rất thích giao diện Bento mới của website. Nếu có thể bổ sung thêm nút tải xuống bảng điểm học kỳ dưới dạng file PDF hoặc ảnh chụp đẹp mắt để chia sẻ hoặc lưu trữ thì rất tuyệt vời!\n\n" +
            "Cảm ơn bạn đã phát triển công cụ hữu ích!";
    }

    var buttons = document.querySelectorAll(".nut-chu-de-gop-y");
    for (var i = 0; i < buttons.length; i++) {
        if (buttons[i].innerText.indexOf("Đề xuất tính năng") !== -1) {
            buttons[i].classList.add("dang-chon");
            buttons[i].setAttribute("aria-pressed", "true");
        } else {
            buttons[i].classList.remove("dang-chon");
            buttons[i].setAttribute("aria-pressed", "false");
        }
    }

    capNhatXemTruocGopY();
    if (lay("trang-thai-gop-y")) {
        lay("trang-thai-gop-y").innerText = "Đã nạp mẫu góp ý minh họa. Bạn có thể bấm gửi hoặc tùy chỉnh thêm.";
    }
}

function lamMoiGopY() {
    if (!confirm("Xóa toàn bộ nội dung đang nhập trong form góp ý?")) return;
    if (lay("ho-ten")) lay("ho-ten").value = "";
    if (lay("tieu-de")) lay("tieu-de").value = "";
    if (lay("noi-dung")) lay("noi-dung").value = "";
    if (lay("ban-gop-y")) lay("ban-gop-y").value = "";
    if (lay("dem-ky-tu-gop-y")) lay("dem-ky-tu-gop-y").innerText = "0 / 2000 ký tự";

    var buttons = document.querySelectorAll(".nut-chu-de-gop-y");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("dang-chon");
        buttons[i].setAttribute("aria-pressed", "false");
    }

    if (lay("trang-thai-gop-y")) {
        lay("trang-thai-gop-y").innerText = "";
    }
}

function chuanBiNoiDungGopY() {
    var tieuDe = lay("tieu-de").value.trim();
    var noiDung = lay("noi-dung").value.trim();
    if (tieuDe === "" || noiDung === "") {
        lay("trang-thai-gop-y").innerText = "Vui lòng nhập đầy đủ tiêu đề và nội dung góp ý (không chỉ chứa khoảng trắng).";
        return null;
    }

    var nguoiDung = docNguoiDungDangNhap();
    var hoTenNhap = lay("ho-ten") ? lay("ho-ten").value.trim() : "";
    var tenNguoiGui = hoTenNhap !== ""
        ? hoTenNhap
        : (nguoiDung && nguoiDung.hoTen ? nguoiDung.hoTen : "Sinh viên (chưa để lại tên)");
    var emailNguoiGui = nguoiDung && nguoiDung.email ? " (" + nguoiDung.email + ")" : "";
    var thoiGianGui = new Date().toLocaleString("vi-VN");

    var noiDungThu =
        "GÓP Ý TỪ NGƯỜI DÙNG GPA UNI\n" +
        "----------------------------------------\n" +
        "Người gửi: " + tenNguoiGui + emailNguoiGui + "\n" +
        "Thời gian: " + thoiGianGui + "\n" +
        "Tiêu đề: " + tieuDe + "\n" +
        "----------------------------------------\n\n" +
        noiDung;

    if (lay("ban-gop-y")) {
        lay("ban-gop-y").value = noiDungThu;
    }

    return {
        tieuDe: tieuDe,
        noiDungThu: noiDungThu,
        tieuDeMaHoa: encodeURIComponent("[GPA Uni - Góp ý] " + tieuDe),
        noiDungMaHoa: encodeURIComponent(noiDungThu)
    };
}

function taoGopY() {
    var duLieu = chuanBiNoiDungGopY();
    if (!duLieu) return;

    window.location.href = "mailto:" + EMAIL_QUAN_TRI + "?subject=" + duLieu.tieuDeMaHoa + "&body=" + duLieu.noiDungMaHoa;
    lay("trang-thai-gop-y").innerText = "Đã mở ứng dụng Email mặc định để gửi góp ý tới " + EMAIL_QUAN_TRI + ".";
}

function guiQuaGmailWeb() {
    var duLieu = chuanBiNoiDungGopY();
    if (!duLieu) return;

    var urlGmail = "https://mail.google.com/mail/?view=cm&fs=1&to=" +
        encodeURIComponent(EMAIL_QUAN_TRI) +
        "&su=" + duLieu.tieuDeMaHoa +
        "&body=" + duLieu.noiDungMaHoa;

    window.open(urlGmail, "_blank", "noopener,noreferrer");
    lay("trang-thai-gop-y").innerText = "Đã mở tab Gmail trên Web để gửi góp ý trực tiếp tới " + EMAIL_QUAN_TRI + ".";
}

function saoChepGopY() {
    var duLieu = chuanBiNoiDungGopY();
    if (!duLieu) return;

    var oVanBan = lay("ban-gop-y");
    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
        navigator.clipboard.writeText(duLieu.noiDungThu).then(function () {
            lay("trang-thai-gop-y").innerText = "Đã sao chép nội dung góp ý. Bạn có thể dán gửi tới " + EMAIL_QUAN_TRI + ".";
        }).catch(function () {
            if (oVanBan) {
                oVanBan.focus();
                oVanBan.select();
            }
            lay("trang-thai-gop-y").innerText = "Đã tạo nội dung ở ô bên trên. Hãy nhấn Ctrl+C để sao chép.";
        });
    } else {
        if (oVanBan) {
            oVanBan.focus();
            oVanBan.select();
            try {
                document.execCommand("copy");
                lay("trang-thai-gop-y").innerText = "Đã sao chép nội dung góp ý. Bạn có thể dán gửi tới " + EMAIL_QUAN_TRI + ".";
                return;
            } catch (loi) { }
        }
        lay("trang-thai-gop-y").innerText = "Đã tạo nội dung ở ô bên trên. Hãy chọn văn bản và sao chép.";
    }
}

function dongMenuDiDong() {
    if (lay("thanh-ben")) {
        lay("thanh-ben").className = "thanh-ben";
    }
    if (lay("lop-phu-menu")) {
        lay("lop-phu-menu").className = "lop-phu-menu";
    }
    document.body.classList.remove("khoa-cuon-trang");
    if (lay("nut-menu")) {
        lay("nut-menu").setAttribute("aria-expanded", "false");
    }
}

function capNhatWidgetTrangChu() {
    var widget = lay("widget-kpi-trang-chu");
    if (!widget) return;

    var coDiem = typeof coMocDiemSo === "function" && coMocDiemSo();
    if (!coDiem || !Array.isArray(danhSachMocTichLuy) || danhSachMocTichLuy.length === 0) {
        widget.innerHTML =
            '<div class="dau-widget-kpi">' +
                '<div class="kicker-widget-kpi">' +
                    '<span class="cham-sang-vang" aria-hidden="true"></span>' +
                    '<span>CHÀO MỪNG BẠN!</span>' +
                '</div>' +
                '<span class="tag-trang-thai-widget">Bắt đầu mới</span>' +
            '</div>' +
            '<div class="than-widget-kpi chua-co-diem">' +
                '<div class="icon-chao-widget" aria-hidden="true">🎓</div>' +
                '<h3 class="tieu-de-chao-widget">Sẵn sàng bứt phá học kỳ này?</h3>' +
                '<p class="mo-ta-chao-widget">Bạn chưa lưu dữ liệu học kỳ nào. Hãy bắt đầu nhập môn học hoặc trải nghiệm thử bộ dữ liệu mẫu có sẵn.</p>' +
            '</div>' +
            '<div class="chan-widget-kpi hang-doi">' +
                '<button type="button" class="nut-thu-mau-widget" onclick="kichHoatDuLieuMauTrangChu()">' +
                    '✦ Thử dữ liệu mẫu' +
                '</button>' +
                '<a class="nut-nhap-mon-widget" href="#tinh-gpa" onclick="moTrang(\'tinh-gpa\'); return false;">' +
                    'Nhập điểm ngay →' +
                '</a>' +
            '</div>';
        return;
    }

    var mocHienThi = layMocHienThiTheoThang(danhSachMocTichLuy);
    var ketQuaTb = tinhTrungBinhMocBieuDo(mocHienThi);
    if (!ketQuaTb || ketQuaTb.soHocKy === 0) {
        return;
    }

    var tongTinChiTichLuy = 0;
    var tatCaKy = (typeof docTatCaHocKyDaLuu === "function") ? docTatCaHocKyDaLuu() : {};
    for (var i = 0; i < danhSachMocTichLuy.length; i++) {
        var item = danhSachMocTichLuy[i];
        var tc = item.tongTinChi || 0;
        if (tc <= 0 && tatCaKy[item.ten] && Array.isArray(tatCaKy[item.ten].mon)) {
            var kq = tinhGpaHopLeTuDanhSachMon(tatCaKy[item.ten].mon, tatCaKy[item.ten].he);
            if (kq && kq.tongTinChi > 0) {
                tc = kq.tongTinChi;
                item.tongTinChi = tc;
            }
        }
        if (tc > 0) {
            tongTinChiTichLuy += tc;
        }
    }

    var rank = xepLoai(ketQuaTb.gpaXepLoaiHe4, "4");
    var medal = "🏆";
    var classLoai = "xuat-sac";
    if (rank === "Giỏi") {
        medal = "🥇";
        classLoai = "gioi";
    } else if (rank === "Khá") {
        medal = "🥈";
        classLoai = "kha";
    } else if (rank === "Trung bình") {
        medal = "🥉";
        classLoai = "trung-binh";
    } else if (rank === "Yếu" || rank === "Kém") {
        medal = "⚠️";
        classLoai = "yeu";
    }

    widget.innerHTML =
        '<div class="dau-widget-kpi">' +
            '<div class="kicker-widget-kpi">' +
                '<span class="cham-sang-xanh" aria-hidden="true"></span>' +
                '<span>TIẾN TRÌNH GPA TÍCH LŨY</span>' +
            '</div>' +
            '<span class="tag-trang-thai-widget">' + (dangDungMocMau ? "Mẫu tham khảo" : "Đã đồng bộ") + '</span>' +
        '</div>' +
        '<div class="than-widget-kpi">' +
            '<div class="cum-diem-widget">' +
                '<span class="so-diem-widget-lon">' + hienSo(ketQuaTb.gpaXepLoaiHe4) + '</span>' +
                '<span class="mau-so-widget">/ 4,00</span>' +
            '</div>' +
            '<div class="huy-hieu-xep-loai-widget ' + classLoai + '">' +
                medal + ' Xếp loại ' + rank +
            '</div>' +
            '<div class="chi-tiet-widget-grid">' +
                '<div class="o-chi-tiet-widget">' +
                    '<span class="nhan-chi-tiet-widget">Số học kỳ</span>' +
                    '<strong class="gia-tri-chi-tiet-widget">' + ketQuaTb.soHocKy + ' HK</strong>' +
                '</div>' +
                '<div class="o-chi-tiet-widget">' +
                    '<span class="nhan-chi-tiet-widget">Tín chỉ tích lũy</span>' +
                    '<strong class="gia-tri-chi-tiet-widget">' + (tongTinChiTichLuy > 0 ? tongTinChiTichLuy : "--") + ' TC</strong>' +
                '</div>' +
            '</div>' +
        '</div>' +
        '<div class="chan-widget-kpi">' +
            '<a class="nut-xem-bieu-do-widget" href="#tinh-gpa" onclick="moTrang(\'tinh-gpa\'); return false;">' +
                '<span>Xem chi tiết biểu đồ tiến trình</span>' +
                '<b aria-hidden="true">→</b>' +
            '</a>' +
        '</div>';
}

function moTrang(maTrang) {
    if (maTrang === "tich-luy") maTrang = "tinh-gpa";
    if (!lay(maTrang)) return;
    var trang = document.getElementsByClassName("trang");
    for (var i = 0; i < trang.length; i++) trang[i].style.display = "none";
    lay(maTrang).style.display = "block";
    var bieuDo = lay("khung-bieu-do-tich-luy");
    if (bieuDo) {
        bieuDo.style.display = maTrang === "tinh-gpa" ? "block" : "none";
    }
    if (maTrang === "trang-chu") {
        capNhatWidgetTrangChu();
    } else if (maTrang === "tinh-gpa") {
        lay("dau-trang-tinh").style.display = "flex";
        lay("tieu-de-bang").innerText = "Danh sách môn học";
        veBieuDoTichLuy(danhSachMocTichLuy);
    } else {
        lay("dau-trang-tinh").style.display = "flex";
    }
    var menu = lay("menu").getElementsByTagName("a");
    for (var j = 0; j < menu.length; j++) {
        menu[j].className = "";
        menu[j].removeAttribute("aria-current");
    }
    if (lay("menu-" + maTrang)) {
        lay("menu-" + maTrang).className = "dang-chon";
        lay("menu-" + maTrang).setAttribute("aria-current", "page");
    }
    var tenTrang = {
        "trang-chu": "Trang chủ",
        "tinh-gpa": "Tính GPA",
        "muc-tieu": "Mục tiêu GPA",
        "thang-diem": "Quy chế & Thang điểm",
        "huong-dan": "Hướng dẫn",
        "gop-y": "Liên hệ / Góp ý"
    };
    if (tenTrang[maTrang]) {
        lay("ten-trang").innerText = tenTrang[maTrang];
        document.title = tenTrang[maTrang] + " — GPA Uni";
    }
    dongMenuDiDong();
    if (maTrang === "muc-tieu") {
        dongBoTichLuySangMucTieu();
    } else if (maTrang === "gop-y") {
        var nguoiDungGopY = docNguoiDungDangNhap();
        if (nguoiDungGopY && nguoiDungGopY.hoTen && lay("ho-ten") && lay("ho-ten").value.trim() === "") {
            lay("ho-ten").value = nguoiDungGopY.hoTen;
        }
        capNhatXemTruocGopY();
    }
    lay("noi-dung-chinh").focus();
    window.scrollTo(0, 0);
}

function batTatMenu() {
    var thanhBen = lay("thanh-ben");
    if (!thanhBen) return;
    var dangMo = thanhBen.className.indexOf("menu-mo") !== -1;
    if (dangMo) {
        dongMenuDiDong();
    } else {
        thanhBen.className = "thanh-ben menu-mo";
        if (lay("lop-phu-menu")) {
            lay("lop-phu-menu").className = "lop-phu-menu hien-lop-phu";
        }
        document.body.classList.add("khoa-cuon-trang");
        if (lay("nut-menu")) {
            lay("nut-menu").setAttribute("aria-expanded", "true");
        }
    }
}


function tuDongTaiHocKyCuaTaiKhoan() {
    if (!lay("danh-sach-mon")) return;
    taiBieuDoTichLuyTuBoNho();
    taiMucTieuTuBoNho();
    try {
        var tatCaKy = docTatCaHocKyDaLuu();
        for (var k = 0; k < THU_TU_HOC_KY.length; k++) {
            var tenKy = THU_TU_HOC_KY[k];
            if (danhSachKyDaXoaKhoiBieuDo.indexOf(tenKy) !== -1) {
                continue;
            }
            if (tatCaKy[tenKy] && Array.isArray(tatCaKy[tenKy].mon)) {
                var ketQuaKy = tinhGpaHopLeTuDanhSachMon(tatCaKy[tenKy].mon, tatCaKy[tenKy].he);
                if (ketQuaKy) {
                    dongBoHocKySangTichLuy(tenKy, ketQuaKy);
                }
            }
        }

        var khoaHienTai = layKhoaLuu();
        var banLuu = docLuuTru(khoaHienTai);
        if (!banLuu) return;

        var duLieu = JSON.parse(banLuu);
        if (!duLieu || typeof duLieu.tenKy !== "string" ||
            (duLieu.he !== "4" && duLieu.he !== "10" && duLieu.he !== "chu") ||
            !Array.isArray(duLieu.mon) || duLieu.mon.length === 0) return;

        lay("danh-sach-mon").innerHTML = "";
        var tenChuanHoa = chuanHoaTenHocKy(duLieu.tenKy);
        if (THU_TU_HOC_KY.indexOf(tenChuanHoa) !== -1) {
            lay("ten-ky").value = tenChuanHoa;
        }
        var heKhoiPhuc = duLieu.he === "10" ? "10" : "4";
        lay("he-diem").value = heKhoiPhuc;
        heDiemCu = heKhoiPhuc;
        for (var j = 0; j < duLieu.mon.length; j++) {
            themMon(duLieu.mon[j], true);
        }
        capNhatSoThuTuVaHeChuBangMon();
        var ketQuaKhoiPhuc = tinhGpaHopLeTuDanhSachMon(duLieu.mon, heKhoiPhuc);
        if (ketQuaKhoiPhuc && ketQuaKhoiPhuc.soMon > 0) {
            hienThiKetQuaHocKy(ketQuaKhoiPhuc, heKhoiPhuc);
        } else {
            xoaKetQua();
        }
        if (lay("trang-thai-luu")) {
            lay("trang-thai-luu").innerText = "Đã khôi phục học kỳ \"" + lay("ten-ky").value + "\" đã lưu của bạn.";
        }
        dongBoTichLuySangMucTieu();
        capNhatHuyHieuDanhSachHocKy();
    } catch (loi) { }
}

document.addEventListener("keydown", function (suKien) {
    if (suKien.key === "Escape") {
        dongMenuDiDong();
        boChonMocBieuDo();
        dongCustomSelectHocKy();
    }
});

document.addEventListener("click", function (suKien) {
    var mucTieu = suKien.target;
    if (mucTieu && typeof mucTieu.closest === "function") {
        if (!mucTieu.closest("#khung-tuy-bien-ky")) {
            dongCustomSelectHocKy();
        }
        if (tenMocDangChon) {
            if (!mucTieu.closest("#hop-xoa-moc-bieu-do") && !mucTieu.closest(".nhom-nut-moc-gpa")) {
                boChonMocBieuDo();
            }
        }
    } else {
        dongCustomSelectHocKy();
        if (tenMocDangChon) boChonMocBieuDo();
    }
});

window.addEventListener("resize", function () {
    if (window.innerWidth > 760) {
        dongMenuDiDong();
    }
    if (lay("khung-bieu-do-tich-luy") && lay("khung-bieu-do-tich-luy").style.display !== "none") {
        veBieuDoTichLuy(danhSachMocTichLuy);
    }
});

if (lay("danh-sach-mon")) {
    khoiTaoGiaoDienToi();
    themMon(null, true);
    themMon(null, true);
    tuDongTaiHocKyCuaTaiKhoan();
    khoiTaoCustomSelectHocKy();
    veBieuDoTichLuy(danhSachMocTichLuy);
    capNhatWidgetTrangChu();
    var hashBanDau = window.location.hash ? window.location.hash.substring(1) : "";
    if (hashBanDau && (lay(hashBanDau) || hashBanDau === "tinh-gpa")) {
        moTrang(hashBanDau);
    } else {
        moTrang("trang-chu");
    }
}

window.addEventListener("hashchange", function () {
    var h = window.location.hash ? window.location.hash.substring(1) : "";
    if (h && (lay(h) || h === "tinh-gpa")) {
        moTrang(h);
    }
});