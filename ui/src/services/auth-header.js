import AuthService from "./auth.service";

export default function authHeader() {

    // read current jwt
    const user = AuthService.getCurrentUser();

    // if exists set header on request
    if (user) {
        return { 'x-access-token': user };
    } else {
        return {};
    }
}