export const errorHandler = (statusCode,message)=>{  //this error is created by us this is no internal server error this is basically when usen `s data is not correct and data is short(like password)
    const error=new Error();
    error.statusCode=statusCode;
    error.message=message;
    return error;
};