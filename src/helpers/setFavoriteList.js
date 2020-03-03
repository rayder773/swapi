import db from "./db";
import {setFavoriteList} from '../store/actions/favoriteList';

export default function setFavorite() {
  db.on('value', (snapshot) => {
    setFavoriteList(snapshot.val());
  });
}
