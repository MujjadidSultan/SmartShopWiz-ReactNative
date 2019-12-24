import { createStackNavigator, createAppContainer } from 'react-navigation';
import Main from './Components/Main';
import SignUp from './Components/SignUp';
import LogIn from './Components/LogIn';
import Home from './Components/Home';
import Details from './Components/Details';
import Finder from './Components/Finder';
import Locate from './Components/Locate';
import Bill from './Components/Bill';
import Forgot from './Components/Forgot';
import Notifications from './Components/Notifications';
//import Settings from './Components/Settings';
import Test from './Components/Test';
import Code from './Components/Code';
import Password from './Components/Password';
import Account from './Components/Account';
import Profile from './Components/Profile';
import Update from './Components/Update';
import ChangePass from './Components/ChangePass';

//import Homee from './Components/Homee';

import NewReview from './Components/NewReview';
import NewComplaint from './Components/NewComplaint';
import Purchases from './Components/Purchases';
import Reviews from './Components/Reviews';
import Complaints from './Components/Complaints';
import Help from './Components/Help';
import Reserved from './Components/Reserved';
import SignUpp from './Components/SignUpp';
import ViewComplaint from './Components/ViewComplaint';
import Product from './Components/Product';
import ReservedProduct from './Components/ReservedProduct';
import ViewReview from './Components/ViewReview';
import PurchaseConfirmed from './Components/PurchaseConfirmed';
import ProductDetails from './Components/ProductDetails';
import ReviewProduct from './Components/ReviewProduct';
import ViewPurchase from './Components/ViewPurchase';
import Updatee from './Components/Updatee';
import Estimate from './Components/Estimate';
import PushNotificationsTest from './Components/PushNotificationsTest';
import Homee from './Components/Homee';
//import Location from './Components/Location';



//import Test2 from './Components/Test2';
//import ViewComp from './Components/ViewComp';


const AppNavigator = createStackNavigator ({
    Main: { screen: Main},
    SignUpp: {screen: SignUpp},
    LogIn : { screen: LogIn},
    Home: { screen: Home},
    Details: {screen: Details},
    Finder: {screen: Finder},
    Locate: {screen:Locate},
    Bill: {screen:Bill},
    Forgot: {screen:Forgot},
    Notifications: {screen :Notifications},
   // Settings: {screen: Settings},
    Code: {screen: Code},
    Password: {screen: Password},
    Account: {screen: Account},
    Purchases: {screen: Purchases},
    Reviews: {screen: Reviews},
    Complaints: {screen: Complaints},
    Profile: {screen: Profile},
    Update: {screen: Update},
    ChangePass: {screen: ChangePass},
    NewReview: {screen: NewReview},
    NewComplaint: {screen: NewComplaint},
    Help: {screen: Help},
    Reserved: {screen: Reserved},
    ViewComplaint: {screen: ViewComplaint},
    Product: {screen: Product},
    ReservedProduct: {screen: ReservedProduct},
    ViewReview: {screen : ViewReview},
    PurchaseConfirmed: {screen: PurchaseConfirmed},
    ProductDetails: {screen: ProductDetails},
    ReviewProduct: {screen: ReviewProduct},
    ViewPurchase: {screen: ViewPurchase},
    Estimate: {screen:Estimate},
   // Location: {screen: Location},

   Locate: {screen: Locate},

    SignUp: {screen: SignUp},
    Updatee: {screen: Updatee},
    PushNotificationsTest: {screen: PushNotificationsTest},

    Homee: {screen: Homee}
    
})


const AppNav= createAppContainer(AppNavigator)

export default AppNav;