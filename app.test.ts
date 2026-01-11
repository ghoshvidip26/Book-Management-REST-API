
import router from "./controller/router.js";

test("GET Endpoint", async() => {
    const res = await router.get("/books")
 })