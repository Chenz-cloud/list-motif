const searchInput = document.getElementById("search");
const suggestionBox = document.getElementById("suggestions");
const selectedBox = document.getElementById("selected");
const btnPreview = document.getElementById("btnPreview");
const printArea = document.getElementById("printArea");
const printSelected = document.getElementById("printSelected");

let selectedItems = [];
// Logika Pencarian (Hanya menampilkan yang berawalan dari keyword)
searchInput.addEventListener("input", function () {
  const keyword = this.value.toLowerCase();
  suggestionBox.innerHTML = "";

  if (keyword === "") return;

  const filtered = motifList.filter(item =>
    // .startsWith memastikan pencarian dimulai dari huruf paling depan
    item.nama.toLowerCase().startsWith(keyword) &&
    !selectedItems.some(x => x.nama === item.nama)
  );

  filtered.forEach(item => {
    const div = document.createElement("div");
    div.textContent = item.nama;
    div.className = "suggest-item";
    div.onclick = function () {
      selectedItems.push(item);
      renderSelected();
      searchInput.value = "";
      suggestionBox.innerHTML = "";
    };
    suggestionBox.appendChild(div);
  });
});


// Menampilkan Pilihan (Chips)
function renderSelected() {
  selectedBox.innerHTML = "";
  selectedItems.forEach((item, index) => {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.innerHTML = `${item.nama} <button onclick="removeMotif(${index})">×</button>`;
    selectedBox.appendChild(chip);
  });
}

// Menghapus Pilihan
function removeMotif(index) {
  selectedItems.splice(index, 1);
  renderSelected();
}

// Logika Preview Cetak di Halaman Baru
btnPreview.onclick = () => {
  if (selectedItems.length === 0) {
    alert("Pilih minimal 1 motif dulu");
    return;
  }

  // 1. Buat konten HTML untuk halaman baru
  let printContent = `
    <html>
    <head>
      <title>Preview Cetak Motif</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; text-align: center; }
        h2 { margin-bottom: 20px; }
        .print-grid { 
          display: grid; 
          grid-template-columns: repeat(3, 1fr); 
          gap: 15px; 
        }
        .print-item { 
          border: 1px solid #ddd; 
          padding: 10px; 
          text-align: center; 
        }
        .print-item img { 
          width: 100%; 
          border-radius: 4px; 
          display: block; 
          margin-bottom: 8px; 
        }
        .no-print {
          margin-top: 30px;
          padding: 12px 25px;
          background: #4CAF50;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 16px;
        }
        @media print {
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>
      <h2>Daftar Motif Dipilih</h2>
      <div class="print-grid">
  `;

  // 2. Masukkan item yang dipilih ke dalam HTML
  selectedItems.forEach(item => {
    printContent += `
      <div class="print-item">
        <img src="${item.foto}" onerror="this.src='https://via.placeholder.com/150?text=No+Image'">
        <div><strong>${item.nama}</strong></div>
      </div>
    `;
  });

  printContent += `
      </div>
      <button class="no-print" onclick="window.print()">Cetak / Simpan PDF</button>
    </body>
    </html>
  `;

  // 3. Buka jendela baru dan tulis kontennya
  const winPrint = window.open('', '', 'width=900,height=700');
  winPrint.document.write(printContent);
  winPrint.document.close();
  winPrint.focus();
};
