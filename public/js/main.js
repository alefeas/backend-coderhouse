const logoutButton = document.getElementById('logout-button')

logoutButton?.addEventListener('click', ()=>{
    fetch('/session/logout')
    .then(window.location.href = '/')
})