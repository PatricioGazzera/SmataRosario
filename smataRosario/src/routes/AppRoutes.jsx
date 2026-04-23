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

export default function AppRoutes() {
    return (
        <Routes>
            {/* RUTAS PUBLICAS */}
            <Route path='/' element={<Home />} />
            <Route path='/mutual' element={<Mutual />} />
            <Route path='/beneficios' element={<Beneficts/>}/>
            <Route path='/prestadores' element={<Prestadores/>}/>
            <Route path='/autoridades' element={<Autoridades/>}/>
            <Route path='/camping' element={<Camping />} />
            <Route path='/camping/:id' element={<CampingDetail/>}/>
            <Route path='/contacto' element={<Contact />}/>
            <Route path='/noticias' element={<News />}/>
            <Route path='/noticias/:id' element={<NewsDetail />}/>

            {/* LOGIN ADMIN */}
            <Route path='/admin/login' element={<AdminLogin />}/>

            {/* RUTAS PRIVADAS */}
            <Route path='/admin' element={
                <ProtectedRoute>
                </ProtectedRoute>
            }
            />
        </Routes>
    )
}