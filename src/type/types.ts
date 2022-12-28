export type productType={
    id?: Number;
    name: String;
    price: number;
    category?: string;
}

export type UserTypeRt = {
    id?: number;
    username?: string;
    firstname?: string;
    lastname?: string;
    password_digest?:string;
}
export type UserTypeIN = {
    username: string;
    firstname?: string;
    lastname?: string;
    password:string;
}

export type orderType={
    id?:number;
    product_id:number,
    quantity:number,
    user_id:number,
    status:string
}


export type loginType = {
    username: string,
    password:string;
}