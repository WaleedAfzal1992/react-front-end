export interface FormActionResponse {
    success?: boolean;
    errors?: {
        [key: string]: string[];
    };
    id?: string;
}
