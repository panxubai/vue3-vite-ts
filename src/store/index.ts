import { createStore } from "vuex"
import Home from "./home"
const store = createStore({
    modules: {
        Home,
    }
})
export default store;