// Importing necessary modules and packages
const express = require("express");
const app = express();
const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const courseRoutes = require("./routes/Course");
const paymentRoutes = require("./routes/Payments");
const contactUsRoute = require("./routes/Contact");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
// const stripe=require("stripe")("sk_test_51Ole64SGGgnf8HfeKJ7U2zK51kPtStoV3gRZTIKQIWux1QUujuTe633WB4IUFOp6QuYoX7B8sPsp6kfNGbQ5yBL300CPWrraqI")

// Setting up port number
const PORT = process.env.PORT || 8000;

// Loading environment variables from .env file
dotenv.config();

// Connecting to database
database.connect();
 
// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);
app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "/tmp/",
	})
);

// Connecting to cloudinary
cloudinaryConnect();

// Setting up routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

// Testing the server
app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Your server is up and running ...",
	});
});

// checkout api
// app.post("/api/v1/create-checkout-session",async(req,res)=>{
// 	const {products}=req.body;
// 	console.log(products)

// 	const lineItems=products.map((product)=>({
// 		price_data:{
// 			currency:"usd",
// 			product_data:{
// 				name:product.courseName
// 			},
// 			unit_amount:product.price*100,
// 		},
// 		quantity:1
// 	}))

// 	const session=await stripe.checkout.sessions.create({
// 		mode:"payment",
// 		payment_method_types:["card"],
// 		line_items:lineItems,
// 		success_url:"http://localhost:3000/dashboard/enrolled-courses",
// 		cancel_url:"http://localhost:3000/"
// 	})

// 	res.json({id:session.id})
// })



// Listening to the server
app.listen(PORT, () => {
	console.log(`App is listening at ${PORT}`);
});

// End of code.
