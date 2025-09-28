import AxiosInstance from "../lib/AxiosInstance";

export const googleAuth = async (code) => AxiosInstance.get(`/auth/google-auth?code=${code}`);