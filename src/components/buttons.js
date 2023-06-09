import { path, workData } from './api';

// ######################
// Button Like Function
// ######################

export async function likeCard(evt) {
  const card = evt.target.closest('.element__wrapper');
  const method = evt.target.classList.toggle('element__button-like_active') ? 'put': 'delete';

  const cardObject = await workData(`${path.likes}/${card.id}`, method);

  card.querySelector('.element__likes-counter').textContent = cardObject.likes.length>0 ? cardObject.likes.length : "";
}

// ######################
// Button Del Function
// ######################

export function delCard(evt) {
  if (evt.target.closest('.element__wrapper').querySelector('.element__button-like_active')) {
    if (confirm('Вы удаляете любимую фотографию?')){
      evt.target.closest('.element__wrapper').remove();
    }
  }
  else {
    evt.target.closest('.element__wrapper').remove();
  }

  workData(`${path.cards}/${evt.target.closest('.element__wrapper').id}`, 'delete');
}
