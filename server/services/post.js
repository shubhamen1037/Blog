const { v1: uuidV1 } = require('uuid');
const database = require('./../database');
const { post: PostModel } = database;
const { user: UserModel } = database;
const Helper = require("../utils/helper");


const save = async(payload)=>{
    const publicId  = uuidV1(); 
    const { userId, title, content, imageUrl } = payload;
    const response = await UserModel.findOne({where: {public_id: userId}});

    if(response){
        const {dataValues: {id}} = response;
        await PostModel.create({public_id: publicId, user_id: id, title, content, image_url: imageUrl});
    
        return {doc: {message: "Successfuly saved"}}
    }
    return {doc: {message: "data not avialable"}}

};

const getPostById = async(payload, authorization)=>{
    const {publicId} = payload;
    const response = await PostModel.findOne({
        where: {public_id: publicId},
        attributes: ["title", "content", "image_url"],   
        include: [{
            model: UserModel,
            attributes: ["name"], 
         }]
    });

    if(response){
        const {dataValues} = response;
        const post = Helper.convertSnakeToCamel(dataValues)
        return {doc: post}
    }
    return {doc: {}}

};

const getList = async()=>{
    const response = await PostModel.findAll({
        attributes: ["title", "content", "image_url", "public_id", "created_at"],
        include: [{
            model: UserModel,
            attributes: ["name"] 
        }]        
    });

    if(response){
        const postList = response.map(post => Helper.convertSnakeToCamel(post.dataValues))
        return {doc: postList}
    }    
    return {doc: {}}

};

const remove = async(payload)=>{
    const {userId, publicId} = payload;
    const response = UserModel.findOne({where: {public_id: userId}});

    if(response){
        await PostModel.destroy({where: {public_id: publicId}});
        return {doc: {message: "successfuly removed", publicId}}
    }
    return {doc: {message: "You are unauthorised person"}}
};

module.exports = { save, getPostById, getList, remove };
