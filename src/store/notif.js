import {createSlice} from "@reduxjs/toolkit";

const initialNotificationState = {
    notificationList: [],
};

const notificationSlice = createSlice({
    name: 'notification',
    initialState: initialNotificationState,
    reducers:{
        addNotification(state, action) {
            state.notificationList.push(action.payload);
        },
        deleteNotification(state, action) {
            const notification = action.payload;
            state.notificationList = state.notificationList.filter((x) => x.id === notification.id);
        },
        deleteAll(state) {
            state.notificationList = [];
        },
        setStorageNotificationData(state) {
            window.localStorage.setItem('notificationInfo', JSON.stringify(state));
        },
        getStorageNotificationData(state) {
            if ('notificationInfo' in window.localStorage &&  window.localStorage.getItem('notificationInfo').length !== 0) {
                state.notificationList = JSON.parse(window.localStorage.getItem('notificationInfo')).notificationList;
            }
        }
    }
});

export const notificationActions = notificationSlice.actions;
export default notificationSlice.reducer;
