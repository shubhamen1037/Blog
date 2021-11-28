const {Post: PostService} = require('../services');
const  Helper = require('../utils/helper');

const save = async(req, res)=>{
    try{
        const { body, user:{userId} } = req;
        const data = {userId, ...body};
        const { doc } = await PostService.save(data);
    
        if(doc){
            const {message} = doc;
            res.setHeader("message", message);
            return res.postRequest();
        }       
        res.setHeader("message", "Not saved")
        return res.notFound();

    }catch(err){
        return res.serverError(err);
    } 
};

const getPostById = async(req, res)=>{
    try{
        const {params:{publicId}} = req;
        const data = {publicId}
        const { doc } = await PostService.getPostById(data);
    
        if(doc){
            res.getRequest(doc);
        }
        res.notFound();

    }catch(err){
        return res.severError(err);
    }
};

const getList = async(req, res)=>{
    // const {query:{pageNumber, pageSize}} = req;
    // const data = {pageNumber, pageSize};
    try{
        const { doc } = await PostService.getList();
    
        if(doc){
            res.getRequest(doc);
        }
        res.notFound();
    }catch(err){
        return res.severError(err);
    }
};

const remove = async(req, res)=>{
    try{
        const { user:{userId}, params:{publicId} } = req;
        const data = {userId, publicId};
        const { doc } = await PostService.remove(data);
    
        if(doc){
            res.postRequest(doc);
        }
        res.postRequest({message: "Not deleted"})
    }catch(err){
        return res.severError(err);
    }
};



module.exports = { save, getPostById, getList, remove };