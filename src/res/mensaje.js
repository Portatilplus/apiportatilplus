const success =(req, res, status=200, mensa="")=>{
    res.status(status).json({
        error:false,
        status:status,
        body:mensa
    });
};
const error =(req, res, status=500, mensa="")=>{
    res.status(status).json({
        error:true,
        status:status,
        body:mensa
    });
};


export default {success, error}