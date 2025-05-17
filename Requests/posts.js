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
//         addTableRow(body, name)
//     })
//     .catch(console.log)
// }

function getAllWorkers() {
    fetch(url)
    .then(res => res.json())
    .then(res => {
        workers = res
        workers.forEach(w => addTableRow(w))
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
        addTableRow();
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
        addTableRow()
    })
}

function addTableRow (data=worker) {
    
    const content = `<tr id="${data.id}" class=" mb-3 shadow p-3">
                <td for="name">${data.name}</label>
                <td for="lastname">${data.lastName}</label>
                <td for="lastname">${data.age}</label>
								<td for="job">${data.job}</label>
								<td>
                                <button class="btn btn-primary" onclick="EditFields('${data.id}')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
</svg></button>
	<button class=" btn btn-danger" onclick="deleteWorker('${data.id}')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg></button>

</td>
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
    addTableRow()
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

function deleteTableData () {
	document.querySelector('table tbody').innerHTML = ''
}

function searchData (e) {
	const search = e.target.value;
	deleteTableData()
	if (search!=null){
			const workersFilter = workers.filter(w => 
				(w.name+w.lastname+w.age+w.job).replace(' ', '')
				.includes(search.trim().replaceAll('\.',''))
				)
		workersFilter.forEach(w => addTableRow(w))
	}	else {
		addTableRow()
	}
}
