const AuditService = require('../services/audit.service');

exports.saveAuditResponse = async (response, logId) => {
  try {
    await AuditService.saveAuditResponse(response, logId);
    return true
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' })
  }
};

exports.saveAuditRequest = async (req, res) => {
  try {
    const result = await AuditService.saveAuditRequest(req);
    return result
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
