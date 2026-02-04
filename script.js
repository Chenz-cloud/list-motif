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
    const tag = document.createElement("span");
    tag.className = "chip";

    const text = document.createElement("span");
    text.textContent = item;

    const btn = document.createElement("button");
    btn.textContent = "×";

    btn.onclick = function (e) {
      e.stopPropagation();
      selectedItems.splice(index, 1);
      renderSelected();
    };

    tag.appendChild(text);
    tag.appendChild(btn);
    selectedBox.appendChild(tag);
  });
}

// TUTUP AUTOCOMPLETE SAAT TAP LUAR
function closeSuggestions(e) {
  if (
    !searchInput.contains(e.target) &&
    !suggestionBox.contains(e.target)
  ) {
    suggestionBox.innerHTML = "";
  }
}

document.addEventListener("touchstart", closeSuggestions);
document.addEventListener("click", closeSuggestions);
