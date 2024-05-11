const Audit = require("../models/audit.model");
class AuditService {
  async saveAuditResponse(response, _id) {
    let successCode = response.statusText ? true : false;
    try {
      await Audit.findOneAndUpdate(
        { _id },
        {
          $set: {
            statusCode: response.statusCode,
            result: response.data,
            success: successCode,
          },
        },
        { upsert: true, new: true }
      );
    } catch (error) {
      console.log(error);
    }
    return;
  }
  async saveAuditRequest(request, response) {
    let logId;
    try {
      const auditLogRequest = new Audit({
        url: request.url,
        method: request.method,
        headers: request.headers,
        params: request.params,
        body: request.body,
      });
      const result = await auditLogRequest.save();
      logId = result._id;
    } catch (error) {
    }
    return logId;
  }
}

module.exports = new AuditService();
