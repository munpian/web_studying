// const buttonAdd = document.getElementById

const button = document.getElementById('button');

button.addEventListener('click', function(){
    this.innerHTML = 'クリック済み';
    this.setAttribute('disabled', true);
});


const buttonAdd = document.getElementById('button-add');
const buttonClear = document.getElementById('button-clear');
const list = document.getElementById('list');

buttonAdd.addEventListener('click', function(){
    const element = document.createElement('li');
    element.innerHTML = 'リスト';
    list.appendChild(element);
})

buttonClear.addEventListener('click', function(){
    list.removeChild(list.lastChild);
})