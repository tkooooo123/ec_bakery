import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';




function FrontLayout() {
return (
    <>
    <Header></Header>
    <Outlet/>
    <Footer></Footer>    
    </>
)
}

export default FrontLayout;