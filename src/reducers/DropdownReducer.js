export default (state = {}, action) => {
    switch (action.type) {
      case "SHOW_DROPDOWN":
        return { ...state, showDropdown: true };
      case "HIDE_DROPDOWN":
        return { ...state, showDropdown: false };
      default:
        return state;
    }
  };