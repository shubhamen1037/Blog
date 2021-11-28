const { Login: LoginService } = require('../services');

const login = async(req, res) =>{
    try{
        const { body } = req;
        const {doc} = await LoginService.login(body);
        
        if(doc) {
            const {token, message} = doc;
            if(message){
                res.setHeader("message", message);
                return res.postRequest();
            }
            res.setHeader("token", token);
            return res.postRequest();
        }   
        res.setHeader("message", "Login failed");
        return res.notFound();

    }catch(err){
        return res.serverError(err);
    }
}

module.exports = { login };