exports.newUser = functions.auth.user().onCreate((user) => {
    return db
        .collection("user")
        .doc(user.uid)
        .set({
            email: user.email,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        })
});