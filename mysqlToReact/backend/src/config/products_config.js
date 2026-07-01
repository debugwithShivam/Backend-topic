import booksProduct from '../product/book/books.js'
import clouthingProduct from '../product/Clothing/clothing.js'
import electricalproduct from '../product/electricalItem/electrical.js'
import footwearProduct from '../product/Footwear/Footwear.js'
import kitchenProduct from '../product/KitchenItems/Kitchen.js'

let productConfig = [electricalproduct, clouthingProduct, footwearProduct, kitchenProduct, booksProduct]


const allProducts = productConfig.flat();
export default allProducts