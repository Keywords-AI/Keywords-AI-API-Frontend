import { DISPATCH_NOTIFICATION, DISMISS_NOTIFICATION } from "src/store/actions";
const initState = {
  notifications: [
    // {
    //   title: "Success",
    //   message: "Your organization has been successfully updated.",
    //   type: "success",
    // },
    // {
    //   title: "Success",
    //   message: "Your organization has been successfully updated.",
    //   type: "success",
    // },
  ],
};

export default function notificationReducer(state = initState, action) {
  switch (action.type) {
    case DISPATCH_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    case DISMISS_NOTIFICATION:
      const newNotifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
      return { ...state, notifications: newNotifications };
    default:
      return state;
  }
}
