const searchInput = document.getElementById("search");
const suggestionBox = document.getElementById("suggestions");
const selectedBox = document.getElementById("selected");

let selectedItems = [];

// AUTOCOMPLETE
searchInput.addEventListener("input", function () {
  const keyword = this.value.toLowerCase();
  suggestionBox.innerHTML = "";

  if (keyword === "") return;

  motifList
    .filter(item =>
      item.toLowerCase().includes(keyword) &&
      !selectedItems.includes(item)
    )
    .forEach(item => {
      const div = document.createElement("div");
      div.textContent = item;

      div.onclick = function (e) {
        e.stopPropagation();
        selectedItems.push(item);
        renderSelected();

        searchInput.value = "";
        suggestionBox.innerHTML = "";
      };

      suggestionBox.appendChild(div);
    });
});

// RENDER CHIP
function renderSelected() {
  selectedBox.innerHTML = "";

  selectedItems.forEach((item, index) => {
    const wrapper = document.createElement("div");
    wrapper.className = "selected-item";

    const tag = document.createElement("span");
    tag.className = "chip";
    tag.textContent = item;

    const btn = document.createElement("button");
    btn.textContent = "×";
    btn.onclick = function () {
      selectedItems.splice(index, 1);
      renderSelected();
    };

    const img = document.createElement("img");
    const fileName = motifToFileName(item);

    img.src = `photos/${photoSize}/${fileName}.jpg`;
    img.alt = item;
    img.className = "preview-img";

    wrapper.appendChild(tag);
    wrapper.appendChild(btn);
    wrapper.appendChild(img);

    selectedBox.appendChild(wrapper);
  });
}

  pdfPreview.classList.remove("hidden");
};

// tap di luar kertas untuk tutup
pdfPreview.onclick = function (e) {
  if (e.target === pdfPreview) {
    pdfPreview.classList.add("hidden");
  }
};
btnPreview.onclick = function () {
  console.log("TOMBOL DIKLIK");
  pdfPreview.classList.remove("hidden");
};
const { jsPDF } = window.jspdf;
const btnDownload = document.getElementById("btnDownload");

btnDownload.onclick = function () {
  const pdf = new jsPDF();

  let y = 20;
  pdf.text("Daftar Motif", 20, y);
  y += 10;

  selectedItems.forEach((item, i) => {
    pdf.text(`${i + 1}. ${item}`, 20, y);
    y += 8;
  });

  pdf.save("daftar-motif.pdf");
};
function motifToFileName(motif) {
  return motif
    .toLowerCase()
    .replace(/ /g, "-");
}
let photoSize = "25x25"; 
