let url = 'http://localhost:3000/workers'
let workers = []
let worker = {}
const workerStr = {id:'', name:'', lastName:'', age:'', job:''}

window.onload = getAllWorkers();

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

function getAllWorkers() {
    fetch(url)
    .then(res => res.json())
    .then(res => {
        workers = res
        workers.forEach(w => addList(w))
    })
    .catch(console.log)
}

function setDataWorker (event) {
    const {id, value} = event.target;
    worker[id] = value;
}

function addWorker () {
    if (worker.id)
        return updateWorker()

    const xml = new XMLHttpRequest()
    xml.open("POST", url, true)
    xml.setRequestHeader("Content-Type","application/json;charset=UTF-8")
    xml.onload = () => {
        worker = JSON.parse(xml.responseText)
        addList();
        worker = workerStr
        setValueFields()
    }
    xml.send(JSON.stringify(worker))
}

function getWorker (id) {
    fetch(url+`${id}`)
    .then(res => res.json())
    .then(res => worker = res[0])

    EditFields();
}

function fetchWorker (id) {
   return fetch(url+`/${id}`)
    .then(res => res.json())
    .then(res => res)
}
function updateWorker () {
    const {id, ...data} = worker

    fetch(url+`/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
    }).then(res => res.json())
    .then(() => alert('User updated') )
    .catch(() => alert('There was a problem'))
    .finally( () => {
        updateButtonText()
        addList()
    })
}

function addList (data=worker) {
    
    const content = `<tr id="${data.id}" class=" mb-3 shadow p-3">
                <td for="name">${data.name}</label>
                <td for="lastname">${data.lastName}</label>
                <td for="lastname">${data.age}</label>
                <td for="job">${data.job}</label>
                <button class="float-end btn btn-danger" onclick="deleteWorker('${data.id}')">X</button>
                <button class="float-end btn btn-primary" onclick="EditFields('${data.id}')">/</button>
            </tr>`

    document.querySelector('.content tbody').innerHTML += content
}

function EditFields(id) {
    fetchWorker(id)
    .then(res => {
        worker = res
        setValueFields(true)
        deleteElement(id);
    }).finally(() => {
        updateButtonText(true)
    })
}

function setValueFields (isEdit) {
    document.getElementById('name').value = worker.name 
    document.getElementById('lastName').value = worker.lastName
    document.getElementById('age').value = worker.age
    document.getElementById('job').value = worker.job
    if (isEdit)
        document.getElementById('cancelbtn').hidden = false
    else 
        document.getElementById('cancelbtn').hidden = true
}

async function cancelBtn () {
    worker = await fetchWorker(worker.id)
    addList()
    worker = workerStr;
    setValueFields(false)
}

function deleteWorker (id) {
    const remove = confirm("Are you sure?")

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

function updateButtonText (isSave=false) {
    const button = document.querySelector('#savebtn')
    if (isSave){
        button.classList.replace('btn-primary', 'btn-success')
        return button.innerHTML = 'Save worker'
    }
    
    button.classList.replace('btn-primary', 'btn-primary')
    document.querySelector('#savebtn').innerHTML = 'Update worker'
}