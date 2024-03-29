const mongoose = require('mongoose');
const { Schema } = mongoose;
const moment = require('moment');

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => moment(timestamp).format('MMM DD, YYYY [at] hh:mm a') 
    }
}, {toJSON: {getters: true}, id: false});

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => moment(timestamp).format('MMM DD, YYYY [at] hh:mm a') 
    },
    username: {
        type: String,
        required: true
    },
    userId: { 
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User' 
    }, 
    reactions: [reactionSchema] 
}, { toJSON: { virtuals: true }, id: false });

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = mongoose.model('Thought', thoughtSchema); 
module.exports = Thought;
