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
    COURIER = 'COURIER',
	PICKUP = 'PICKUP',
}

export enum PAYMENT_OPTIONS {
    KASPI = 'KASPI',
	CASH = 'CASH',
}

export enum PAYMENT_ORDER_OPTIONS {
    AT_PICKUP = 'AT_PICKUP',
	ONLINE = 'ONLINE',
}

export interface rootDataType {
    user: string,
	shopping_session: string,
	delivery_type: DELIVERY_TYPES | null,
	address: string | null,
	payment_order: PAYMENT_ORDER_OPTIONS | null,
	payment_option: PAYMENT_OPTIONS | null,
	total: number,
}
