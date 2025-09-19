import mongoose, { connect } from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONBODB_URI);
        console.log("DB connected successfully");
    } catch (error) {
        console.log(`DB connection faild: ${error.message}`)
        process.exit(1);
    }
}

export default connectDB;