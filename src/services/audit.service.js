// timestamp: date of the API call,
//! o microservice: name of the microservice that the call is going to,
//! o url: url of the request,
//! o method: method of the request,
//? o statusCode: the status code of the request for example 200 for success,
//? o userId: The user ID of the user who is calling the API or doing the action,
//! o userAgent: The agent of the request,
//? o result: The result of the API,
//? o success: true/false if the request is an error or a success,
//! o headers: request headers,
//! o params: request params,
//! o body: request body
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
