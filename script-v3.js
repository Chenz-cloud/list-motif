const searchInput = document.getElementById("search");
const suggestionBox = document.getElementById("suggestions");
const selectedBox = document.getElementById("selected");
const btnPreview = document.getElementById("btnPreview");
const pdfPreview = document.getElementById("pdfPreview");
const btnDownload = document.getElementById("btnDownload");
const pdfList = document.getElementById("pdf-list");

let selectedItems = [];

/* =====================
   AUTOCOMPLETE
===================== */
searchInput.addEventListener("input", function () {
  const keyword = this.value.toLowerCase();
  suggestionBox.innerHTML = "";

  if (!keyword) return;

  motifList
    .filter(item =>
      item.nama.toLowerCase().includes(keyword) &&
      !selectedItems.some(x => x.nama === item.nama)
    )
    .forEach(item => {
      const div = document.createElement("div");
      div.textContent = item.nama;

      div.onclick = function () {
        selectedItems.push(item);
        renderSelected();
        searchInput.value = "";
        suggestionBox.innerHTML = "";
      };

      suggestionBox.appendChild(div);
    });
});

/* =====================
   PILIHAN + FOTO
===================== */
function renderSelected() {
  selectedBox.innerHTML = "";

  selectedItems.forEach((item, index) => {
    const wrap = document.createElement("div");
    wrap.className = "selected-item";

    const name = document.createElement("div");
    name.textContent = item.nama;

    const img = document.createElement("img");
    img.src = item.foto;
    img.className = "preview-img";

    const btn = document.createElement("button");
    btn.textContent = "×";
    btn.onclick = () => {
      selectedItems.splice(index, 1);
      renderSelected();
    };

    wrap.appendChild(name);
    wrap.appendChild(img);
    wrap.appendChild(btn);
    selectedBox.appendChild(wrap);
  });
}

/* =====================
   PREVIEW PDF
===================== */
btnPreview.onclick = function () {
  renderPdfPreview();
  pdfPreview.classList.remove("hidden");
};

pdfPreview.onclick = function (e) {
  if (e.target === pdfPreview) {
    pdfPreview.classList.add("hidden");
  }
};

function renderPdfPreview() {
  pdfList.innerHTML = "";

  selectedItems.forEach(item => {
    const wrap = document.createElement("div");
    wrap.className = "pdf-item";

    const name = document.createElement("div");
    name.textContent = item.nama;

    const img = document.createElement("img");
    img.src = item.foto;
    img.className = "pdf-img";

    wrap.appendChild(name);
    wrap.appendChild(img);
    pdfList.appendChild(wrap);
  });
}

/* =====================
   DOWNLOAD PDF
===================== */
const { jsPDF } = window.jspdf;

btnDownload.onclick = async function () {
  const pdf = new jsPDF();
  let y = 20;

  pdf.setFontSize(14);
  pdf.text("Daftar Motif", 20, y);
  y += 10;

  for (let i = 0; i < selectedItems.length; i++) {
    const item = selectedItems[i];

    pdf.setFontSize(11);
    pdf.text(`${i + 1}. ${item.nama}`, 20, y);
    y += 5;

    const imgBase64 = await loadImageToBase64(item.foto);
    pdf.addImage(imgBase64, "JPEG", 20, y, 40, 60);
    y += 70;

    if (y > 260) {
      pdf.addPage();
      y = 20;
    }
  }

  pdf.save("daftar-motif.pdf");
};

/* =====================
   HELPER
===================== */
function loadImageToBase64(url) {
  return new Promise(resolve => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      canvas.getContext("2d").drawImage(img, 0, 0);
      resolve(canvas.toDataURL("image/jpeg"));
    };
    img.src = url;
  });
}
