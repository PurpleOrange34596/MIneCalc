// items database
const ITEM_DATABASE = {
    "Diamond Pickaxe": { "Diamond": 3, "Stick": 2 },
    "Diamond Axe": { "Diamond": 3, "Stick": 2 },
    "Diamond Sword": { "Diamond": 2, "Stick": 1 },
    "Golden Apple": { "Gold Ingot": 8, "Apple": 1 },
    "Enchanted Golden Apple": { "Gold Block": 8, "Apple": 1 },
    "Beacon": { "Glass": 5, "Nether Star": 1, "Obsidian": 3 },
    "Sticky Piston": { "Cobblestone": 4, "Redstone Dust": 1, "Iron Ingot": 1, "Wood Planks": 3, "Slimeball": 1 },
    "Piston": { "Cobblestone": 4, "Redstone Dust": 1, "Iron Ingot": 1, "Wood Planks": 3 },
    "TNT": { "Gunpowder": 5, "Sand": 4 },
    "Booksheet / Bookshelf": { "Wood Planks": 6, "Book": 3 },
    "Anvil": { "Iron Block": 3, "Iron Ingot": 4 },
    "Chest": { "Wood Planks": 8 },
    "Hopper": { "Iron Ingot": 5, "Chest": 1 }
};

// item crafting materials
const RECIPES = {
    "Diamond Pickaxe": { "Diamond": 3, "Stick": 2 },
    "Diamond Axe": { "Diamond": 3, "Stick": 2 },
    "Diamond Sword": { "Diamond": 2, "Stick": 1 },
    "Golden Apple": { "Gold Ingot": 8, "Apple": 1 },
    "Enchanted Golden Apple": { "Gold Block": 8, "Apple": 1 },
    "Beacon": { "Glass": 5, "Nether Star": 1, "Obsidian": 3 },
    "Sticky Piston": { "Cobblestone": 4, "Redstone Dust": 1, "Iron Ingot": 1, "Wood Planks": 3, "Slimeball": 1 },
    "Piston": { "Cobblestone": 4, "Redstone Dust": 1, "Iron Ingot": 1, "Wood Planks": 3 },
    "TNT": { "Gunpowder": 5, "Sand": 4 },
    "Bookshelf": { "Wood Planks": 6, "Leather": 3, "Paper": 9 },
    "Anvil": { "Iron Ingot": 31 },
    "Chest": { "Wood Planks": 8 },
    "Hopper": { "Iron Ingot": 5, "Wood Planks": 8 }
};


var quantityInput = document.getElementById('item-qnt');
var searchInput = document.getElementById('item-search');
var outputSection = document.querySelector('.card');
var searchBtn = document.getElementById('search-btn');
var calcForm = document.getElementById('additem-form');
var itemSelect = document.getElementById('item-select');


function renderSelectOptions(filterText = '') {
    itemSelect.innerHTML = '';
    var searchFilter = filterText.toLowerCase().trim();

    for (var itemName in RECIPES) {
        if (itemName.toLowerCase().indexOf(searchFilter) !== -1) {
            var option = document.createElement('option');
            option.value = itemName;
            option.innerText = itemName;
            itemSelect.appendChild(option);
        }
    }


    if (itemSelect.options.length > 0) {
        itemSelect.selectedIndex = 0;
    }
}


function handleSearch() {
    renderSelectOptions(searchInput.value);
}

searchInput.addEventListener('input', handleSearch);
searchBtn.addEventListener('click', handleSearch);

// when they click calculate button
calcForm.addEventListener('submit', function (e) {
    e.preventDefault();

    var selectedItem = itemSelect.value;
    if (!selectedItem) {
        return;
    }

    var qty = parseInt(quantityInput.value, 10);
    if (isNaN(qty) || qty < 1) {
        qty = 1;
    }
    if (qty > 1024) {
        qty = 1024;
    }

    var materials = RECIPES[selectedItem];
    var oldGrid = outputSection.querySelector('.materials-grid');

    if (oldGrid) {
        oldGrid.remove();
    }

    var gridContainer = document.createElement('div');
    gridContainer.className = 'materials-grid';

    for (var materialName in materials) {
        var perItemCount = materials[materialName];

        var totalNeeded = perItemCount * qty;
        var fullStacks = Math.floor(totalNeeded / 64);
        var leftover = totalNeeded % 64;

        var stackText = '';
        if (fullStacks > 0) {
            stackText = fullStacks + "stk " + (leftover > 0 ? "+ " + leftover : "");
        } else {
            stackText = leftover + " items";
        }

        var card = document.createElement('div');
        card.className = 'material-card';
        card.innerHTML = '<div class="material-title">' + materialName + '</div>' +
            '<div class="material-counts">' +
            '<div class="material-total">x' + totalNeeded + '</div>' +
            '<div class="material-stacks">' + stackText + '</div>' +
            '</div>';
        gridContainer.appendChild(card);
    }

    outputSection.appendChild(gridContainer);
});


renderSelectOptions();
