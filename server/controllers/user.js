const { User: UserService } = require('../services');

const save = async (req, res) => {
    try{
        const {body, headers: {authorization}} = req;
        const {doc} = await  UserService.save(body, authorization);
        
        if(doc) {
            const {message, publicId} = doc;
            res.setHeader("message", message);
            res.setHeader("publicId", publicId);
            return res.postRequest();
        }  
        
        res.setHeader("message", "Not registered");
        return res.notFound();
    } catch(err){
        return res.serverError(err);
    }  
};

const update = async (req, res) => {
    try{
        const {body, params: {publicId}, headers: {authorization}} = req;
        const data = {publicId, ...body};
        const {doc} = await  UserService.update(data, authorization);
        
        if(doc) {
            return res.postRequest(doc);
        }
        
        return res.notFound();
    }catch(err){
        return res.severError(err);
    }  
};


const getUserById = async (req, res) => {
    try{
        const { params: {publicId}, headers: {authorization}} = req;
        const data = {publicId};
        const {doc} = await  UserService.getUserById(data, authorization);
    
        if (doc) {
            return res.getRequest(doc);
        }
    
        return res.notFound();
    }catch(err){
        return res.severError(err);
    } 
};

const getAllUsers = async (req, res) => {
    try{
        const {query:{pageNumber, pageSize}, headers: {authorization}} = req;
        const data = {pageNumber, pageSize};
        const {doc} = await  UserService.getAllUsers(data, authorization);
    
        if (doc) {
            return res.getRequest(doc);
        }
    
        return res.notFound();
    }catch(err){
        return res.severError(err);
    } 
};

const deleteUserById = async (req, res) => {
    try{
        const {body, params: {publicId}, headers: {authorization}} = req;
        const data = {publicId, ...body};
        const {doc} = await  UserService.deleteUserById(data, authorization);
        
        if(doc) {
            return res.postRequest();
        }
        
        return res.notFound();
    }catch(err){
        return res.severError(err);
    } 
};
  

module.exports = { save, update, getUserById, getAllUsers, deleteUserById };
