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

export enum DELIVERY_TYPES {
    COURIER,
	PICKUP,
}

export enum PAYMENT_OPTIONS {
    KASPI,
	CASH,
}

export enum PAYMENT_ORDER_OPTIONS {
    AT_PICKUP,
	ONLINE,
}

export interface rootDataType {
    user: {
	last_name: string,
	    first_name: string,
	    phone: string,
	    email: string,
	    user_id: string,
	    shopping_session_id: string,
    },
	delivery: {
	    delivery_type: DELIVERY_TYPES | null,
		address: string | null,
	},
	payment: {
	    payment_order: PAYMENT_ORDER_OPTIONS | null,
	    payment_option: PAYMENT_OPTIONS | null,
		total: number,
	}
}
