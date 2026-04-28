import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoutes';

// Pages compontents

import Home from '../Components/Home/Home';
import Mutual from '../Components/Mutual/Mutual';
import Beneficts from '../Components/Beneficts/Beneficts';
import Prestadores from '../Components/Prestadores/Prestadores';
import Autoridades from '../Components/Autoridades/Autoridades';
import Camping from '../Components/Camping/Camping';
import CampingDetail from '../Components/CampingDetail/CampingDetail';
import Contact from '../Components/Contact/Contact';
import News from '../Components/News/News';
import NewsDetail from '../Components/NewsDetails/NewsDetails';
import AdminLogin from '../Components/AdminLogin/AdminLogin';
import NotFound from '../Components/NotFound/NotFound';
import Capacitacion from '../Components/Capacitacion/Capacitacion';
import CapacitacionDetails from '../Components/CapacitacionDetails/CapacitacionDetails';
import Subsidios from '../Components/Subsidios/Subsidios';
import SubsidioDetails from '../Components/SubsidiosDetails/SubsidiosDetails';
import Hotels from '../Components/Hotels/Hotels';
import HotelDetails from '../Components/HotelDetails/HotelDetails';

export default function AppRoutes() {
    return (
        <Routes>
            {/* RUTAS PUBLICAS */}
            <Route path='/' element={<Home />} />
            <Route path='/mutual' element={<Mutual />} />
            <Route path='/beneficios' element={<Beneficts/>}/>
            <Route path='/subsidios' element={<Subsidios />}/>
            <Route path='/subsidios/:id' element={<SubsidioDetails />}/>
            <Route path='/obra-social' element={<Prestadores/>}/>
            <Route path='/autoridades' element={<Autoridades/>}/>
            <Route path='/camping' element={<Camping />} />
            <Route path='/camping/:id' element={<CampingDetail/>}/>
            <Route path='/contacto' element={<Contact />}/>
            <Route path='/noticias' element={<News />}/>
            <Route path='/noticias/:id' element={<NewsDetail />}/>
            <Route path='/capacitacion' element={<Capacitacion />}/>
            <Route path='/capacitacion/:id' element={<CapacitacionDetails />}/>
            <Route path='/turismo' element={<Hotels/>}/>
            <Route path='/turismo/:id' element={<HotelDetails/>}/>

            {/* LOGIN ADMIN */}
            <Route path='/admin/login' element={<AdminLogin />}/>

            {/* RUTAS PRIVADAS */}
            <Route path='/admin' element={
                <ProtectedRoute>
                </ProtectedRoute>
            }
            />

            {/* NOT FOUND */}
            <Route path='*' element={<NotFound />}/>
        </Routes>
    )
}