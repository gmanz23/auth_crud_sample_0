import AuthService from "./auth.service";

const user = AuthService.getCurrentUser();

class PostService {

    getPosts() {
        return fetch(window.$apiURL + 'posts', { headers: { 'x-access-token': user } })
        .then(
            response => 
            response.json())
        .catch(err => {
            console.log("Error reading posts: " + err);
        });
    }

    likePost(id) {

        return fetch(window.$apiURL + 'posts/like', 
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'x-access-token': user },
            body: JSON.stringify({id})
        })
        .then(
            response => 
            response.json())
        .catch(err => {
            console.log("Error liking post: " + err);
        });
    }
}

export default new PostService();