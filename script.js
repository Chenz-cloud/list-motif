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

      div.onclick = function () {
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

  selectedBox.innerHTML = "";
  selectedItems.forEach(item => {
    const tag = document.createElement("span");
    tag.textContent = item;
    selectedBox.appendChild(tag);
  });

  renderPreview();
}

function renderPreview() {
  const previewList = document.getElementById("preview-list");
  previewList.innerHTML = "";

  selectedItems.forEach(item => {
    const div = document.createElement("div");
    div.textContent = item;
    previewList.appendChild(div);
  });
}
