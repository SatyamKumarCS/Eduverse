import { sign } from "crypto";

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001";

export interface SignupPayload {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
  }

export async function signupApi(data: SignupPayload) {
  const res = await fetch(`${API_BASE}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
}

export interface LoginPayload {
    email:string,
    password:string
}
export async function loginApi(data: LoginPayload) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
}
