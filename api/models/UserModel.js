const mongooose = require('mongoose')

const UserSchema = mongooose.Schema({
    username:{
        type:String,
        required:true,
        min:4,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

const UserModel = mongooose.model('User',UserSchema);

module.exports = UserModel