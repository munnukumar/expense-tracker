const add = document.querySelector("form");
const ul = document.querySelector("ul");
let count;
if (localStorage.getItem("totalItem")) {
    count = JSON.parse(localStorage.getItem("totalItem")) + 1;
} 
else {
    localStorage.setItem("totalItem", 0);
    count = 1;
}
add.addEventListener("submit", (e) => {
    e.preventDefault();
    const amount = e.target.amount.value;
    const description = e.target.description.value;
    const category = e.target.category.value;
    const li = document.createElement("li");
    const buttonHTML = `<div>
    <button type="button" class="btn btn-danger" onClick=handleDelete(event)>Delete</button>
    <button type="button" class="btn btn-success" onClick=handleEdit(event)>Edit</button>
    </div>`;
    if(category === ""){
        alert("choose category")
        return;
    }
    li.innerHTML = `${amount} => ${description} => ${category} ${buttonHTML}`;
    li.classList.add("list-group-item");
    li.classList.add("d-flex")
    li.classList.add("justify-content-between")
    li.classList.add("align-items-center")
    li.id = count;
    ul.appendChild(li);
    const obj = {
        amount,
        description,
        category,
    };
    localStorage.setItem(count++, JSON.stringify(obj));
    localStorage.setItem("totalItem", count - 1);
    add.reset();
});

const totalItem = JSON.parse(localStorage.getItem("totalItem"));
for (let i = 1; i <= totalItem; i++) {
    const obj = JSON.parse(localStorage.getItem(i));
    const li = document.createElement("li");
    const buttonHTML = `<div>
    <button type="button" class="btn btn-success" onClick=handleEdit(event)>Edit</button>
    <button type="button" class="btn btn-danger" onClick=handleDelete(event)>Delete</button>
    </div>`;
    li.innerHTML = `${obj.amount}  ${obj.description} ${obj.category} ${buttonHTML}`;
    li.id = count;
    li.classList.add("list-group-item");
    li.classList.add("d-flex")
    li.classList.add("justify-content-between")
    li.classList.add("align-items-center")
    ul.appendChild(li);
}

function handleDelete(event) {
    const item = event.target.closest("li");
    const itemId = item.id;
    --count;
    localStorage.setItem("totalItem", count - 1);
    localStorage.removeItem(itemId);
    item.remove();
}

function handleEdit(event) {
    const item = JSON.parse(localStorage.getItem(event.target.closest("li").id));
    add.amount.value = item.amount;
    add.description.value = item.description;
    add.category.value = item.category;
    handleDelete(event);
}
