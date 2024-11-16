import { Route, Routes } from 'react-router-dom';
import {
  CreatePost,
  EditProfile,
  ForgotPassword,
  ResetPassword,
  Home,
  Login,
  MyProfile,
  Post,
  Profile,
  Register,
  ReportedPosts,
  Tags,
  Users,
} from './index';

export function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="public/auth/reset-password" element={<ResetPassword />} />
      <Route path="/my-profile" element={<MyProfile />} />
      <Route path="/my-profile/edit" element={<EditProfile />} />
      <Route path="/profile/:username" element={<Profile />} />
      <Route path="/users" element={<Users />} />
      <Route path="/post/:id" element={<Post />} />
      <Route path="/create-post" element={<CreatePost />} />
      <Route path="/tags/:tag" element={<Tags />} />
      <Route path="/reported-posts" element={<ReportedPosts />} />
    </Routes>
  );
}
