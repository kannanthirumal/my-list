/**
 * console.log(document.URL);
 * console.log(document.all);
 */

/**
 * variables
 * */
const form = document.getElementById("addForm");
const itemList = document.getElementById("items");
const filter = document.getElementById("filter");

/**
 * event listeners
 * */

/**form submission event */
form.addEventListener("submit", addItem);

/**delete list item event */
itemList.addEventListener("click", removeItem);

/**Add item */
filter.addEventListener("keyup", filterItems);

/**
 * functions
 * */

/**function 1 - addItem */
function addItem(e) {
  e.preventDefault();

  // get input value from the user
  const newItem = document.getElementById("item").value.trim();
  console.log(newItem);

  // Show a toast if the item is empty
  if (newItem === "") {
    const toast = new bootstrap.Toast(document.getElementById("emptyToast"));
    toast.show();
    return;
  }

  // Check if the list was empty before adding the item
  const isEmpty = itemList.childElementCount === 0;
  // Create new li element
  const li = document.createElement("li");
  // Add class
  li.classList.add("list-group-item");
  // Add text to li
  li.textContent = newItem;
  // Create new delete button
  const deleteBtn = document.createElement("button");

  // Add classes and style to the delete button
  deleteBtn.className = "btn btn-danger btn-sm float-right ms-auto delete";
  deleteBtn.style.float = "right";
  // Add teext to delete button
  deleteBtn.textContent = "X";

  // Append the delete button into li
  li.appendChild(deleteBtn);
  // Append the li into item list
  itemList.append(li);

  document.getElementById("item").value = "";

  // Display the empty message if the list is previously empty
  if (isEmpty) {
    const emptyMessage = document.getElementById("emptyMessage");
    emptyMessage.classList.add("d-none"); // Show the empty message
  }
}

/**function 2 - removeItem */
function removeItem(e) {
  if (e.target.classList.contains("delete")) {
    if (confirm("Are you sure you want to delete this item?")) {
      const removedItem = itemList.removeChild(e.target.parentElement);
    } else {
      return;
    }
  }

  // Toggle visibility based on the list item presence
  const emptyMessage = document.getElementById("emptyMessage");
  if (itemList.childElementCount === 0) {
    emptyMessage.classList.remove("d-none");
  }
}

/**function 3 - filterItems */
function filterItems(e) {
  const text = e.target.value.toLowerCase();
  const items = itemList.getElementsByTagName("li");

  // Check if the list was empty before searching for the item
  const isEmpty = itemList.childElementCount === 0;

  let itemsFound = false;

  Array.from(items).forEach((item) => {
    const itemName = item.firstChild.textContent;
    if (itemName.toLowerCase().indexOf(text) !== -1) {
      item.style.display = "block";
      itemsFound = true;
    } else {
      item.style.display = "none";
    }
  });

  const filterEmpty = document.getElementById("filterEmpty");
  if (!itemsFound && !isEmpty) {
    filterEmpty.classList.remove("d-none");
  } else {
    filterEmpty.classList.add("d-none");
  }
}
