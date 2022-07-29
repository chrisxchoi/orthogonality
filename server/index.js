const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const overview = require('./OverviewAPI.js');
const ratings = require('./RatingsAndReviewsAPI.js');
const relatedAPI = require('./RelatedItems.js');
const qa = require('./QuestionsAndAnswersAPI.js');
const {cloudinary} = require('./Cloudinary.js');

app.use(express.json({limit: '10mb'}));
app.use(express.static(path.join(__dirname, "../client/dist")));

// PRODUCTS
app.get('/products/', overview.listProducts);
app.get('/products/:product_id', overview.productInfo);
app.get('/products/:product_id/styles', overview.productStyles);
app.post('/cart', overview.postCart);
app.get('/cart', overview.getCart);

// REVIEWS
app.get('/reviews', ratings.listReviews)
app.get('/reviews/meta', ratings.getReviewMetadata)
app.post('/reviews', ratings.addReview)
app.put('/reviews/:review_id/helpful', ratings.markAsHelpful)
app.put('/reviews/:review_id/report', ratings.reportReview)

// QUESTIONS & ANSWERS
app.get('/qa/questions', qa.getQuestions);
app.get('/qa/questions/:question_id/answers', qa.getAnswers);
app.post('/qa/questions', qa.postQuestion);
app.post('/qa/questions/:question_id/answers', qa.postAnswer);
app.put('/qa/questions/:question_id/helpful', qa.markQuestionHelpful);
app.put('/qa/questions/:question_id/report', qa.reportQuestion);
app.put('/qa/answers/:answer_id/helpful', qa.markAnswerHelpful);
app.put('/qa/answers/:answer_id/report', qa.reportAnswer);

// CLOUDINARY
app.post('/api/upload', async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: 'ml_default'
    })
    res.send(uploadedResponse.url);
  } catch(error) {
    console.error(error);
  }
})

// RELATED ITEMS
app.get('/productsrelated', relatedAPI.getRelated);

app.listen(port);
console.log(`Server listening at http://localhost:${port}`);