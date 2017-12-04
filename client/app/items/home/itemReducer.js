import { FETCH_ITEM, EDIT_ITEM, DELETE_ITEM, CREATE_ITEM } from "../itemActions";

const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_ITEM: {
      const { item, deck } = action.payload;
      return { ...item, deck };
    }
    case CREATE_ITEM:
      return action.payload.item;
    case EDIT_ITEM:
      return action.payload.item;
    case DELETE_ITEM:
      return INITIAL_STATE;
    default:
      return state;
  }
}
