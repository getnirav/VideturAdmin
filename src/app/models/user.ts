export interface User {
    select: boolean;
    parentUser: string;
    parentFirstName: string;
    parentMiddleName: string;
    parentLastName: string;
    firstName: string;
    middleName: string;
    lastName: string;
    loginId: string;
    adminUser: boolean;
    addressType: string;
    address: string;
    address1: string;
    address2: string;
    stateName: string;
    countyName: string;
    cityName: string;
    zipCode: string;
    isPrimary: boolean;
    profileType: string;
    userRoleName: string;
}


export interface Login {
    LoginId: string;
    Password: string;
}

export interface LoginResponse {
    errorMessage: string;
    isSuccess: Boolean
    message: string;
    model: UserModel
}
export interface UserModel {
    id?: number;
    username?: string;
    token?: string;
    firstName?: string;
    lastName?: string;
    recordStatus?: string;
}
export interface UserProfile {
    firstName: string;
    lastName: string;
}
export interface AdminUser {
    autoId: number;
    firstName: string;
    lastName: string;
    adminUserRoleName: string;
    loginId: string;
}
