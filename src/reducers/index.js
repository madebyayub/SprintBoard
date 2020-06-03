import { combineReducers } from "redux";

import SidebarReducer from "./SidebarReducer";
import DropdownReducer from "./DropdownReducer";

export default combineReducers({
  showSidebar: SidebarReducer,
  ShowDropdown: DropdownReducer
});