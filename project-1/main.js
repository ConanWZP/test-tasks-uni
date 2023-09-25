import './style.css'
import './app.scss'
import elips from './assets/Ellipse.svg'




document.querySelector('#app').innerHTML = `
  <div>
    <div class="card">
        <button id="open" class="open-btn" type="button">Open modal</button>
    </div>
    <dialog class="modal-container">
        <div class="modal-content">
            <div class="modal-title">Стать партнёром проекта</div>
            <form action="/" method="GET" id="form" class="modal-main__info">
                <div class="modal-main__top">
                    <div class="modal-main__left">
                        <div class="modal-main__input-wrapper">
                            <div class="modal-main__sign"><span>✱</span><span>Название организации</span></div>
                            <input class="modal-main__input" name="org-name" id="org-name" required/>
                        </div>
                        <div class="modal-main__input-wrapper">
                            <div class="modal-main__sign"><span>✱</span><span>Телефон</span></div>
                            <input class="modal-main__input" name="phone" id="phone" />
                        </div>
                        <div class="modal-main__input-wrapper">
                            <div class="modal-main__sign"><span>✱</span><span>E-mail</span></div>
                            <input class="modal-main__input" required name="email" type="email" id="email" />
                        </div>
                    </div>
                    <div class="modal-main__right">
                        <div class="modal-main__sign"><span>✱</span><span>Логотип (jpeg, png)</span></div>
                        <div class="modal-logo">
                             <img src=${elips} />
                             <img class="modal-logo__close" src="./public/Group%202394.svg" />
                             <div class="modal-logo__file">
                                <img src="./assets/Vector%20(4).svg" />
                                <div>Выберите файл</div>
                                <input id="file" type="file" name="file" accept='image/*' />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-main__center">
                    <div class="modal-main__input-wrapper modal-main__large modal-main__select">
                            <div class="modal-main__sign"><span>✱</span><span>Направление</span></div>
                            <!--<input class="modal-main__input" value="+7 933 848-34-33" />-->
                            <select class="modal-main__input modal-select" required name="direction" id="direction">
                                  <option value="" disabled selected>--Выберите значение --</option>
                                  <option value="eco">Экология</option>
                                  <option value="math">Математика</option>
                            </select>
                            <img id="select" src="./assets/Group.svg" />
                    </div>
                    <div class="modal-main__input-wrapper modal-main__large">
                            <input class="modal-main__input"  />
                            <img id="select" src="./assets/Group.svg" />
                    </div>
                    <div class="modal-main__input-wrapper modal-main__large">
                            <input class="modal-main__input"  />
                            <img id="select" src="./assets/global%201.svg" />
                    </div>
                    <div class="modal-main__input-wrapper modal-main__large">
                            <input class="modal-main__input"  />
                            <img id="select" src="./assets/vk%201.svg" />
                    </div>
                    <div class="modal-main__input-wrapper modal-main__large">
                            <input class="modal-main__input"  />
                            <img id="select" src="./assets/Icon.svg" />
                    </div>
                    <div class="modal-main__input-wrapper modal-main__large">
                            <input class="modal-main__input" />
                            <img id="select" src="./assets/Instagram_Color_icon-icons.com_71811%201.svg" />
                    </div>
                    <div class="modal-main__input-wrapper modal-main__large">
                            <input class="modal-main__input"  />
                            <img id="select" src="./assets/youtube%202.svg" />
                    </div>
                    <div class="modal-main__input-wrapper modal-main__large modal-main__select">
                            <div class="modal-main__sign"><span></span><span>Руководитель</span></div>
                            <input class="modal-main__input"  />
                    </div>
                </div>
                <div id="error" class="modal-error"></div>
                
                <button type="submit" class="modal-send">Стать партнёром проекта</button>
            <button type="button" class="modal-close">Отменить</button>
            </form>
        </div>
        
    </dialog>
    <div id="success" class="modal-success"></div>
  </div>
`



const modal = document.querySelector('.modal-container')
const openModal = document.querySelector('#open')
const closeModal = document.querySelector('.modal-close')


openModal.addEventListener('click', () => {
    modal.showModal()
})

closeModal.addEventListener('click', () => {
    modal.close()
})

const divFile = document.querySelector('.modal-logo__file')
const fileInput = document.querySelector('#file')

divFile.addEventListener('click', () => {
    fileInput.click()
})


const form = document.getElementById('form')
const orgName = document.getElementById('org-name')
const phone = document.getElementById('phone')
const direction = document.getElementById('direction')
const email = document.getElementById('email')
const errorElement = document.getElementById('error')
const successElement = document.getElementById('success')

form.addEventListener('submit', (e) => {
    let messages = []
    console.log(fileInput.value)
    if (orgName.value.length < 2) {
        messages.push('Название должно быть длиннее двух символов')
    }

    let regPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
    let regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (!regPhone.test(phone.value)) {
        e.preventDefault()
        messages.push('Неверно указан формат номера')
    }

    if (!regEmail.test(email.value)) {
        e.preventDefault()
        messages.push('Неверно указан формат почты')
    }

    if (!fileInput.value) {
        messages.push('Добавьте логотип')
    }

    if (messages.length > 0) {
        e.preventDefault()
        errorElement.innerText = messages.join(', ')
    } else {
        messages = []
        e.preventDefault()
        successElement.innerText = 'Форма отправлена'
        form.reset()
        modal.close()
    }


})
