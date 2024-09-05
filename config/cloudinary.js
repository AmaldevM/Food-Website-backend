const { v2 } = require("cloudinary")

v2.config({
    cloud_name: dxoawvjqt,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const cloudinaryInstance = v2

module.exports={cloudinaryInstance}