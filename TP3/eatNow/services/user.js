const user = { 
    idUser: "",
    name: "",
    email: "",
    city: "",
    cuisineStyles: ""
}

module.exports = user;

module.exports.registarUser = userAux => {
    user.idUser = userAux._id;
    user.name = userAux.name;
    user.email = userAux.email;
    user.city = userAux.city;
    user.cuisineStyles = userAux.cuisineStyles;
}

module.exports.apagarUser = () => {
    user.idUser = "";
    user.name = "";
    user.email = "";
    user.city = "";
    user.cuisineStyles = ""
}