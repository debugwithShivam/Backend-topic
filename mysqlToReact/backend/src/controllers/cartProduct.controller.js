import { productOrder } from "../db/dataBase.js"
import config from "../config/config.js"
import jwt from 'jsonwebtoken'

function cartProduct(req, res) {
    const { user_id, product_id, quantity, product_name, product_price, total_price, image,category } = req.body

    let tooken = req.cookies.accesstOKEN
  

    if (!tooken) {
        return res.status(402).json({ nessage: "Unauthorizes" });
    }
    try {
        const decoded = jwt.verify(tooken, config.ACCESSTOKEN);
        const userId = decoded.id;
        const query = "INSERT INTO CartOrders(user_id,product_id,quantity,product_name,product_price,image,category)VALUES (?,?,?,?,?,?,?)"
        console.log(decoded)
        productOrder.query(query, [userId, product_id, quantity, product_name, product_price, image,category], (err, result) => {
            console.log("inside callback");
            if (err) {
                console.log("MYSQL ERROR:", err);
                return res.status(500).json(err)
            };
            return res.status(201).json({
                message: "Account created", data: result
            });
        })

    } catch (error) {
         console.log(error);
        res.status(401).json({ message: "Reques is Faild besauce of ", error })
    }
}

export default cartProduct