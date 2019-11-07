export default (err, req, res, next) => {
    if (err) {
        console.log(err);
        res
            .status(err.response ? err.response.status : 500)
            .send({message: err.response ? err.response.data : "Internal Server Error"});
    } else{
        next();
    }
}