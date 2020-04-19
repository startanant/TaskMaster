const TOKEN_KEY = 'email';

export const login = () => {
    localStorage.setItem(TOKEN_KEY, 'user@email.com');
}

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
}

export const isLogin = () => {
    if (localStorage.getItem(TOKEN_KEY)) {
        return true;
    }

    return false;
}