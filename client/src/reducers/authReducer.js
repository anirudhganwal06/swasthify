const initialState = {
  isAuthenticated: false,
  permissions: [],
  user: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
