import mongoose, { Model } from 'mongoose';

const logSchema = new mongoose.Schema(
  {
    method: {
      type: String,
      required: [true, 'Log method must have a Method !'],
    },
    route: {
      type: String,
      required: [true, 'Log route must have a route !'],
    },
    query: String,
    params: String,
    status: {
      type: Number,
      required: [true, 'Log status must have a status !'],
    },
    message: {
      type: String,
      required: [true, 'Log message must have a message !'],
    },
    ip: {
      type: String,
      required: [true, 'Log ip must have a ip !'],
    },
    clientAgent: {
      type: String,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    contentLength: Number,
    responseTime: String,
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: false,
    },
    // toJSON: { virtuals: true },
    // toObject: { virtuals: true },
  },
);

logSchema.pre(/^find/, function (this: mongoose.Query<any, any>, next) {
  this.populate({
    path: 'user',
    select:
      '-created_at -updated_at -__v -passwordChangedAt -passwordResetToken -passwordResetExpires -address',
  });
  next();
});

const Logger = mongoose.model('Log', logSchema);

export default Logger;
