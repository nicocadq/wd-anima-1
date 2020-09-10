const sanitizer = (value) => {
  const trimmedValue = value.trim();

  if (trimmedValue) return trimmedValue;
};

const getStorageData = () => {
  return localStorage.getItem("items")
    ? JSON.parse(localStorage.getItem("items"))
    : [];
};

const setDataOnStorage = (value) => {
  localStorage.setItem("items", JSON.stringify(value));
};

const addToStorage = (value, list) => {
  list.push(value);
  setDataOnStorage(list);
};

const deleteFromStorage = (value, list) => {
  const filteredList = list.filter((item) => item !== value);
  setDataOnStorage(filteredList);
};

const createNotification = (msg) => {
  const notification = document.createElement("div");
  const h3 = document.createElement("h3");
  h3.innerHTML = `${msg}`;
  notification.className = "notification";
  notification.appendChild(h3);
  document.body.appendChild(notification);

  removeNotification();

  setTimeout(() => {
    notification.classList.add("visible");
  }, 10);
  setTimeout(() => {
    notification.classList.add("remove");
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 1250);
};

const removeNotification = () => {
  const notifications = document.querySelectorAll(".visible");
  if (notifications.length > 0) {
    notifications.forEach((notification) => {
      notification.classList.add("remove");
      setTimeout(() => {
        notification.remove();
      }, 300);
    });
  }
};

const items = getStorageData();

const addItemToDOMList = (value) => {
  const domNode = document.getElementById("list");
  const newListItem = `
    <div class="item">
      <p class="item__text">${value}</p>
      <button class="item__button" onclick="deleteItem()">Remove</button>
    </div>`;
  domNode.innerHTML += newListItem;
};

const deleteFromDOM = (domNode) => {
  domNode.remove();
};

const addItem = () => {
  const domNode = document.getElementById("input-text");
  const nodeValue = domNode.value;
  const value = sanitizer(nodeValue);

  if (value) {
    addToStorage(nodeValue, items);
    domNode.value = "";
    addItemToDOMList(nodeValue);
  } else {
    createNotification("The text have not to be empty.");
  }
};

const deleteItem = () => {
  const domButtonNode = event.target;
  const domParagraphNode = domButtonNode.previousElementSibling;
  const nodeValue = domParagraphNode.innerHTML;
  const domItemNode = domButtonNode.parentNode;

  deleteFromStorage(nodeValue, items);
  deleteFromDOM(domItemNode);
};

const setData = () => {
  items?.map(addItemToDOMList);
};
