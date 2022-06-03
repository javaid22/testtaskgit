const btn = document.getElementById('toggle-menu');

btn.addEventListener('click', function onClick(event) {
  document.body.classList.add('menu-active');
});
const btn2 = document.getElementById('cross-icon');

btn2.addEventListener('click', function onClick(event) {
  document.body.classList.remove('menu-active');
});




const accSingleTriggers = document.querySelectorAll('.js-acc-single-trigger');

accSingleTriggers.forEach(trigger => trigger.addEventListener('click', toggleAccordion));

function toggleAccordion() {
  const items = document.querySelectorAll('.js-acc-item');
  const thisItem = this.parentNode;

  items.forEach(item => {
    if (thisItem == item) {
      thisItem.classList.toggle('is-open');
      return;
    }
    item.classList.remove('is-open');
  });
}