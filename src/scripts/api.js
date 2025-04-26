const config = {
  baseUrl: "https://nomoreparties.co/v1/cohort-mag-4",
  headers: {
    authorization: "a04fa260-ab88-4eba-a3db-69c50bc6267c",
    "Content-Type": "application/json",
  },
};

export function fetchProfileInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: { authorization: config.headers.authorization },
  }).then(validateFetch);
}

export function patchProfileInfo(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then(validateFetch);
}

export function patchProfileImage(url) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: url,
    }),
  }).then(validateFetch);
}

export function fetchInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: { authorization: config.headers.authorization },
  }).then(validateFetch);
}

export function postAddCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then(validateFetch);
}

export function deleteCard(id) {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: { authorization: config.headers.authorization },
  }).then(validateFetch);
}

export function putLikeCard(id) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "PUT",
    headers: { authorization: config.headers.authorization },
  }).then(validateFetch);
}

export function deleteLikeCard(id) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "DELETE",
    headers: { authorization: config.headers.authorization },
  }).then(validateFetch);
}

function validateFetch(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}
