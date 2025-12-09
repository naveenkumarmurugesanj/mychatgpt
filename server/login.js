const userLogin = async (req, res) => {
    let email = req.body.email
    let password = req.body.password
    let response = { userEmail: email, password }
    console.log(response);
    let resFormat = { code: 200, status: "success", response }
    return resFormat;
}

module.exports = { userLogin };