
const menuListNode = document.getElementById('menu_list');
const summNode = document.getElementById('summ');
const showOrderBtn = document.getElementById('show_order');
const ordersListNode = document.getElementById('orders_list');
ORDER_LIST_HIDEN = 'orders_list-hiden';

let MENU_LIST = [
    {
        id:0,
        name: 'capuchino',
        cost: 20,
        checked:false,
        quantity:0
    },
    {   
        id:1,
        name: 'raf',
        cost: 30,
        checked:false,
        quantity:0
    },
    {   
        id:2,
        name: 'americano',
        cost: 10,
        checked:false,
        quantity:0
    },
    {   
        id:3,
        name: 'tea',
        cost: 10,
        checked:false,
        quantity:0
    }
];

let ORDER = [];
const CHECKED_CLASS_NAME = 'checked-position';
const CHECKED_CHECKBOX = 'checked-checkbox';


const renderMenuList = (menuList) => {
    menuListNode.innerHTML = '';
    menuList.forEach(e => {
        const menuItem = document.createElement('li');
        menuItem.className = 'position';

        const checkbox = document.createElement('input');
        checkbox.className = 'position__checkbox';
        checkbox.setAttribute('type', 'checkbox');

        const label = document.createElement('label');
        label.className = 'label';
        label.innerText = e.name;

        const cost = document.createElement('p');
        cost.className = 'cost';
        cost.innerText = e.cost;

        const quantity = document.createElement('input');
        quantity.className = 'quantity';
        quantity.setAttribute('type', 'number');
        quantity.setAttribute('min', 0);
        quantity.setAttribute('placeholder', 0);
      
        quantity.addEventListener('change', handlerQuantityInput);
      
        menuItem.appendChild(checkbox);
        menuItem.appendChild(label);
        menuItem.appendChild(cost);
        menuItem.appendChild(quantity);
        
        menuListNode.append(menuItem);
    });
}

const changeQuantuty = (index, value) => {
    MENU_LIST.forEach(e => {
        if (e.id === index) {
            e.quantity = value;
        }
    });
}

const handlerQuantityInput = (event) => {
    if (event.target.classList.contains("quantity")) {
        const currentQuantity = event.target.closest(".quantity");
        const currentpositionItem = event.target.closest(".position");
        const currentPositonIndex = getPositionIndex(currentpositionItem);
        changeQuantuty(currentPositonIndex, currentQuantity.value);
        getOrderList (MENU_LIST);
        renderTotal(getSumm(ORDER));
        renderOrderList(ORDER);
    }
}
const getPositionIndex = (positionsElement) => {
    // задаем массив, состоящий из вложенных элементов
    const positionIndex = Array.from(menuListNode.children).indexOf(positionsElement)
    return (
        positionIndex
    );
}
const activeCheckbox = (index) => {
    MENU_LIST.forEach(e => {
        if (e.id === index) {
            e.checked = !e.checked;
        }
    });;
        
};

const getOrderList = (MenuList) => {
    ORDER = MenuList.filter(e=> e.checked)
    console.log(ORDER)
}

const getSumm = (orderList) => {
    let Summ = 0;
    orderList.forEach(e=> {
        if (e.checked = true) {
            Summ += (e.cost*e.quantity)
        }
    })
    return Summ;
}

const renderTotal = (summ) => {
    summNode.innerText = summ
}

const selectPosition = (event) => {
    if (event.target.classList.contains("label")) {
        const currentpositionItem = event.target.closest(".position");
        const currentCheckbox = event.target.closest(".label");
        const currentPositonIndex = getPositionIndex(currentpositionItem);

        currentpositionItem.classList.toggle(CHECKED_CLASS_NAME);
        currentCheckbox.classList.toggle(CHECKED_CHECKBOX);

        activeCheckbox(currentPositonIndex);
        getOrderList (MENU_LIST);
        renderTotal(getSumm(ORDER));
        renderOrderList(ORDER);
    }
}
const renderOrderList = (orderList) =>{
    ordersListNode.innerHTML = '';
    orderList.forEach(e => {
        if (e.checked === true && e.quantity > 0) {
        const oderItem = document.createElement('li');
        oderItem.className = 'order';

        const name = document.createElement('p');
        name.className = 'order__name';
        name.innerText = e.name;

        const quantity = document.createElement('p');
        quantity.className = 'order__quantity';
        quantity.innerText = e.quantity;
      
        oderItem.appendChild(name);
        oderItem.appendChild(quantity);
        ordersListNode.append(oderItem);
        }
    })
}

const showOrderList = () => {
    ordersListNode.classList.toggle(ORDER_LIST_HIDEN);
}

renderMenuList(MENU_LIST);
menuListNode.addEventListener('click', selectPosition);
showOrderBtn.addEventListener('click', showOrderList);
