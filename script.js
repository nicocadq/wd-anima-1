const getStorageData = () => {
  return localStorage.getItem("items")
    ? JSON.parse(localStorage.getItem("items"))
    : [];
};

const setDataOnStorage = (value) => {
  localStorage.setItem("items", JSON.stringify(value));
};

const list = getStorageData();

const addToStorage = (value) => {
  list.push(value);
  setDataOnStorage(list);
};

const deleteFromStorage = (value) => {
  const filteredList = list.filter((item) => item !== value);
  setDataOnStorage(filteredList);
};

const addItemToDOMList = (value) => {
  const domNode = document.getElementById("list");
  const newListItem = `
    <div class="item">
      <p>${value}</p>
    </div>`;
  domNode.innerHTML += newListItem;
};

const addItem = () => {
  const domNode = document.getElementById("input-text");
  const nodeValue = domNode.value;
  addToStorage(nodeValue);
  addItemToDOMList(nodeValue);
  domNode.value = "";
};

const setData = () => {
  list?.map(addItemToDOMList);
};

//Guardarlo en localStorage
