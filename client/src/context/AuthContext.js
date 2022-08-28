import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";
const INITIAL_STATE = {
  // user:
  // {
  //   _id: "61d150281221e9489b6452a4",
  //   username: "satish",
  //   email: "satish123@gmail.com",
  //   password: "$2b$10$w95PpXGD7qeWTBfOzRtb/ehuqzCP7XvCaY/pd9PnmbEZjJOXUQ07u",
  //   profilePicture: "",
  //   coverPicture: "",
  //   followers: [
  //     "61d13d3373b6d83e940d388f",
  //     "61d2cbacc9b92a3c159fffd0",
  //     "624f0d31c1060a866a5e4f6a",
  //   ],
  //   following: [
  //     "61d13d3373b6d83e940d388f",
  //     "61d2cbacc9b92a3c159fffd0",
  //     "624f0d31c1060a866a5e4f6a",
  //   ],
  //   isAdmin: false,
  //   __v: 0,
  //   desc: "its updated description",
  //   updatedAt: "2022-04-09T07:03:55.735Z",
  // },
  user: null,
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
