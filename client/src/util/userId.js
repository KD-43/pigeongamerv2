import { v4 as uuidv4 } from '../../node_modules/uuid';

export function getOrCreateUserId() {
  let id = localStorage.getItem('anonUserId');
  if (!id) {
    id = uuidv4();
    localStorage.setItem('anonUserId', id);
  }
  return id;
}
