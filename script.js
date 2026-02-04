const searchInput = document.getElementById("search");
const suggestionBox = document.getElementById("suggestions");
const selectedBox = document.getElementById("selected");
const btnPreview = document.getElementById("btnPreview");
const printArea = document.getElementById("printArea");
const printSelected = document.getElementById("printSelected");

let selectedItems = [];

// Logika Pencarian
searchInput.addEventListener("input", function () {
  const keyword = this.value.toLowerCase();
  suggestionBox.innerHTML = "";

  if (keyword === "") return;

  const filtered = motifList.filter(item =>
    item.nama.toLowerCase().includes(keyword) &&
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

// Logika Preview Cetak
btnPreview.onclick = () => {
  if (selectedItems.length === 0) {
    alert("Pilih minimal 1 motif dulu");
    return;
  }

  printSelected.innerHTML = "";
  selectedItems.forEach(item => {
    const div = document.createElement("div");
    div.className = "print-item";
    div.innerHTML = `
      <img src="${item.foto}" onerror="this.src='https://via.placeholder.com/150?text=No+Image'">
      <div>${item.nama}</div>
    `;
    printSelected.appendChild(div);
  });

  printArea.classList.remove("hidden");
  printArea.scrollIntoView({ behavior: "smooth" });
};
