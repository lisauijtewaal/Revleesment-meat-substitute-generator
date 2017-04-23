import './sass/style.scss';

function print_results() {
  fetch('menu-nieuw.json').then(response=> {
    return response.json();
  }).then(data => {
    const replacements = data.meat_replacements.filter(filter_meat).sort(sort_by_rate);
    const dishes = data.recipes.filter(filter_dish);
    print_replacements(replacements);
    print_dishes(dishes);
  });
}

function print_replacements(replacements = []) {
  const topReplacement = replacements[0];
  const restTop = replacements.slice(1, 2);

  const formattedTopReplacement =
      (`<div class="card">` +
      `<div class="left">` +
      `<img src="${topReplacement.image}">` +
      `<h1>${topReplacement.name}</h1>` +
      `<div class="bar">` +
      `<h4>Producent: ${topReplacement.maker}</h4>` +
      `</div>` +
      `</div>` +
      `<div class="right">` +
          `<div class="text">` +
          `<h5>${topReplacement.percent} van de dagelijkse hoveelheid vitamine B12</h5>`+
          `<h4>VOEDINGSWAARDE</h4>` +
          `<p>${topReplacement.vitamines.join("</br> ")}</p>` +
          //`<img class="heart" src= "img/heart.png" ` +
          //`<div class ="rate">` +
          //`<h4 >${topReplacement.rate}</h4>` +
          //`</div>` +
          `</div>` +
          `<div class="bar">` +
              `<h4>Wat je misschien ook lekker vindt</h4>` +
                  `</div>`


      );


  const replacementInfo =
      (

      `</div>`);

  const formattedReplacements = restTop.map(format_meat_card);
  document.querySelector('#meat-container').innerHTML = [formattedTopReplacement, ...formattedReplacements, replacementInfo].join('');
}

function format_meat_card(item) {
  return (
  `<div class="otherproducts">` +
  `<div class="otherproducts-left">` +
  `<img class="secondimage" src="${item.image}">` +
  `</div>` +
  `<div class="otherproducts-right">` +
  `<p class="main">${item.name}</p>` +
  `<p>${item.maker}</p>` +
  `</div>` +
  `</div>`);
}

function print_dishes(dishes = []) {
  const formattedDishes = dishes.map(format_card).join('');
  document.querySelector('#dishes-container').innerHTML = formattedDishes;
}

function format_card(item) {
  return (
      `<div class="card-dish">` +
      `<div class="front">` +
      `<img src="${item.image}">` +
      `<div class ="bar">` +
      `<h4>${item.course}</h4>` +
      `</div>` +
      `<h3>${item.name}</h3>` +
      `</div>` +
      `<div class="back">` +
      `<div class="bar">` +
      `<p>Ingredients</p>` +
      `</div>` +
      `<p>${item.ingredients.join(" - ")}</p>` +
      `<div class ="bar">` +
      `</div>` +
      `</div>` +
      `</div>`
  )
}

let refresh_switch = true;

const available_filters = {
  "meal_type": [
    {
      "id": "1",
      "label": "Voorgerecht",
      "key": "pre-course",
      "classes": "",
      "type": "meal_type"
    },
    {
      "id": "2",
      "label": "Hoofdgerecht",
      "key": "main_course",
      "classes": "",
      "type": "meal_type"
    },
    {
      "id": "3",
      "label": "Nagerecht",
      "key": "dessert",
      "classes": "",
      "type": "meal_type"
    }
  ],
  "made_without": [
    {
      "id": "4",
      "label": "Gluten",
      "key": "gluten",
      "classes": "",
      "type": "made_without"
    },
    {
      "id": "5",
      "label": "Noten",
      "key": "noten",
      "classes": "",
      "type": "made_without"
    },
    {
      "id": "6",
      "label": "Zuivel",
      "key": "zuivel",
      "classes": "",
      "type": "made_without"
    }
  ],
  "dish_info": [
    {
      "id": "7",
      "label": "Italiaans",
      "key": "italiaans",
      "classes": "",
      "type": "dish_info"
    },
    {
      "id": "8",
      "label": "Aziatisch",
      "key": "aziatisch",
      "classes": "",
      "type": "dish_info"
    },
    {
      "id": "9",
      "label": "Hollands",
      "key": "hollands",
      "classes": "",
      "type": "dish_info"
    }

  ],
  "meat_info": [
    {
      "id": "7",
      "label": "Varken",
      "key": "varken",
      "classes": "",
      "type": "meat_info"
    },
    {
      "id": "8",
      "label": "Kip",
      "key": "kip",
      "classes": "",
      "type": "meat_info"
    },
    {
      "id": "9",
      "label": "Rund",
      "key": "rund",
      "classes": "",
      "type": "meat_info"
    },
    {
      "id": "11",
      "label": "Geen vlees",
      "key": "geen-vlees",
      "classes": "",
      "type": "meat_info"
    }

  ]
};

let active_filters = [];

document.addEventListener('DOMContentLoaded', init);

function init() {
  document.querySelector('#filters-container').addEventListener('click', toggle_filter);
  document.querySelector('#show-inner-filters').addEventListener('click', toggle_inner_filters);
  document.querySelector('#meat-container').addEventListener('click', flip_card);

  print_filters();
}

function toggleColor() {
  document.getElementById("button").classList.toggle("active");
  document.getElementById("button").classList.toggle("button");
}

function print_filters() {
  const container = document.querySelector('#filters-container');
  const inner_filters = container.querySelector('#inner-filters');
  const meal_type_filters = available_filters.meal_type.map(format_filter_button);
  const dish_info_filters = available_filters.dish_info.map(format_filter_button);
  const meat_info_filters = available_filters.meat_info.map(format_filter_button);
  const made_without_filters = available_filters.made_without.map(format_filter_button);
  inner_filters.insertAdjacentHTML('beforebegin', `<ul class="filters-container" id="meal-type-filters">${meal_type_filters.join('')}</ul>`);
  inner_filters.insertAdjacentHTML('beforebegin', `<h2 class="filter-heading">Stap 2: Kies de basis van het gerecht</h2><ul class="filters-container" id="dish-info-filters">${dish_info_filters.join('')}</ul>`);
  inner_filters.insertAdjacentHTML('beforebegin', `<h2 class="filter-heading">Stap 3: Voor welk(e) vlees of vis zoek je vervanging?</h2><ul class="filters-container" id="dish-info-filters">${meat_info_filters.join('')}</ul>`);
  inner_filters.insertAdjacentHTML('beforebegin', `<h2 class="filter-heading">Stap 4: Heb je nog allergieen?</h2><ul class="filters-container" id="made-without-filters">${made_without_filters.join('')}</ul>`);
  init_active_filters();
}

function toggle_inner_filters(e) {
  const button = get_parent_by_class('button', e.target);
  if (button) {
    button.classList.toggle('inner-filters-visible');
    button.classList.toggle('active');
    print_results();
  }
}

function flip_card(e) {
  const card = get_parent_by_class('card', e.target);
  if (card) {
    console.log('hallo');
    card.classList.toggle('flip');
  }
}

function init_active_filters() {
  active_filters = Array.prototype.slice.call(document.querySelectorAll('.filter.active')).map(get_active_filter_object);
}

function format_filter_button(filter) {
  return (
      `<li class="filter-wrapper">` +
      `<button class="button filter filter-button ${filter.classes}" data-key="${filter.key}" data-value="${filter.value ? filter.value : ''}" data-filter="${filter.type}" data-id="${filter.id}">${filter.label}</button>` +
      `</li>`
  );
}

function toggle_filter(e) {
  const filter = get_parent_by_class('filter', e.target);
  if (filter) {
    if (filter.classList.contains('active')) {
      active_filters = active_filters.filter(active_filter => {
        return active_filter.id != filter.getAttribute('data-id');
      });
    } else {
      active_filters.push(get_active_filter_object(filter));
    }
    filter.classList.toggle('active');
  }
}

function get_active_filter_object(filter) {
  return {
    "id": filter.getAttribute('data-id'),
    "type": filter.getAttribute('data-filter'),
    "value": filter.getAttribute('data-value'),
    "key": filter.getAttribute('data-key')
  }
}

function filter_dish(item) {
  let keep_dish = true;
  let break_loop = false;
  active_filters.forEach(active_filter => {
    if (break_loop) return;
    switch (active_filter.type) {
      case 'meal_type':
        keep_dish = keep_dish && item.meal_type == active_filter.key;
        break;
      case 'made_without':
        item.allergens.forEach(allergen => {
          if (keep_dish && allergen.key == active_filter.key) {
            keep_dish = false;
            break_loop = true;
          }
        });
        break;
      case 'dish_info':
        keep_dish = keep_dish &&item.dish_info == active_filter.key;
        break;
      case 'meat_info':
        keep_dish = keep_dish && item.meat_info == active_filter.key;
        break;
    }
  });
  return keep_dish;
}

function sort_by_rate(prev, cur) {
  return cur.rate - prev.rate;
}


function filter_meat(item) {
  let keep_dish = true;
  let break_loop = false;
  active_filters.forEach(active_filter => {
    if (break_loop) return;
    switch (active_filter.type) {
      case 'made_without':
        item.allergens.forEach(allergen => {
          if (allergen.key == active_filter.key) {
            keep_dish = false;
            break_loop = true;
          }
        });
        break;
      case 'meat_info':
        keep_dish = item.replaces == active_filter.key;
        break;
    }
  });
  return keep_dish;
}

function get_parent_by_class(parentClass, child) {
  var node = child;
  while (node != null) {
    if (node.className && node.classList.contains(parentClass)) {
      return node;
    }
    node = node.parentNode;
  }
  return false;
}

