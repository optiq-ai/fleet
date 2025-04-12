import apiClient from './apiClient';

// Interfejsy dla typów danych
export interface DashboardElement {
  id: string;
  type: string;
  name: string;
  description: string;
  category: string;
  defaultVisible: boolean;
  requiredRoles?: string[];
}

export interface DashboardElementsResponse {
  elements: DashboardElement[];
}

export interface UserGroup {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}

export interface UserGroupsResponse {
  groups: UserGroup[];
}

export interface UserView {
  id: string;
  name: string;
  userId: string;
  isDefault: boolean;
  elements: string[];
  layout?: {
    [key: string]: {
      x: number;
      y: number;
      w: number;
      h: number;
    };
  };
}

export interface UserViewsResponse {
  views: UserView[];
}

export interface GroupView {
  id: string;
  name: string;
  groupId: string;
  isDefault: boolean;
  elements: string[];
  layout?: {
    [key: string]: {
      x: number;
      y: number;
      w: number;
      h: number;
    };
  };
}

export interface GroupViewsResponse {
  views: GroupView[];
}

export interface ElementPermission {
  elementId: string;
  groupIds: string[];
}

export interface ElementPermissionsResponse {
  permissions: ElementPermission[];
}

export interface CreateViewRequest {
  name: string;
  userId?: string;
  groupId?: string;
  isDefault?: boolean;
  elements: string[];
  layout?: {
    [key: string]: {
      x: number;
      y: number;
      w: number;
      h: number;
    };
  };
}

export interface UpdateViewRequest {
  name?: string;
  isDefault?: boolean;
  elements?: string[];
  layout?: {
    [key: string]: {
      x: number;
      y: number;
      w: number;
      h: number;
    };
  };
}

export interface UpdateElementPermissionsRequest {
  elementId: string;
  groupIds: string[];
}

// Klasa serwisu API dla personalizacji widoków
class ViewCustomizationService {
  // Pobieranie wszystkich dostępnych elementów dashboardu
  public async getDashboardElements(): Promise<DashboardElementsResponse> {
    return apiClient.get<DashboardElementsResponse>('/customization/elements');
  }
  
  // Pobieranie grup użytkowników
  public async getUserGroups(): Promise<UserGroupsResponse> {
    return apiClient.get<UserGroupsResponse>('/customization/groups');
  }
  
  // Pobieranie widoków użytkownika
  public async getUserViews(userId: string): Promise<UserViewsResponse> {
    const params = {
      user_id: userId
    };
    
    return apiClient.get<UserViewsResponse>('/customization/views/user', params);
  }
  
  // Pobieranie widoków grupy
  public async getGroupViews(groupId: string): Promise<GroupViewsResponse> {
    const params = {
      group_id: groupId
    };
    
    return apiClient.get<GroupViewsResponse>('/customization/views/group', params);
  }
  
  // Pobieranie uprawnień do elementów
  public async getElementPermissions(): Promise<ElementPermissionsResponse> {
    return apiClient.get<ElementPermissionsResponse>('/customization/permissions');
  }
  
  // Tworzenie nowego widoku użytkownika
  public async createUserView(
    userId: string,
    viewData: CreateViewRequest
  ): Promise<UserView> {
    return apiClient.post<UserView>(
      `/customization/views/user/${userId}`,
      viewData
    );
  }
  
  // Aktualizacja widoku użytkownika
  public async updateUserView(
    viewId: string,
    viewData: UpdateViewRequest
  ): Promise<UserView> {
    return apiClient.put<UserView>(
      `/customization/views/user/${viewId}`,
      viewData
    );
  }
  
  // Usuwanie widoku użytkownika
  public async deleteUserView(viewId: string): Promise<void> {
    return apiClient.delete<void>(`/customization/views/user/${viewId}`);
  }
  
  // Tworzenie nowego widoku grupy
  public async createGroupView(
    groupId: string,
    viewData: CreateViewRequest
  ): Promise<GroupView> {
    return apiClient.post<GroupView>(
      `/customization/views/group/${groupId}`,
      viewData
    );
  }
  
  // Aktualizacja widoku grupy
  public async updateGroupView(
    viewId: string,
    viewData: UpdateViewRequest
  ): Promise<GroupView> {
    return apiClient.put<GroupView>(
      `/customization/views/group/${viewId}`,
      viewData
    );
  }
  
  // Usuwanie widoku grupy
  public async deleteGroupView(viewId: string): Promise<void> {
    return apiClient.delete<void>(`/customization/views/group/${viewId}`);
  }
  
  // Aktualizacja uprawnień do elementu
  public async updateElementPermissions(
    elementId: string,
    permissionsData: UpdateElementPermissionsRequest
  ): Promise<ElementPermission> {
    return apiClient.put<ElementPermission>(
      `/customization/permissions/${elementId}`,
      permissionsData
    );
  }
}

// Eksport instancji serwisu
export const viewCustomizationService = new ViewCustomizationService();
export default viewCustomizationService;
