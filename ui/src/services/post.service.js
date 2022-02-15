import authHeader from './auth-header';
import AuthService from "./auth.service";



const user = AuthService.getCurrentUser();

class PostService {

    getPosts() {
        return fetch(window.$apiURL + 'posts', { headers: { 'x-access-token': user } })
        .then(
            response => 
            response.json())
        .catch(err => {
            // Do something for an error here
            console.log("Error Reading data " + err);
            });;
    }
}

export default new PostService();