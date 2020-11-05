const Country = require('./country.model');
const City = require('./city.model');
const User = require('./user.model');
const SubCategory = require('./subCategory.model');
const Category = require('./category.model');
const Product = require('./product.model');
const Media = require('./media.model');
const ProductDetails = require('./prodDetails.model');
const ProdMeasureType = require('./prodMeasureType.model');
const MeasureValue = require('./prodMeasureValue.model');
const Orders = require('./orders.model');
const Recipt = require('./recipts.model');
const Followers = require('./followers.model');
const Likes = require('./likes.model');
const Comment = require('./comment.model');
const ShippingAddress = require('./shippingAddres.model');
const DeliveryAddress = require('./deliveryAddres.model')
const PrivateMessage = require('./privateMessage.model');
const Transaction = require('./transaction.model')
const Favourite = require('./favourite.model');
const Cart = require('./cart.model');
const UsrCategory = require('./userCategory.model');
const ShipingDetails = require('./shippingDetails.model');


Country.hasMany(City, { foreignKey: 'id_country', onDelete: 'CASCADE' });
City.belongsTo(Country, { foreignKey: 'id_country' });

// Country.hasMany(User, { foreignKey: 'id_ctry', onDelete: 'CASCADE' });
// User.belongsTo(Country, { foreignKey: 'id_ctry' });

// City.hasMany(ShippingAddress, { foreignKey: 'city_id', onDelete: 'CASCADE' });
// ShippingAddress.belongsTo(City, { foreignKey: 'city_id' });

// User
User.hasMany(Product, { foreignKey: 'usr_id', onDelete: 'CASCADE' })
Product.belongsTo(User, { foreignKey: 'usr_id' })

User.hasMany(ShippingAddress, { foreignKey: 'usr_id', onDelete: 'CASCADE' })
ShippingAddress.belongsTo(User, { foreignKey: 'usr_id' })

// Followers
User.hasMany(Followers, { foreignKey: 'usr_id', onDelete: 'CASCADE' })
Followers.belongsTo(User, { foreignKey: 'usr_id' })

User.hasMany(Followers, { foreignKey: 'folower_usrID', onDelete: 'CASCADE' })
Followers.belongsTo(User, { foreignKey: 'folower_usrID' })

// Likes
User.hasMany(Likes, { foreignKey: 'usr_id', onDelete: 'CASCADE' })
Likes.belongsTo(User, { foreignKey: 'usr_id' })

Product.hasMany(Likes, { foreignKey: 'prod_id', onDelete: 'CASCADE' })
Likes.belongsTo(Product, { foreignKey: 'prod_id' })

// Comment
User.hasMany(Comment, { foreignKey: 'usr_id', onDelete: 'CASCADE' })
Comment.belongsTo(User, { foreignKey: 'usr_id' })

User.hasMany(Orders, { foreignKey: 'usr_id', onDelete: 'CASCADE' })
Orders.belongsTo(User, { foreignKey: 'usr_id' })

User.hasMany(Transaction, { foreignKey: 'usr_id', onDelete: 'CASCADE' })
Transaction.belongsTo(User, { foreignKey: 'usr_id' })

User.hasMany(Favourite, { foreignKey: 'usr_id', onDelete: 'CASCADE' })
Favourite.belongsTo(User, { foreignKey: 'usr_id' })

//PrivateMessages
User.hasMany(PrivateMessage, { foreignKey: 'usr_id', onDelete: 'CASCADE' })
PrivateMessage.belongsTo(User, { foreignKey: 'usr_id' })

User.hasMany(PrivateMessage, { foreignKey: 'msg_usrID', onDelete: 'CASCADE' })
PrivateMessage.belongsTo(User, { foreignKey: 'msg_usrID' })

UsrCategory.hasMany(User, { foreignKey: 'usr_catID' })
User.belongsTo(UsrCategory, { foreignKey: 'usr_catID' })


User.hasOne(Cart, { foreignKey: 'usr_id', onDelete: 'CASCADE' })
Cart.belongsTo(User, { foreignKey: 'usr_id' })

// Categories
Category.hasMany(SubCategory, { foreignKey: 'cat_id', onDelete: 'CASCADE' })
SubCategory.belongsTo(Category, { foreignKey: 'cat_id' })

SubCategory.hasMany(Product, { foreignKey: 'subCat_id', onDelete: 'CASCADE' })
Product.belongsTo(SubCategory, { foreignKey: 'subCat_id' })

// Product Association
Product.hasMany(Media, { foreignKey: 'prod_id', onDelete: 'CASCADE' })
Media.belongsTo(Product, { foreignKey: 'prod_id' })

Product.hasMany(Favourite, { foreignKey: 'prod_id', onDelete: 'CASCADE' })
Favourite.belongsTo(Product, { foreignKey: 'prod_id' })

Product.hasMany(Cart, { foreignKey: 'prod_id', onDelete: 'CASCADE' })
Cart.belongsTo(Product, { foreignKey: 'prod_id' })

Product.hasMany(ProductDetails, { foreignKey: 'prod_id', onDelete: 'CASCADE' })
ProductDetails.belongsTo(Product, { foreignKey: 'prod_id' })

ProductDetails.hasMany(MeasureValue, { foreignKey: 'prdetail_id', onDelete: 'CASCADE' })
MeasureValue.belongsTo(ProductDetails, { foreignKey: 'prdetail_id' })

Product.hasMany(ProdMeasureType, { foreignKey: 'prod_id', onDelete: 'CASCADE' })
ProdMeasureType.belongsTo(Product, { foreignKey: 'prod_id' })

// Shipping Address
Product.hasMany(ShippingAddress, { foreignKey: 'prod_id', onDelete: 'CASCADE' })
ShippingAddress.belongsTo(Product, { foreignKey: 'prod_id' })

Product.hasMany(Comment, { foreignKey: 'prod_id', onDelete: 'CASCADE' })
Comment.belongsTo(Product, { foreignKey: 'prod_id' })

// // Orders
Orders.hasMany(Transaction, { foreignKey: 'order_id', onDelete: 'CASCADE' })
Transaction.belongsTo(Orders, { foreignKey: 'order_id' })

Product.hasMany(Orders, { foreignKey: 'prod_id', onDelete: 'CASCADE' })
Orders.belongsTo(Product, { foreignKey: 'prod_id' })

ProductDetails.hasMany(Orders, { foreignKey: 'prdetail_id', onDelete: 'CASCADE' })
Orders.belongsTo(ProductDetails, { foreignKey: 'prdetail_id' })

DeliveryAddress.hasMany(Orders, { foreignKey: 'del_address', onDelete: 'CASCADE' })
Orders.belongsTo(DeliveryAddress, { foreignKey: 'del_address' })

// // Recipt
Orders.hasOne(Recipt, { foreignKey: 'ord_id', onDelete: 'CASCADE' })
Recipt.belongsTo(Orders, { foreignKey: 'ord_id', onDelete: 'CASCADE' })


User.hasMany(Recipt, { foreignKey: 'usr_id', onDelete: 'CASCADE' })
Recipt.belongsTo(User, { foreignKey: 'usr_id' })


module.exports = {
    Country,
    City,
    Cart,
    User,
    Category,
    SubCategory,
    Media,
    Product,
    ProdMeasureType,
    ProductDetails,
    MeasureValue,
    PrivateMessage,
    Likes,
    Followers,
    Orders,
    Comment,
    Recipt,
    ShippingAddress,
    DeliveryAddress,
    UsrCategory,
    ShipingDetails,
    Favourite,
    Recipt,
    Transaction
};
