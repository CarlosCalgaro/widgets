import AuthenticationApi from 'src/api/Authentication'
import WidgetsApi from 'src/api/Widgets'
import UsersApi from 'src/api/Users'

export default {
    Authentication: new AuthenticationApi(),
    Widgets: new WidgetsApi(),
    Users: new UsersApi()
}