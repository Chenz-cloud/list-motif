const listMotif = document.getElementById("listMotif");
const btnDownload = document.getElementById("btnDownload");
const btnPreview = document.getElementById("btnPreview");

/* =====================
   TAMPILKAN MOTIF
===================== */
motifList.forEach(item => {
  const div = document.createElement("div");
  div.className = "item";

  div.innerHTML = `
    <p>${item.nama}</p>
    <img src="${item.foto}" alt="${item.nama}">
  `;

  listMotif.appendChild(div);
});

/* =====================
   DOWNLOAD PDF
===================== */
btnDownload.onclick = () => {
  const element = document.getElementById("content");

  html2pdf()
    .set({
      margin: 10,
      filename: "daftar-motif.pdf",
      image: { type: "jpeg", quality: 0.95 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
    })
    .from(element)
    .save();
};

/* =====================
   PREVIEW PDF
===================== */
btnPreview.onclick = () => {
  alert("Preview PDF di HP menggunakan tampilan ini.\nTekan Download untuk simpan PDF.");
};
