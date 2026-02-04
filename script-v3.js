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
      item.nama.toLowerCase().includes(keyword) &&
      !selectedItems.includes(item)
    )
    .forEach(item => {
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

// RENDER PILIHAN
function renderSelected() {
  selectedBox.innerHTML = "";

  selectedItems.forEach((item, index) => {
    const wrapper = document.createElement("div");
    wrapper.className = "selected-item";

    const name = document.createElement("div");
    name.textContent = item.nama;

    const img = document.createElement("img");
    img.src = item.foto;

    const btn = document.createElement("button");
    btn.textContent = "×";
    btn.onclick = () => {
      selectedItems.splice(index, 1);
      renderSelected();
    };

    wrapper.appendChild(name);
    wrapper.appendChild(img);
    wrapper.appendChild(btn);
    selectedBox.appendChild(wrapper);
  });
}
