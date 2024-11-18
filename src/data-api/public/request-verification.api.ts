import { FormActionResponse } from "../../types/form-response.type";

class RequestVerification {
    private readonly API_URL = process.env.NEXT_PUBLIC_PUBLIC_API_URL;

    async submitRequestVerification(
        data: FormData
    ): Promise<FormActionResponse> {
        try {
            const resp = await fetch(`${this.API_URL}/report`, {
                method: "POST",
                body: data,
            });
            if (resp.ok) {
                return await resp.json();
            } else {
                throw new Error(resp.statusText);
            }
        } catch (error) {
            throw error;
        }
    }
}

export const RequestVerificationAPI = new RequestVerification();
