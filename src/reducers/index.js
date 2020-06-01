import { combineReducers } from "redux";

import SidebarReducer from "./SidebarReducer";

export default combineReducers({
  showSidebar: SidebarReducer,
});
