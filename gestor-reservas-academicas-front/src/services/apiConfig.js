// Dirección base del backend.
// En producción se configura VITE_API_URL desde Vercel.
// Si no existe esa variable, se utiliza el backend local.
export const API_BASE_URL = (
    import.meta.env.VITE_API_URL || "http://localhost:8080"
).replace(/\/+$/, "");
