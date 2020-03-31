
import LandingPage from 'src/views/LandingPage';
import ProfilePage from 'src/views/ProfilePage';
import UserUpdatePage from 'src/views/UserUpdatePage';
import UserPasswordUpdatePage from 'src/views/UserPasswordUpdatePage';
import WidgetsPage from 'src/views/WidgetsPage';
import WidgetsFormPage from 'src/views/WidgetsFormPage';

const routes = [
   { path: '/', exact: true, name: 'Widgets', component: LandingPage },
   { path: '/me', exact: true, name: 'Profile', component: ProfilePage },
   { path: '/user/update', exact: true, name: 'Update User', component: UserUpdatePage },
   { path: '/user/update_password', exact: true, name: 'Update Password', component: UserPasswordUpdatePage },
   { path: '/user/:id', exact: true, name: 'Profile', component: ProfilePage },
   { path: '/widgets', exact: true, name: 'Widgets', component: WidgetsPage },
   { path: '/widgets/create', exact: true, name: "Widgets Form", component: WidgetsFormPage},
   { path: '/widgets/update/:id', exact: true, name: "Widgets Form", component: WidgetsFormPage}
]


export default routes;