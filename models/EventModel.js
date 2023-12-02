const {Schema, model} = require('mongoose');

const EventSchema = Schema({
  title: {
    type: String,
    required: true
  },
  notes: {
    type: String,
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  guestUsers: {
    type: Schema.Types.Array,
    ref: 'Users',
    required: false
  }
});

EventSchema.method('toJSON', function() {
  const {__v, _id, ...object} =  this.toObject();
  object.id = _id;
  return object;
});


module.exports = model('Events', EventSchema);
