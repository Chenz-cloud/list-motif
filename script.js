const searchInput = document.getElementById("search");
const suggestionBox = document.getElementById("suggestions");
const selectedBox = document.getElementById("selected");

let selectedItems = [];

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


function renderSelected() {
  const previewList = document.getElementById("preview-list");

  selectedBox.innerHTML = ""
  selectedItems.forEach((item, index) => {
  const tag = document.createElement("span");
  tag.className = "chip";

  const text = document.createElement("span");
  text.textContent = item;

  const btn = document.createElement("button");
  btn.textContent = "×";

  btn.onclick = function () {
    selectedItems.splice(index, 1);
    renderSelected();
  };

  tag.appendChild(text);
  tag.appendChild(btn);
  selectedBox.appendChild(tag);
});
  renderPreview();
}


  selectedItems.forEach(item => {
    const div = document.createElement("div");
    div.textContent = item;
    previewList.appendChild(div);
  });
}
document.addEventListener("click", function (e) {
  if (
    !searchInput.contains(e.target) &&
    !suggestionBox.contains(e.target)
  ) {
    suggestionBox.innerHTML = "";
  }
});
