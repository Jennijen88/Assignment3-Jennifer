// fill select option
const type = document.getElementById("type");
const result = document.getElementById("result");
const url = "http://localhost:3000/data";
const xhr = new XMLHttpRequest();

const typeList = [
    "Mark Manson",
    "Maudy Ayunda",
    "Merry Riana",
    "Henry Manampiring",
    "Tere Liye"
];

typeList.forEach((element) => {
    // create option using DOM
    const newOption = document.createElement('option');
    const optionText = document.createTextNode(element);
    // set option text
    newOption.appendChild(optionText);
    // and option value
    newOption.setAttribute('value', element);

    type.appendChild(newOption)
});

function fetchData() {
    xhr.onerror = function () {
        alert("error")
    }

    xhr.onloadstart = function () {
        result.innerHTML = "Start";
    }

    xhr.onloadend = function () {
        result.innerHTML = "";
        const data = JSON.parse(this.response);
        data.forEach((item) => {
            const node = document.createElement("div");
            node.innerHTML = `
                <div class="card mb-3 text-bg-dark" style="width: 18rem;">
                    <img src="${item.img}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Nama : ${item.name}</h5>
                        <h5 class="card-text">Penulis: ${item.type}</h5>
                        <button class="btn btn-primary" onclick="showBookDetail(${item.id})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sunglasses" viewBox="0 0 16 16">
                        <path d="M3 5a2 2 0 0 0-2 2v.5H.5a.5.5 0 0 0 0 1H1V9a2 2 0 0 0 2 2h1a3 3 0 0 0 3-3 1 1 0 1 1 2 0 3 3 0 0 0 3 3h1a2 2 0 0 0 2-2v-.5h.5a.5.5 0 0 0 0-1H15V7a2 2 0 0 0-2-2h-2a2 2 0 0 0-1.888 1.338A1.99 1.99 0 0 0 8 6a1.99 1.99 0 0 0-1.112.338A2 2 0 0 0 5 5H3zm0 1h.941c.264 0 .348.356.112.474l-.457.228a2 2 0 0 0-.894.894l-.228.457C2.356 8.289 2 8.205 2 7.94V7a1 1 0 0 1 1-1z"/>
                      </svg></button>
    
                        <button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#updateModal${item.id}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                      </svg></button>

                      <a href="#" class="btn btn-danger" onclick="deleteData(${item.id})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                        </svg>
                      </a>

                      <!-- Modal untuk menampilkan detail buku -->
                <div class="modal fade" id="bookDetailModal" tabindex="-1" aria-labelledby="bookDetailModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="bookDetailModalLabel">Detail Buku</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body" id="bookDetailContent">
                                <!-- Data buku akan ditampilkan di sini -->
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="updateModal${item.id}" tabindex="-1" aria-labelledby="updateModalLabel${item.id}" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content" style="color:black;">
                            <div class="modal-header">
                                <h5 class="modal-title" id="updateModalLabel${item.id}">Update Library Jennifer</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="mb-3">
                                        <label for="newName" class="form-label">Judul Buku</label>
                                        <input type="text" class="form-control" id="newName${item.id}" value="${item.name}">
                                    </div>
                                    <div class="mb-3">
                                        <label for="newImg" class="form-label">Gambar</label>
                                        <input type="text" class="form-control" id="newImg${item.id}" value="${item.img}">
                                    </div>
                                    <div class="mb-3">
                                        <label for="newType" class="form-label">Penulis</label>
                                        <select class="form-select" id="newType${item.id}">
                                            <option disabled selected hidden>cari penulis buku</option>
                                            ${typeList.map(type => `<option value="${type}" ${type === item.type ? 'selected' : ''}>${type}</option>`).join('')}
                                        </select>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
                                <button type="button" class="btn btn-primary " onclick="updateData(${item.id})">Simpan Data</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
            result.appendChild(node);
        });
    }

    xhr.onprogress = function () {
        result.innerHTML = "Loading";
    }

    xhr.open("GET", url);
    xhr.send();
}

function postData(event) {
    event.preventDefault();
    const data = JSON.stringify({
        name: document.getElementById("name").value,
        img: document.getElementById("img").value,
        type: document.getElementById("type").value
    });

    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onload = function () {
        console.log(this.responseText);
    };

    xhr.send(data);
}

function updateData(id) {
    const newName = document.getElementById(`newName${id}`).value;
    const newImg = document.getElementById(`newImg${id}`).value;
    const newType = document.getElementById(`newType${id}`).value;

    const newData = {
        name: newName,
        img: newImg,
        type: newType
    };

    xhr.open("PUT", url + `/${id}`);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onload = function () {
        console.log(this.responseText);
    };

    xhr.send(JSON.stringify(newData));
}

function deleteData(id) {
    // Menampilkan konfirmasi dengan alert
    const confirmation = confirm("Anda yakin ingin menghapus data buku ini?");
    
    if (confirmation) {
        xhr.open("DELETE", url + `/${id}`);
        xhr.send();
    }
}

function showBookDetail(id) {
    const xhrDetail = new XMLHttpRequest();
    xhrDetail.open("GET", url + `/${id}`);
    xhrDetail.onload = function () {
        if (xhrDetail.status === 200) {
            const book = JSON.parse(xhrDetail.responseText);
            const bookDetailText = `
                <p><strong>Judul Buku:</strong> ${book.name}</p>
                <p><strong>Penulis:</strong> ${book.type}</p>
                <p><strong>Gambar:</strong> <img src="${book.img}" alt="${book.name}" style="max-width: 100%; height: auto;"></p>
            `;

            // Tampilkan data buku dalam modal
            const bookDetailContent = document.getElementById("bookDetailContent");
            bookDetailContent.innerHTML = bookDetailText;

            // Ganti warna teks modal
            bookDetailContent.style.color = "black";

            // Tampilkan modal "Detail Buku"
            const bookDetailModal = new bootstrap.Modal(document.getElementById("bookDetailModal"));
            bookDetailModal.show();
        } else {
            alert("Gagal mengambil detail buku.");
        }
    };
    xhrDetail.send();
}


