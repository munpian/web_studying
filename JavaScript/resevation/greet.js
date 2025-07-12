data = {
    name: '山田太郎',
    age: 24,
}
console.log(data.name)

function greet (name){
    const p = document.createElement('p');
    p.innerHTML = 'ようこそ、' + name + 'さん';
    document.body.appendChild(p);
}

greet(data.name);