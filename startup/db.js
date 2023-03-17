import mongoose from 'mongoose';

const initDb = async function () {
    mongoose.set('toJSON', {
        virtuals: true,
        transform: (doc, converted) => {
            converted.id = converted._id;
        }
    });


    try {
        const conn = await mongoose.connect("mongodb+srv://fubkeylabs:bTkF4HWxHBE4Ixq2@cluster0.uqwepef.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

export default initDb;
