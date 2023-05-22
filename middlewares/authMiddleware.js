const { getAuth } = require('firebase-admin/auth');

// Verication Token.
const appCheckVerification = async (req, res, next) => {
    const appAccessToken = req.header('x-access-token');
    // console.log("request token : ", appAccessToken);
    if (!appAccessToken) {
        res.status(401);
        return next('Unauthorized');
    }
    try {
        const decoded = await getAuth()
            .verifyIdToken(appAccessToken)
            .then((decodedToken) => {
                // console.log('decodedToken', decodedToken)
                return decodedToken;
            });
        // console.log('decoded', decoded);
        req.header['x-user-id'] = decoded.user_id;
        req.header['x-user-email'] = decoded.email;
        console.log("Authorization Sucessfully.");
        return next();
    } catch (err) {
        console.log('err', err)
        res.status(401);
        return next('Unauthorized..');
    }
}

module.exports = appCheckVerification;