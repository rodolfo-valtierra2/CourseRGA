let url = 'http://localhost:3000/workers'
let worker = {}

window.onload = () => {
    fetch(url)
    .then(res => res.json())
    .then(res => res.forEach(r => addList(r)))
    .catch(console.log)
}

// function addTask () {
//     const name = document.querySelector('#name').value
//     console.log(name)

//     fetch(url, {method: 'POST', body: JSON.stringify({name: name})})
//     .then(res => res.json())
//     .then( ({body}) => {
//         addList(body, name)
//     })
//     .catch(console.log)
// }

function setDataWorker (event) {
    const {id, value} = event.target;
    worker[id] = value;
}

function addWorker () {
    if (worker.id)
        updateWorker()

    const xml = new XMLHttpRequest()
    xml.open("POST", url, true)
    xml.setRequestHeader("Content-Type","application/json;charset=UTF-8")
    xml.onload = () => {
        const a = JSON.parse(xml.responseText)
        addList(a);
    }
    xml.send(JSON.stringify(worker))
}

function getWorker (id) {
    fetch(url+`${id}`)
    .then(res => res.json())
    .then(res => worker = res[0])

    EditFields();
}

function updateWorker () {
    const {id, ...data} = worker
    updateButtonSave(id)

    fetch(url+`${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
    }).then(res => res.json())
    .then(() => alert('User updated') )
    .catch(() => alert('There was a problem'))
    .finally( () => {
        updateButtonSave()
    })
}

function addList (data) {
    const content = `<tr id="${data.id}" class=" mb-3 shadow p-3">
                <td for="name">${data.name}</label>
                <td for="lastname">${data.lastName}</label>
                <td for="job">${data.job}</label>
                <button class="float-end btn btn-danger" onclick="deleteWorker('${data.id}')">X</button>
                <button class="float-end btn btn-primary" onclick="EditWorker('${data}')">/</button>
            </tr>`

    document.querySelector('.content tbody').innerHTML += content
}

function EditFields() {
    document.querySelector('#id').value = worker.id 
    document.querySelector('#name').value = worker.name 
    document.querySelector('#lastName').value = worker.lastName
    document.querySelector('#age').value = worker.age
    document.querySelector('#job').value = worker.job
}

function deleteWorker (id) {
    const remove = prompt("Are you sure?")

    if (remove) {
        fetch(url+`/${id}`, {method: 'delete'})
        .then(res => res.json())
        .then(() => {
            console.log('Success delete');
            deleteElement(id)
        })
        .catch(console.log)    
    }
}

function deleteElement (id) {
    const child = document.getElementById(id);
    document.querySelector('.content tbody').removeChild(child);
}

function updateButtonSave (isSave=false) {
    if (isSave)
        return document.querySelector('savebtn').innerHTML = 'Save worker'
    document.querySelector('savebtn').innerHTML = 'Update worker'
}