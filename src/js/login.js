// Якщо імейл і пароль користувача збігаються, зберігай дані з форми при сабміті
// у локальне сховище і змінюй кнопку Login на Logout і роби поля введення
// недоступними для змін.
// При перезавантаженні сторінки, якщо користувач залогінений, ми маємо бачити Logout-кнопку
// та недоступні для зміни поля з даними користувача.
// Клік по кнопці Logout повертає все до початкового вигляду і видаляє дані користувача
// З локального сховища.
// Якщо введені дані не збігаються з потрібними даними, викликати аlert і
// повідомляти про помилку.
const USER_DATA = {
    email: "user@mail.com",
    password: "secret",
};



const form = document.querySelector(".login-form")
const button = document.querySelector(".login-btn")
const email = document.querySelector("[name='email']")
const password = document.querySelector("[name='password']")

function handleSubmit(event) {
    event.preventDefault()
    // const { email, password } = event.target.elements
    const emailValue = email.value.trim()
    const passwordValue = password.value.trim()
    if (emailValue === "" || passwordValue === "") {
        alert("Заповніть всі поля !")
        return
    };
    if (emailValue !== USER_DATA.email || passwordValue !== USER_DATA.password) {
        alert("Данні не співпадають!")
        return
    }


    localStorage.setItem("login-data", JSON.stringify({ email: emailValue, password: passwordValue }))
    button.textContent = "Logout"

    email.setAttribute("readonly", true)
    password.setAttribute("readonly", true)

}

const storageData = localStorage.getItem("login-data")


if (storageData) {
    const parseData = JSON.parse(storageData)
    button.textContent = "Logout"
    email.setAttribute("readonly", true)
    password.setAttribute("readonly", true)
    email.value = parseData.email || ""
    password.value = parseData.password || ""
}



form.addEventListener("submit", handleSubmit)
