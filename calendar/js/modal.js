export function openModal(content){
    document.getElementById('calendar').innerHTML = content;
    document.getElementById('calendarModal').style.display = 'block';
}   

export function closeModal(){
    document.getElementById('calendarModal').style.display = 'none';
}

export function setupModalEvents(){
    document.getElementById('closeModal').onclick = closeModal;
   
    window.onclick = function(e){
        if(e.target.id === 'calendarModal')
            closeModal();
    }
}