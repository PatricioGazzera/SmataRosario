import { Routes, Route } from 'react-router-dom';


// Pages compontents

import Home from '../Components/Home/Home';
import Mutual from '../Components/Mutual/Mutual';
import Beneficts from '../Components/Beneficts/Beneficts';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/mutual' element={<Mutual />} />
            <Route path='/beneficios' element={<Beneficts/>}/>
        </Routes>
    )
}