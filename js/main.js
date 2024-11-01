const lambdaUrl = "https://luhc7k6wei.execute-api.us-east-2.amazonaws.com/items";

document.getElementById("load-items").onclick = function () {
    loadItems();
};

document.getElementById("add-item").onclick = function () {
    addItem();
};

function loadItems() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", lambdaUrl);
    xhr.onload = function () {
        const items = JSON.parse(xhr.responseText);
        const tableBody = document.getElementById("item-table").querySelector("tbody");
        tableBody.innerHTML = ""; // Clear table
        items.forEach(item => {
            const row = document.createElement("tr");
            row.innerHTML = `<td>${item.id}</td><td>${item.name}</td><td>${item.price}</td><td><button onclick="deleteItem('${item.id}')">Delete</button></td>`;
            tableBody.appendChild(row);
        });
    };
    xhr.send();
}

function addItem() {
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;

    let xhr = new XMLHttpRequest();
    xhr.open("PUT", lambdaUrl);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({ id, name, price }));
    xhr.onload = function () {
        loadItems(); // Refresh the list after adding an item
    };
}

function deleteItem(itemId) {
    let xhr = new XMLHttpRequest();
    xhr.open("DELETE", "https://luhc7k6wei.execute-api.us-east-2.amazonaws.com/items/" + itemId);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}
