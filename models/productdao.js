const { DataSource } = require("typeorm");

const myDataSource = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
})

myDataSource.initialize()
.then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch(() => {
    console.log("failed to initialize!");
  });

// 베스트 상품 6
const getBestItems = async () => {
  return await myDataSource.query(
    `SELECT * FROM justmeat.products order by salesAmount desc LIMIT 6;`);
};

const getItemsByCategories = async (categoryId) => {
  return await myDataSource.query(
    `SELECT * FROM justmeat.products WHERE categoryId = ?;`
  , categoryId);
}

const getProductDetails = async (productId) => {
  return await myDataSource.query(
    `SELECT products.id, products.productName, products.price, products.weight, products.productImgMain, products.productOption, products.stock, products.salesAmount, products.isAntibioticFree, productImages.productImg1, productImages.productImg2, productImages.productImg3 FROM justmeat.products JOIN justmeat.productImages ON products.productImgById = productImages.id WHERE products.id = ?;`, productId
  )
}

const getProductReviewByProductId = async (productId) => {
  return await myDataSource.query(
    `SELECT review.id, review.productId, review.userId, users.name, review.title, review.content, review.createdAt, reviewImg FROM justmeat.review JOIN justmeat.users ON review.userId = users.id where productId = ?;`, productId)
}

const getSalesProductCount = async (productId)

const createProductReview = async (productId, userId, title, content, reviewImg) => {
  return await myDataSource.query(
    ``
  )
}

module.exports = {
  getBestItems,
  getItemsByCategories,
  getProductDetails,
  getProductReviewByProductId,
  createProductReview,
};