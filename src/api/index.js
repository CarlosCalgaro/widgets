import AuthenticationApi from 'src/api/Authentication'
import WidgetsApi from 'src/api/Widgets'

export default {
    Authentication: new AuthenticationApi(),
    Widgets: new WidgetsApi()
}