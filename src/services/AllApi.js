import { publicApi, userApi, adminApi } from "./AxiosConfig";

// ==========================================
// PUBLIC: No token needed
// ==========================================
export const loginUser = (reqBody) => publicApi.post("/auth/login", reqBody);
export const registerUser = (reqBody) => publicApi.post("/auth/register", reqBody);

// ==========================================
// USER: Protected (Cookies attached automatically)
// ==========================================
export const getProfile = () => userApi.get("/users");
export const updateProfile = (reqBody) => userApi.patch("/users", reqBody);
export const getAllListings = () => userApi.get("/listings");
export const createListing = (reqBody) => userApi.post("/listings", reqBody);
export const getMyListings = () => userApi.get("/listings/me");

// ==========================================
// SWAP REQUESTS
// ==========================================
export const createSwapRequest = (reqBody) => userApi.post("/requests", reqBody);
export const getMyRequests = () => userApi.get("/requests/me");
export const updateSwapRequest = (requestId, status) => userApi.patch(`/requests/${requestId}`, { status });

// ==========================================
// ADMIN: Protected Admin routes
// ==========================================
export const getAllUsers = () => adminApi.get("/admin/users");
export const deleteUser = (id) => adminApi.delete(`/admin/users/${id}`);

export const getMyConversations = () => userApi.get("/chat/conversations");
export const getChatMessages = (conversationId) => userApi.get(`/chat/${conversationId}`);

// ==========================================
// SESSIONS & SCHEDULING
// ==========================================
export const createSession = (reqBody) => userApi.post("/sessions", reqBody);
export const getMySessions = () => userApi.get("/sessions/me");