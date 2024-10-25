let slider = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let dots = document.querySelectorAll('.slider .dots li');

let lengthItems = items.length - 1;
let active = 0;
next.onclick = function(){
    active = active + 1 <= lengthItems ? active + 1 : 0;
    reloadSlider();
}
prev.onclick = function(){
    active = active - 1 >= 0 ? active - 1 : lengthItems;
    reloadSlider();
}
let refreshInterval = setInterval(()=> {next.click()}, 3000);
function reloadSlider(){
    slider.style.left = -items[active].offsetLeft + 'px';
    // 
    let last_active_dot = document.querySelector('.slider .dots li.active');
    last_active_dot.classList.remove('active');
    dots[active].classList.add('active');

    clearInterval(refreshInterval);
    refreshInterval = setInterval(()=> {next.click()}, 3000); 
}

dots.forEach((li, key) => {
    li.addEventListener('click', ()=>{
         active = key;
         reloadSlider();
    })
})
window.onresize = function(event) {
    reloadSlider();
}

function updateCartCount() {
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    itemCountElement.textContent = totalItems;
}

function handleCartActions(event) {
    const target = event.target;
    const itemId = parseInt(target.getAttribute('data-id'));
    const quantityInput = document.querySelector(`.quantity[data-id="${itemId}"]`);
    const cartItemIndex = cart.findIndex(item => item.id === itemId);

    if (target.classList.contains('plus')) {
        cart[cartItemIndex].quantity += 1;
    } else if (target.classList.contains('minus')) {
        if (cart[cartItemIndex].quantity > 1) {
            cart[cartItemIndex].quantity -= 1;
        } else {
            cart.splice(cartItemIndex, 1); // Remove the item if quantity is 0
        }
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
};
