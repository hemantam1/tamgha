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
const State = require('./governorate.model');


Country.hasMany(State, { foreignKey: 'country_id', onDelete: 'CASCADE' });
State.belongsTo(Country, { foreignKey: 'country_id' });

Country.hasMany(User, { foreignKey: 'country_id', onDelete: 'CASCADE' });
User.belongsTo(Country, { foreignKey: 'country_id' });

State.hasMany(City, { foreignKey: 'state_id', onDelete: 'CASCADE' });
City.belongsTo(State, { foreignKey: 'state_id' });

Country.hasMany(User, { foreignKey: 'country_id', onDelete: 'CASCADE' });
User.belongsTo(Country, { foreignKey: 'country_id' });

City.hasMany(ShippingAddress, { foreignKey: 'city_id', onDelete: 'CASCADE' });
ShippingAddress.belongsTo(City, { foreignKey: 'city_id' });

City.hasMany(DeliveryAddress, { foreignKey: 'city_id', onDelete: 'CASCADE' });
DeliveryAddress.belongsTo(City, { foreignKey: 'city_id' });

// User
User.hasMany(Product, { foreignKey: 'user_id', onDelete: 'CASCADE' })
Product.belongsTo(User, { foreignKey: 'user_id' })

User.hasMany(Media, { foreignKey: 'user_id', onDelete: 'CASCADE' })
Media.belongsTo(User, { foreignKey: 'user_id' })

User.hasMany(ShippingAddress, { foreignKey: 'user_id', onDelete: 'CASCADE' })
ShippingAddress.belongsTo(User, { foreignKey: 'user_id' })

User.hasMany(DeliveryAddress, { foreignKey: 'user_id', onDelete: 'CASCADE' })
DeliveryAddress.belongsTo(User, { foreignKey: 'user_id' })

// Followers
User.hasMany(Followers, { foreignKey: 'user_id', onDelete: 'CASCADE' })
Followers.belongsTo(User, { foreignKey: 'user_id' })

User.hasMany(Followers, { foreignKey: 'follower_user_id', onDelete: 'CASCADE' })
Followers.belongsTo(User, { foreignKey: 'follower_user_id' })

// Likes
User.hasMany(Likes, { foreignKey: 'user_id', onDelete: 'CASCADE' })
Likes.belongsTo(User, { foreignKey: 'user_id' })

Product.hasMany(Likes, { foreignKey: 'product_id', onDelete: 'CASCADE' })
Likes.belongsTo(Product, { foreignKey: 'product_id' })

// Comment
User.hasMany(Comment, { foreignKey: 'user_id', onDelete: 'CASCADE' })
Comment.belongsTo(User, { foreignKey: 'user_id' })

User.hasMany(Orders, { foreignKey: 'user_id', onDelete: 'CASCADE' })
Orders.belongsTo(User, { foreignKey: 'user_id' })

User.hasMany(Transaction, { foreignKey: 'user_id', onDelete: 'CASCADE' })
Transaction.belongsTo(User, { foreignKey: 'user_id' })

User.hasMany(Favourite, { foreignKey: 'user_id', onDelete: 'CASCADE' })
Favourite.belongsTo(User, { foreignKey: 'user_id' })

//PrivateMessages
User.hasMany(PrivateMessage, { foreignKey: 'user_id', onDelete: 'CASCADE' })
PrivateMessage.belongsTo(User, { foreignKey: 'user_id' })

User.hasMany(PrivateMessage, { foreignKey: 'to_user_id', onDelete: 'CASCADE' })
PrivateMessage.belongsTo(User, { foreignKey: 'to_user_id' })

UsrCategory.hasMany(User, { foreignKey: 'user_category_id' })
User.belongsTo(UsrCategory, { foreignKey: 'user_category_id' })


User.hasOne(Cart, { foreignKey: 'user_id', onDelete: 'CASCADE' })
Cart.belongsTo(User, { foreignKey: 'user_id' })

// Categories
Category.hasMany(SubCategory, { foreignKey: 'category_id', onDelete: 'CASCADE' })
SubCategory.belongsTo(Category, { foreignKey: 'category_id' })

SubCategory.hasMany(Product, { foreignKey: 'subCategory_id', onDelete: 'CASCADE' })
Product.belongsTo(SubCategory, { foreignKey: 'subCategory_id' })

// Product Association
Product.hasMany(Media, { foreignKey: 'product_id', onDelete: 'CASCADE' })
Media.belongsTo(Product, { foreignKey: 'product_id' })

Product.hasMany(Favourite, { foreignKey: 'product_id', onDelete: 'CASCADE' })
Favourite.belongsTo(Product, { foreignKey: 'product_id' })

Product.hasMany(Cart, { foreignKey: 'product_id', onDelete: 'CASCADE' })
Cart.belongsTo(Product, { foreignKey: 'product_id' })

Product.hasMany(ProductDetails, { foreignKey: 'product_id', onDelete: 'CASCADE' })
ProductDetails.belongsTo(Product, { foreignKey: 'product_id' })

ProductDetails.hasMany(MeasureValue, { foreignKey: 'productDetail_id', onDelete: 'CASCADE' })
MeasureValue.belongsTo(ProductDetails, { foreignKey: 'productDetail_id' })

Product.hasMany(ProdMeasureType, { foreignKey: 'product_id', onDelete: 'CASCADE' })
ProdMeasureType.belongsTo(Product, { foreignKey: 'product_id' })

// Shipping Address
Product.hasMany(ShippingAddress, { foreignKey: 'product_id', onDelete: 'CASCADE' })
ShippingAddress.belongsTo(Product, { foreignKey: 'product_id' })

Product.hasMany(Comment, { foreignKey: 'product_id', onDelete: 'CASCADE' })
Comment.belongsTo(Product, { foreignKey: 'product_id' })

// // Orders
Orders.hasMany(Transaction, { foreignKey: 'order_id', onDelete: 'CASCADE' })
Transaction.belongsTo(Orders, { foreignKey: 'order_id' })

Product.hasMany(Orders, { foreignKey: 'product_id', onDelete: 'CASCADE' })
Orders.belongsTo(Product, { foreignKey: 'product_id' })

ProductDetails.hasMany(Orders, { foreignKey: 'productDetail_id', onDelete: 'CASCADE' })
Orders.belongsTo(ProductDetails, { foreignKey: 'productDetail_id' })

DeliveryAddress.hasMany(Orders, { foreignKey: 'address_id', onDelete: 'CASCADE' })
Orders.belongsTo(DeliveryAddress, { foreignKey: 'address_id' })

// // Recipt
Orders.hasOne(Recipt, { foreignKey: 'order_id', onDelete: 'CASCADE' })
Recipt.belongsTo(Orders, { foreignKey: 'order_id', onDelete: 'CASCADE' })


User.hasMany(Recipt, { foreignKey: 'buyer_user_id', onDelete: 'CASCADE' })
Recipt.belongsTo(User, { foreignKey: 'buyer_user_id' })


User.hasMany(Recipt, { foreignKey: 'seller_user_id', onDelete: 'CASCADE' })
Recipt.belongsTo(User, { foreignKey: 'seller_user_id' })

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
