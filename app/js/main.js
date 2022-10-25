
const promise = () => {
    return new Promise(resolve => {
        resolve(setTimeout(() => {
            alert(`Тут у меня асинхронный код, через 2 секунды вывелся)`)
        }, 2000))
    })
}

const changeStyles = () => {
    const elem = document.querySelector('.header_list__li');
    elem.classList.toggle('red-theme');
}

