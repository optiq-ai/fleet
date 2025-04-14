import apiClient from './apiClient';

/**
 * @typedef {Object} DashboardElement
 * @property {string} id - Element ID
 * @property {string} type - Element type
 * @property {string} name - Element name
 * @property {string} description - Element description
 * @property {string} category - Element category
 * @property {boolean} defaultVisible - Whether element is visible by default
 * @property {string[]} [requiredRoles] - Roles required to view element
 */

/**
 * @typedef {Object} DashboardElementsResponse
 * @property {DashboardElement[]} elements - Dashboard elements
 */

/**
 * @typedef {Object} UserGroup
 * @property {string} id - Group ID
 * @property {string} name - Group name
 * @property {string} description - Group description
 * @property {string[]} permissions - Group permissions
 */

/**
 * @typedef {Object} UserGroupsResponse
 * @property {UserGroup[]} groups - User groups
 */

/**
 * @typedef {Object} UserView
 * @property {string} id - View ID
 * @property {string} name - View name
 * @property {string} userId - User ID
 * @property {boolean} isDefault - Whether view is default
 * @property {string[]} elements - Element IDs
 * @property {Object} [layout] - Layout configuration
 * @property {Object} layout.elementId - Element layout
 * @property {number} layout.elementId.x - X position
 * @property {number} layout.elementId.y - Y position
 * @property {number} layout.elementId.w - Width
 * @property {number} layout.elementId.h - Height
 */

/**
 * @typedef {Object} UserViewsResponse
 * @property {UserView[]} views - User views
 */

/**
 * @typedef {Object} GroupView
 * @property {string} id - View ID
 * @property {string} name - View name
 * @property {string} groupId - Group ID
 * @property {boolean} isDefault - Whether view is default
 * @property {string[]} elements - Element IDs
 * @property {Object} [layout] - Layout configuration
 * @property {Object} layout.elementId - Element layout
 * @property {number} layout.elementId.x - X position
 * @property {number} layout.elementId.y - Y position
 * @property {number} layout.elementId.w - Width
 * @property {number} layout.elementId.h - Height
 */

/**
 * @typedef {Object} GroupViewsResponse
 * @property {GroupView[]} views - Group views
 */

/**
 * @typedef {Object} ElementPermission
 * @property {string} elementId - Element ID
 * @property {string[]} groupIds - Group IDs
 */

/**
 * @typedef {Object} ElementPermissionsResponse
 * @property {ElementPermission[]} permissions - Element permissions
 */

/**
 * @typedef {Object} CreateViewRequest
 * @property {string} name - View name
 * @property {string} [userId] - User ID
 * @property {string} [groupId] - Group ID
 * @property {boolean} [isDefault] - Whether view is default
 * @property {string[]} elements - Element IDs
 * @property {Object} [layout] - Layout configuration
 * @property {Object} layout.elementId - Element layout
 * @property {number} layout.elementId.x - X position
 * @property {number} layout.elementId.y - Y position
 * @property {number} layout.elementId.w - Width
 * @property {number} layout.elementId.h - Height
 */

/**
 * @typedef {Object} UpdateViewRequest
 * @property {string} [name] - View name
 * @property {boolean} [isDefault] - Whether view is default
 * @property {string[]} [elements] - Element IDs
 * @property {Object} [layout] - Layout configuration
 * @property {Object} layout.elementId - Element layout
 * @property {number} layout.elementId.x - X position
 * @property {number} layout.elementId.y - Y position
 * @property {number} layout.elementId.w - Width
 * @property {number} layout.elementId.h - Height
 */

/**
 * @typedef {Object} UpdateElementPermissionsRequest
 * @property {string} elementId - Element ID
 * @property {string[]} groupIds - Group IDs
 */

/**
 * View customization service class for API interactions
 */
class ViewCustomizationService {
  /**
   * Get all available dashboard elements
   * @returns {Promise<DashboardElementsResponse>} Dashboard elements response
   */
  async getDashboardElements() {
    return apiClient.get('/customization/elements');
  }
  
  /**
   * Get user groups
   * @returns {Promise<UserGroupsResponse>} User groups response
   */
  async getUserGroups() {
    return apiClient.get('/customization/groups');
  }
  
  /**
   * Get user views
   * @param {string} userId - User ID
   * @returns {Promise<UserViewsResponse>} User views response
   */
  async getUserViews(userId) {
    const params = {
      user_id: userId
    };
    
    return apiClient.get('/customization/views/user', params);
  }
  
  /**
   * Get group views
   * @param {string} groupId - Group ID
   * @returns {Promise<GroupViewsResponse>} Group views response
   */
  async getGroupViews(groupId) {
    const params = {
      group_id: groupId
    };
    
    return apiClient.get('/customization/views/group', params);
  }
  
  /**
   * Get element permissions
   * @returns {Promise<ElementPermissionsResponse>} Element permissions response
   */
  async getElementPermissions() {
    return apiClient.get('/customization/permissions');
  }
  
  /**
   * Create new user view
   * @param {string} userId - User ID
   * @param {CreateViewRequest} viewData - View data
   * @returns {Promise<UserView>} Created user view
   */
  async createUserView(userId, viewData) {
    return apiClient.post(
      `/customization/views/user/${userId}`,
      viewData
    );
  }
  
  /**
   * Update user view
   * @param {string} viewId - View ID
   * @param {UpdateViewRequest} viewData - View data
   * @returns {Promise<UserView>} Updated user view
   */
  async updateUserView(viewId, viewData) {
    return apiClient.put(
      `/customization/views/user/${viewId}`,
      viewData
    );
  }
  
  /**
   * Delete user view
   * @param {string} viewId - View ID
   * @returns {Promise<void>} Void
   */
  async deleteUserView(viewId) {
    return apiClient.delete(`/customization/views/user/${viewId}`);
  }
  
  /**
   * Create new group view
   * @param {string} groupId - Group ID
   * @param {CreateViewRequest} viewData - View data
   * @returns {Promise<GroupView>} Created group view
   */
  async createGroupView(groupId, viewData) {
    return apiClient.post(
      `/customization/views/group/${groupId}`,
      viewData
    );
  }
  
  /**
   * Update group view
   * @param {string} viewId - View ID
   * @param {UpdateViewRequest} viewData - View data
   * @returns {Promise<GroupView>} Updated group view
   */
  async updateGroupView(viewId, viewData) {
    return apiClient.put(
      `/customization/views/group/${viewId}`,
      viewData
    );
  }
  
  /**
   * Delete group view
   * @param {string} viewId - View ID
   * @returns {Promise<void>} Void
   */
  async deleteGroupView(viewId) {
    return apiClient.delete(`/customization/views/group/${viewId}`);
  }
  
  /**
   * Update element permissions
   * @param {string} elementId - Element ID
   * @param {UpdateElementPermissionsRequest} permissionsData - Permissions data
   * @returns {Promise<ElementPermission>} Updated element permission
   */
  async updateElementPermissions(elementId, permissionsData) {
    return apiClient.put(
      `/customization/permissions/${elementId}`,
      permissionsData
    );
  }
}

// Export service instance
export const viewCustomizationService = new ViewCustomizationService();
export default viewCustomizationService;
