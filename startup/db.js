import mongoose from 'mongoose';

const initDb = function() {
    mongoose.set('toJSON', {
        virtuals: true,
        transform: (doc, converted) => {
            converted.id = converted._id;
        }
    });

    mongoose.connect("mongodb+srv://fubkeylabs:bTkF4HWxHBE4Ixq2@cluster0.uqwepef.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

};

export default initDb;
