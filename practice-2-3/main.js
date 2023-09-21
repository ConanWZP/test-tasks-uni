import './style.css'
import './main.scss'

import { setupCounter } from './counter.js'

const array = []

document.querySelector('#app').innerHTML = `
  <div>
    
    <button id="fetch">Загрузить данные</button>
    <div id="table-and-search" class="hidden">
    <input id="searchValue" placeholder="Введите заголовок или описание" class="input" />
    <table class='table'>
                        <thead class='thead'>
                            <tr class='tr'>
                                <th class='th' id="userID-switcher">User ID</th>
                                <th class='th' id="id-switcher">ID</th>
                                <th class='th' id="title-switcher">Заголовок</th>
                                <th class='th' id="description-switcher">Описание</th>
                            </tr>
                        </thead>
                        <tbody id="tbody">
                        
</tbody>
                        
                       
                    </table>
</div>
    
  </div>
`

//setupCounter(document.querySelector('#counter'))

const fetchButton = document.getElementById('fetch')
const tableSearch = document.getElementById('table-and-search')

const dataArray = []

if (fetchButton) {
    fetchButton.addEventListener('click', () => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(json => {
                console.log(json)
                dataArray.push(...json)
                render(dataArray)
                tableSearch.classList.remove('hidden')
            })
    })
}

const render = (array) => {
    return document.getElementById('tbody').innerHTML = array.map((post, index) =>
        `
       <tr class='${index %2 ? "odd": ""}'>
            <td class='td'>${post.userId}</td>
            <td class='td'>${post.id}</td>
            <td class='td'>${post.title}</td>
            <td class='td'>${post.body}</td>
        </tr>
`).join('')
}



const userIDSwitcher = document.getElementById('userID-switcher')
const idSwitcher = document.getElementById('id-switcher')
const titleSwitcher = document.getElementById('title-switcher')
const descriptionSwitcher = document.getElementById('description-switcher')
let filteredData = dataArray



let isSortedByUserId = true
userIDSwitcher.addEventListener('click', () => {
    if (isSortedByUserId) {
        filteredData.sort((a, b) => a.userId - b.userId)
        isSortedByUserId = false
    } else {
        filteredData.sort((a, b) => b.userId - a.userId)
        isSortedByUserId = true
    }
    render(filteredData)
})

let isSortedById = true
idSwitcher.addEventListener('click', () => {
    if (isSortedById) {
        filteredData.sort((a, b) => a.id - b.id)
        isSortedById = false
    } else {
        filteredData.sort((a, b) => b.id - a.id)
        isSortedById = true
    }
    render(filteredData)
})


let isSortedByTitle = true
titleSwitcher.addEventListener('click', () => {
    console.log('Клик')
    if (isSortedByTitle) {
        filteredData.sort((a, b) => a.title.localeCompare(b.title))
        isSortedByTitle = false
    } else {
        filteredData.sort((a, b) => b.title.localeCompare(a.title))
        isSortedByTitle = true
    }
    render(filteredData)
})

let isSortedByDescription = false
descriptionSwitcher.addEventListener('click', () => {
    if (isSortedByDescription) {
        filteredData.sort((a, b) => a.body.localeCompare(b.body))
        isSortedByDescription = false
    } else {
        filteredData.sort((a, b) => b.body.localeCompare(a.body))
        isSortedByDescription = true
    }
    render(filteredData)
})

const searchValue = document.getElementById('searchValue')




searchValue.addEventListener('keyup', () => {
   // console.log('Жмяк')
    console.log(searchValue.value)
    if (searchValue.value.length >=3) {

        console.log(searchValue.value)
        console.log('Попал сюда')
        filteredData = dataArray.filter((obj) => obj.title.toLowerCase().includes(searchValue.value.toLowerCase() || obj.body.toLowerCase().includes(searchValue.value.toLowerCase())))
        /*dataArray.filter((obj) => obj.title.toLowerCase().includes(searchValue.value.toLowerCase() || obj.body.toLowerCase().includes(searchValue.value.toLowerCase())))
        console.log(dataArray)*/
        render(filteredData)
    } else {
        filteredData = dataArray
        render(dataArray)
    }



})