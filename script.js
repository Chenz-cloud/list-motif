const searchInput = document.getElementById("search");
const suggestionBox = document.getElementById("suggestions");
const selectedBox = document.getElementById("selected");

let selectedItems = [];

searchInput.addEventListener("input", () => {
  const keyword = searchInput.value.toLowerCase();
  suggestionBox.innerHTML = "";

  if (keyword === "") return;

  const filtered = motifList.filter(item =>
    item.toLowerCase().includes(keyword) &&
    !selectedItems.includes(item)
  );

  filtered.forEach(item => {
    const div = document.createElement("div");
    div.textContent = item;
    div.className = "suggestion";

    div.onclick = () => {
      selectedItems.push(item);
      renderSelected();
      searchInput.value = "";
      suggestionBox.innerHTML = "";
    };

    suggestionBox.appendChild(div);
  });
});

function renderSelected() {
  selectedBox.innerHTML = "";

  selectedItems.forEach(item => {
    const div = document.createElement("div");
    div.className = "selected-item";
    div.textContent = item;
    selectedBox.appendChild(div);
  });
}
