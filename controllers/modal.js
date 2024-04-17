const closeModalButton = document.querySelector('.close-btn');
const overlay = document.getElementById('overlay');

const modal = document.querySelector('.modal.active');

closeModalButton.addEventListener('click', () => {
    closeModal(modal);
    console.log("clicked on close btn");
});

function closeModal(modal) {
    if (modal == null) return;
    modal.classList.remove('active');
    overlay.classList.remove('active');
};

overlay.addEventListener('click', () => {
    closeModal(modal);
})