import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginView from './view/LoginView';
import { RegisterView } from './view/RegisterView';
import AuthLayout from './layouts/AuthLayout';
import AppLayout from './layouts/AppLayout';
import LinkTreeView from './view/LinkTreeView';
import ProfileView from './view/ProfileView';
import HandleView from './view/HandleView';
import NotFoundView from './view/NotFoundView';
import HomeView from './view/HomeView';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginView />} />
          <Route path="/auth/register" element={<RegisterView />} />
        </Route>
        
        <Route path='/admin' element={<AppLayout/>}>
          <Route index={true} element={<LinkTreeView/>} />
          <Route path='profile' element={<ProfileView/>} />
        </Route>

        <Route path='/:handle' element={<AuthLayout />}>
          <Route element={<HandleView />} index={true} />
        </Route>

        <Route path='/' element={<HomeView />} />
        
        <Route path='404' element={<AuthLayout />}>
          <Route element={<NotFoundView />} index={true} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
