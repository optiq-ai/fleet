/**
 * Document Management Service
 * 
 * Service for managing documents related to vehicles, drivers, operations and compliance.
 */

import apiClient from './apiClient';

/**
 * Get document management dashboard data
 * @param {Object} params - Query parameters
 * @param {string} params.timeRange - Time range for data (day, week, month, year)
 * @returns {Promise<Object>} Dashboard data including document counts, alerts, and statistics
 */
export const getDocumentsDashboard = async (params = {}) => {
  try {
    const response = await apiClient.get('/documents/dashboard', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching documents dashboard:', error);
    throw error;
  }
};

/**
 * Get list of documents
 * @param {Object} params - Query parameters
 * @param {string} params.type - Filter by document type (vehicle, driver, operational, compliance)
 * @param {string} params.category - Filter by document category
 * @param {string} params.status - Filter by document status
 * @param {string} params.search - Search term
 * @param {number} params.page - Page number
 * @param {number} params.limit - Items per page
 * @returns {Promise<Object>} Documents data with pagination
 */
export const getDocuments = async (params = {}) => {
  try {
    const response = await apiClient.get('/documents', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching documents:', error);
    throw error;
  }
};

/**
 * Get document details
 * @param {string} documentId - Document ID
 * @returns {Promise<Object>} Document details
 */
export const getDocumentDetails = async (documentId) => {
  try {
    const response = await apiClient.get(`/documents/${documentId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching document details for ID ${documentId}:`, error);
    throw error;
  }
};

/**
 * Upload new document
 * @param {Object} documentData - Document data
 * @param {File} file - Document file
 * @returns {Promise<Object>} Uploaded document data
 */
export const uploadDocument = async (documentData, file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('data', JSON.stringify(documentData));
    
    const response = await apiClient.post('/documents', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading document:', error);
    throw error;
  }
};

/**
 * Update existing document
 * @param {string} documentId - Document ID
 * @param {Object} documentData - Updated document data
 * @param {File} file - Updated document file (optional)
 * @returns {Promise<Object>} Updated document data
 */
export const updateDocument = async (documentId, documentData, file = null) => {
  try {
    let response;
    
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('data', JSON.stringify(documentData));
      
      response = await apiClient.put(`/documents/${documentId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    } else {
      response = await apiClient.put(`/documents/${documentId}`, documentData);
    }
    
    return response.data;
  } catch (error) {
    console.error(`Error updating document with ID ${documentId}:`, error);
    throw error;
  }
};

/**
 * Delete document
 * @param {string} documentId - Document ID
 * @returns {Promise<Object>} Result of deletion
 */
export const deleteDocument = async (documentId) => {
  try {
    const response = await apiClient.delete(`/documents/${documentId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting document with ID ${documentId}:`, error);
    throw error;
  }
};

/**
 * Search documents
 * @param {Object} params - Search parameters
 * @param {string} params.query - Search query
 * @param {Array<string>} params.types - Document types to search
 * @param {Array<string>} params.categories - Document categories to search
 * @param {Array<string>} params.statuses - Document statuses to search
 * @param {string} params.dateFrom - Start date for search
 * @param {string} params.dateTo - End date for search
 * @param {number} params.page - Page number
 * @param {number} params.limit - Items per page
 * @returns {Promise<Object>} Search results with pagination
 */
export const searchDocuments = async (params = {}) => {
  try {
    const response = await apiClient.get('/documents/search', { params });
    return response.data;
  } catch (error) {
    console.error('Error searching documents:', error);
    throw error;
  }
};

/**
 * Generate document report
 * @param {Object} params - Report parameters
 * @param {string} params.reportType - Type of report
 * @param {string} params.format - Report format (PDF, CSV, XLSX)
 * @param {Object} params.filters - Filters for report data
 * @returns {Promise<Object>} Generated report data
 */
export const generateDocumentReport = async (params = {}) => {
  try {
    const response = await apiClient.post('/documents/reports', params);
    return response.data;
  } catch (error) {
    console.error('Error generating document report:', error);
    throw error;
  }
};

/**
 * Export documents
 * @param {Object} params - Export parameters
 * @param {Array<string>} params.documentIds - IDs of documents to export
 * @param {string} params.format - Export format (PDF, CSV, XLSX)
 * @returns {Promise<Object>} Export result with download URL
 */
export const exportDocuments = async (params = {}) => {
  try {
    const response = await apiClient.post('/documents/export', params);
    return response.data;
  } catch (error) {
    console.error('Error exporting documents:', error);
    throw error;
  }
};

/**
 * Set document reminder
 * @param {string} documentId - Document ID
 * @param {Object} reminderData - Reminder data
 * @param {string} reminderData.date - Reminder date
 * @param {string} reminderData.type - Reminder type
 * @param {Array<Object>} reminderData.recipients - Reminder recipients
 * @returns {Promise<Object>} Created reminder data
 */
export const setDocumentReminder = async (documentId, reminderData) => {
  try {
    const response = await apiClient.post(`/documents/${documentId}/reminders`, reminderData);
    return response.data;
  } catch (error) {
    console.error(`Error setting reminder for document with ID ${documentId}:`, error);
    throw error;
  }
};

/**
 * Share document
 * @param {string} documentId - Document ID
 * @param {Object} shareData - Share data
 * @param {Array<string>} shareData.userIds - IDs of users to share with
 * @param {string} shareData.permission - Permission level
 * @param {string} shareData.expiryDate - Expiry date for sharing
 * @returns {Promise<Object>} Share result
 */
export const shareDocument = async (documentId, shareData) => {
  try {
    const response = await apiClient.post(`/documents/${documentId}/share`, shareData);
    return response.data;
  } catch (error) {
    console.error(`Error sharing document with ID ${documentId}:`, error);
    throw error;
  }
};

/**
 * Get document templates
 * @param {Object} params - Query parameters
 * @param {string} params.type - Filter by template type
 * @param {string} params.category - Filter by template category
 * @param {string} params.search - Search term
 * @returns {Promise<Array<Object>>} Document templates
 */
export const getDocumentTemplates = async (params = {}) => {
  try {
    const response = await apiClient.get('/documents/templates', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching document templates:', error);
    throw error;
  }
};

/**
 * Create document template
 * @param {Object} templateData - Template data
 * @param {File} file - Template file
 * @returns {Promise<Object>} Created template data
 */
export const createDocumentTemplate = async (templateData, file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('data', JSON.stringify(templateData));
    
    const response = await apiClient.post('/documents/templates', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating document template:', error);
    throw error;
  }
};

/**
 * Generate document from template
 * @param {string} templateId - Template ID
 * @param {Object} data - Data for document generation
 * @returns {Promise<Object>} Generated document data
 */
export const generateDocumentFromTemplate = async (templateId, data) => {
  try {
    const response = await apiClient.post(`/documents/templates/${templateId}/generate`, data);
    return response.data;
  } catch (error) {
    console.error(`Error generating document from template with ID ${templateId}:`, error);
    throw error;
  }
};

/**
 * Get document change history
 * @param {string} documentId - Document ID
 * @returns {Promise<Array<Object>>} Document change history
 */
export const getDocumentChangeHistory = async (documentId) => {
  try {
    const response = await apiClient.get(`/documents/${documentId}/history`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching change history for document with ID ${documentId}:`, error);
    throw error;
  }
};

/**
 * Get document categories
 * @returns {Promise<Array<Object>>} Document categories
 */
export const getDocumentCategories = async () => {
  try {
    const response = await apiClient.get('/documents/categories');
    return response.data;
  } catch (error) {
    console.error('Error fetching document categories:', error);
    throw error;
  }
};

/**
 * Get document alerts
 * @param {Object} params - Query parameters
 * @param {string} params.type - Filter by alert type
 * @param {string} params.severity - Filter by alert severity
 * @param {string} params.status - Filter by alert status
 * @returns {Promise<Array<Object>>} Document alerts
 */
export const getDocumentAlerts = async (params = {}) => {
  try {
    const response = await apiClient.get('/documents/alerts', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching document alerts:', error);
    throw error;
  }
};

export default {
  getDocumentsDashboard,
  getDocuments,
  getDocumentDetails,
  uploadDocument,
  updateDocument,
  deleteDocument,
  searchDocuments,
  generateDocumentReport,
  exportDocuments,
  setDocumentReminder,
  shareDocument,
  getDocumentTemplates,
  createDocumentTemplate,
  generateDocumentFromTemplate,
  getDocumentChangeHistory,
  getDocumentCategories,
  getDocumentAlerts
};
