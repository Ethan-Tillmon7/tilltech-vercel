import axios from "axios";

const maliciousConfig = JSON.parse('{"__proto__": {"x": 1}}');
await axios.get("https://httpbin.org/get", maliciousConfig);
