
const cartItemsContainer = document.getElementById('cart-items');
const emptyCartMsg = document.getElementById('empty-cart-msg');
const cartTable = document.getElementById('cart-table');
const totalAmountDisplay = document.getElementById('total-amount');
const bookNowBtn = document.getElementById('book-now-btn');
const logoutBtn = document.getElementById('logout-btn');

let cart = [];
let totalAmount = 0;


document.querySelectorAll('.add-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const card = e.target.closest('.service-card');
        const id = card.getAttribute('data-id');
        const name = card.getAttribute('data-name');
        const price = parseInt(card.getAttribute('data-price'));

    
        const existingItem = cart.find(item => item.id === id);
        if (!existingItem) {
            cart.push({ id, name, price });
            updateCartUI();
        } else {
            alert("Yeh service pehle se add hai!");
        }
    });
});


document.querySelectorAll('.skip-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const card = e.target.closest('.service-card');
        card.style.opacity = '0.5';
        card.style.pointerEvents = 'none'; 
    });
});

function updateCartUI() {
    if (cart.length === 0) {
        emptyCartMsg.style.display = 'block';
        cartTable.style.display = 'none';
        bookNowBtn.classList.remove('active');
        bookNowBtn.style.cursor = 'not-allowed';
    } else {
        emptyCartMsg.style.display = 'none';
        cartTable.style.display = 'table';
        bookNowBtn.classList.add('active');
        bookNowBtn.style.cursor = 'pointer';
    }

    
    cartItemsContainer.innerHTML = '';
    totalAmount = 0;

    cart.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>₹ ${item.price}</td>
        `;
        cartItemsContainer.appendChild(row);
        totalAmount += item.price;
    });

    
    totalAmountDisplay.innerText = `₹ ${totalAmount}`;
}


document.getElementById('order-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (cart.length === 0) {
        alert("Please select at least one service before booking.");
        return;
    }

    alert("Booking Successful! Aapki service book ho gayi hai.");
    
    
    document.getElementById('order-form').reset();
    cart = [];
    updateCartUI();
});


logoutBtn.addEventListener('click', () => {
    alert("Logging out...");
});