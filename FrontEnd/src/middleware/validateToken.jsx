import { jwtDecode } from "jwt-decode";

export default function ValidateToken(token) {
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (e) {
    console.log(e);
    return false;
  }
}
