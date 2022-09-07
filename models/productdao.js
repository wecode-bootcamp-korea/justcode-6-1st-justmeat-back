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
    `SELECT products.id, products.productName, products.price, products.weight, products.productImgMain, products.productOption, products.stock, products.salesAmount, products.isAntibioticFree, productImages.productImg1, productImages.productImg2, productImages.productImg3 FROM justmeat.products JOIN justmeat.productImages ON products.productImgById = productImages.id WHERE products.id = ?;`, [productId]
  )
}

const getProductReviewByProductId = async (productId) => {
  return await myDataSource.query(
    `SELECT * FROM
    (SELECT review.id, review.productId, review.userId, users.name, review.title, review.content, review.createdAt, review.reviewImg 
    FROM justmeat.review JOIN justmeat.users ON review.userId = users.id) 
    as review INNER JOIN 
    (SELECT userId, JSON_ARRAYAGG(
    JSON_OBJECT(
    "userId", userId, "productId", productId, "productName", productName, "productAmount", productAmount 
    )) as purchaseRecord FROM sales JOIN products ON products.id = sales.productId GROUP BY userId) as sales ON review.userId = sales.userId where productId = ?;`, productId)
  }


const createProductReview = async (productId, userId, title, content, reviewImg) => {
  return await myDataSource.query(
    `INSERT INTO (productId, userId, title, content, reviewImg) VALUES 
    (?, ?, ?, ?);`, [productId, userId, title, content, reviewImg]
  )
}

module.exports = {
  getBestItems,
  getItemsByCategories,
  getProductDetails,
  getProductReviewByProductId,
  createProductReview,
};