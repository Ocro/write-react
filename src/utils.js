import { AUTH_TOKEN } from './constants';

export function isUserLogged() {
    return localStorage.getItem(AUTH_TOKEN) != null
}
