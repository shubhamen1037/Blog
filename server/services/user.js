const { v1: uuidV1 } = require('uuid');
const database = require('./../database');
const { user: UserModel } = database;
const Helper = require("../utils/helper")

const save = async (payload, authorization) => {
    const publicId = uuidV1(); 
    const {name, mobileNumber, email, password} = payload;
    await UserModel.create({public_id: publicId, name, mobile_number: mobileNumber, email, password})

    return {doc : {message: 'successfully saved', publicId}}
};

const update = async (payload, authorization) => {
    const {name, publicId} = payload;
    await UserModel.update({name},{where: {public_id: publicId}})

    return {doc : {message: 'successfully update', publicId}}
};

const getUserById = async (payload, authorization) => {
    const {publicId} = payload;
    const response = await UserModel.findOne({where :  {public_id: publicId}})

    if(response) {
        const user = Helper.convertSnakeToCamel(response.dataValues);

        return {doc : user}

    }

    return {doc : {}}

};

const getAllUsers = async () => {
    const response = await UserModel.findAll()

    if(response) {
        const {dataValues} = response;
        const userList = response.map(user => Helper.convertSnakeToCamel(user.dataValues));

        return {doc : userList}

    }

    return {doc : {}}

};

const deleteUserById = async (payload, authorization) => {
    const {publicId} = payload;
    await UserModel.destroy({where: {public_id: publicId}})

    return {doc : {message: 'successfully removed', publicId}}
};


module.exports = { save, update, getUserById, getAllUsers, deleteUserById };
