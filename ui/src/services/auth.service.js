class AuthService {

    login(username, password) {

        return fetch(window.$apiURL + 'auth', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password})
        }).then(response => response.json());
    }

    logout() {
        sessionStorage.removeItem("user");
    }

    getCurrentUser() {
        return JSON.parse(sessionStorage.getItem('user'));;
    }

    setToken(userToken) {
        sessionStorage.setItem('user', JSON.stringify(userToken));
    }
}

export default new AuthService();