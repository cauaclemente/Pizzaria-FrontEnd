export class AuthTokenError extends Error{
    constructor(){
        super("Error no token de authenticação")
    }
}