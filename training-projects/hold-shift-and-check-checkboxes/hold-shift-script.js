const items = document.querySelectorAll('.item');

let indexes = [];
let lastClicked = false;

items.forEach(item => {
   item.addEventListener('click', getIndex);
});

function getIndex(e) {
   // let clicked = Array.from(items).findIndex(item => item === this);
   // Equivalente al ejemplo de arriba
   // Spread syntax también equivalente
   // let clicked = [...items].indexOf(this);
   let clicked = Array.from(items).indexOf(this);

   // indexes.push(clicked);
   // console.log(lastClicked);

   if(e.shiftKey && lastClicked){
      let range = [clicked, lastClicked].sort();
      checkingBoxes( range );
   }else {
      lastClicked = clicked;
   }
}

function checkingBoxes(range){
   // if(indexes.length >= 2){
      // let sorted = indexes.sort((last, next) => last < next ? -1 : 1);

      items.forEach((item, index) => {
         if(index > range[0] && index < range[1]){
            item.classList.add('checked');
            item.children[0].checked = 1;
         }
      });
   // }
   // console.log(indexes, sorted);
}

// Antes en sort le mandaba esta fc
// function compare(last, next){
//    return last < next ? -1 : 1
// }

