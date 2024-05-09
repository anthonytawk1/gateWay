const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const auditTrailSchema = new Schema(
  {
    microService: {
      type: String,
      required: false,
    },
    url: {
      type: String,
      required: false,
    },
    method: {
      type: String,
      required: false,
    },
    statusCode: {
      type: Number,
      required: false,
    },
    //!try to find some other type for the id
    userId: {
      type: String,
      required: false,
    },
    userAgent: {
      type: String,
      required: false,
    },
    result: {
      type: Object,
      required: false,
    },
    success: {
      type: Boolean,
      required: false,
    },
    headers: {
      type: Object,
      required: false,
    },
    params: {
      type: Object,
      required: false,
    },
    body: {
      type: Object,
      required: false,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Audit_Trail", auditTrailSchema);
