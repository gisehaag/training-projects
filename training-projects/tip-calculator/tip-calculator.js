const $bill = document.getElementById('bill');
const $people = document.getElementById('people'); 
const $service = document.getElementById('service');

const $form = document.getElementById('form');

const $result = document.querySelector('.results');

const $tipAmount = document.getElementById('tipAmount');
const $totalAmount = document.getElementById('totalAmount');
const $amountPerEach = document.getElementById('amountPerEach');

$form.addEventListener('submit', calculateTip);


function calculateTip(event) {
    event.preventDefault();

    let percent = 0;
    switch ($service.value) {
        case 'Great':
            percent = 0.2;
            break;
        
        case 'Good':
            percent = 0.1;
            break;

        case 'Bad':
            percent = 0.02;
            break;
    }
    
    let tip = ( parseFloat($bill.value) * percent ).toFixed(2);
    let total = ( parseFloat($bill.value) * (1 + percent) ).toFixed(2);
    let each = ( total / parseFloat($people.value) ).toFixed(2);

    $result.classList.add('show');
    
    $tipAmount.innerHTML = `$${tip}`;
    $totalAmount.innerHTML = `$${total}`;
    $amountPerEach.innerHTML = `$${each}`;
}

