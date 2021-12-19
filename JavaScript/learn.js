var usersAPI = "http://localhost:3000/infor";

function start() {
    getUser(renderUser);
    handleCreateForm();
}
start();

function getUser(callback) {
    fetch(usersAPI)
        .then(function (response) {
            return response.json();
        })
        .then(callback)
        .catch(function (err) {
            console.log("err", err);
        });
}
function renderUser(users) {
    const listUser = document.querySelector(".list-user");
    var htmls = users.map(function (user) {
        return `<li class="user-id-${user.id}">
            <h4>${user.name}</h4>
            <p>${user.phone}</p>
            <button onclick = "handleDeleteUser(${user.id})">Xoá</button>
            <button type="button" onclick = "handleEditUser(${user.id})">Sửa</button>
            </li>`;
    });
    const html = htmls.join("");
    listUser.innerHTML = html;
}

function handleCreateUser(data, callback) {
    fetch(usersAPI, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json)
        .then(callback);
}
function handleCreateForm() {
    const btn = document.querySelector(".btn");
    btn.onclick = function () {
        const name = document.querySelector('input[name="name"]').value;
        const phone = document.querySelector('input[name="phone"]').value;
        if (name == "" || phone == "") {
            document.querySelector(".err").style.display = "inline-block";
        } else {
            var formData = {
                name: name,
                phone: phone,
            };
            handleCreateUser(formData);
        }
    };
}
function handleDeleteUser(id) {
    fetch(usersAPI + "/" + id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
        .then((res) => res.json)
        .then(function () {
            const user = document.querySelector(".user-id-" + id);
            if (user) {
                user.remove();
            }
        });
}

function updateUser(id, dataEdit, callback) {
    fetch(usersAPI + "/" + id, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(dataEdit),
    })
        .then((response) => response.json)
        .then(callback)
        .catch(function (err) {
            console.log("err", err);
        });
}
function handleEditUser(id) {
    document.querySelector(".btn").innerText = "Sửa";
    const btn = document.querySelector(".btn");
    var nameEdit = document.querySelector(`.user-id-${id} h4`).textContent;
    var phoneEdit = document.querySelector(`.user-id-${id} p`).textContent;

    document.querySelector('input[name="name"]').value = nameEdit;
    document.querySelector('input[name="phone"]').value = phoneEdit;

    btn.onclick = function () {
        var name = document.querySelector('input[name="name"]').value;
        var phone = document.querySelector('input[name="phone"]').value;
        if (name == "" || phone == "") {
            document.querySelector(".err").style.display = "inline-block";
        } else {
            var dataEdit = {
                name: name,
                phone: phone,
            };
            nameEdit.innerHTML = name;
            phoneEdit.innerHTML = phone;
            updateUser(id, dataEdit, function () {
                getUser(renderUser);
            });
            clear();
        }
    };
}

function clear() {
    document.querySelector('input[name="name"]').value = "";
    document.querySelector('input[name="phone"]').value = "";
}
