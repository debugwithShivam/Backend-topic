export default function statusMessage(res,code,messageKey,message){
     res.status(code).json({ messageKey: message })
}