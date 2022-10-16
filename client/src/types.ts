export interface AccountResponse {
    user: {
        id: string;
	email: string;
	is_active: boolean;
	created_at: Date;
	modified_at: Date;
	phone: string;
	first_name: string;
	last_name: string;
    };
    access: string;
    refresh: string;
    [key: string]: any;
}
