import { Buyproduct } from "../db/dataBase.js";
import config from "../config/config.js";
import jwt from 'jsonwebtoken'

function BuyProducts(req, res) {
  let {
    username,
    product_id,
    quantity,
    product_name,
    product_price,
    catogary,
    image,
    address_line2,
    city,
    state,
    payment_method,
    pin_code,
    email_Address,
    Phone_number
  } = req.body

  let tooken = req.cookies.accesstOKEN

  if (!tooken) {
    return res.status(401).json({ nessage: "Unauthorized" });
  }
  try {

    const decoded = jwt.verify(tooken, config.ACCESSTOKEN);
    const userId = decoded.id;

    let query = "INSERT INTO orderBuy (user_id,username,product_id,quantity,product_name,product_price,catogary,image,address_line2,city,state,payment_method,,pin_code,email_Address,Phone_number)VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"

    Buyproduct.query(query, [userId,username, product_id, quantity, product_name, product_price, catogary, image, address_line2, city, state, payment_method,  , pin_code, email_Address, Phone_number], (err, result) => {
      if (err) {
        console.log("MYSQL ERROR:", err);
        return res.status(500).json(err)
      };
      return res.status(201).json({
        message: "Order placed successfully"
      });
    })

  } catch (error) {
    if (
    error instanceof jwt.JsonWebTokenError ||
    error instanceof jwt.TokenExpiredError
  ) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }

  console.log(error);

  return res.status(500).json({
    message: "Server Error",
    error: error.message,
  });
}
}