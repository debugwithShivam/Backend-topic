import { productOrder } from "../db/dataBase.js";

function getCartProductdata(req, res) {
    try {
        const query = "SELECT * FROM CartOrders";

        productOrder.query(query, (err, result) => {
            if (err) {
                console.log("MYSQL ERROR:", err);
                return res.status(500).json({ error: err });
            }

            return res.status(200).json({ data: result });
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Request Failed",
            error
        });
    }
}

export default getCartProductdata;