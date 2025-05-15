let url = 'http://localhost:3000/workers'

window.onload = () => {
    fetch(url)
    .then(res => res.json())
    .then(res => res.forEach(r => addList(r.id, r.name)))
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

function addTask (){
    const name = document.querySelector('#name').value

    const xml = new XMLHttpRequest()
    xml.open("POST", url, true)
    xml.setRequestHeader("Content-Type","application/json;charset=UTF-8")
    xml.onload = () => {
        const a = JSON.parse(xml.responseText)
        addList(a.id, a.name);
    }
    xml.send(JSON.stringify({name}))
}


function addList (id, name) {
    const content = `<div id="${id}" class=" mb-3 shadow p-3">
    <button class="float-end btn btn-danger" onclick="deleteWorker('${id}')">X</button>
                <label class="" for="name">${name}</label>
            </div>`

    document.querySelector('.content').innerHTML += content
}

function deleteWorker (id) {
    const child = document.getElementById(id);

    document.querySelector('.content').removeChild(child);

    fetch(url+`/${id}`, {method: 'delete'})
    .then(res => res.json())
    .then(console.log('success delete'))
    .catch(console.log)
}