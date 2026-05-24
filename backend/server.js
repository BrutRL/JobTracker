import dns from "dns";
dns.setDefaultResultOrder("ipv4first");

// then import your app
import "./index.js";
