export interface Itask {
    _id: string;
    task_name: string;
    status: number;
    description: string;
} 

export interface IUser {
    username: string;
    email: string; 
    profilePicture?: ProfilePicture;
    dob?:string,
    gender?:string,
    address?:string
}

export interface ProfilePicture {
    contentType: string;
    base64: string;
}
