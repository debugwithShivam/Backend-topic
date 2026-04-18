function customMiddleware(req,res,next){
    const {method,url,body,params,query} = req
    
    next()
}

module.exports = customMiddleware