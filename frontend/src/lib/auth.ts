// lib/auth.ts
export function setToken(token: string, rememberMe: boolean) {
    if (rememberMe) {
        localStorage.setItem("token", token);
    } else {
        sessionStorage.setItem("token", token);
    }
}
