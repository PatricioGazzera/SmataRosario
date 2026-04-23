import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../utils/supabase";

export default function ProtectedRoute({ children }) {
  const [session, setSession] = useState(undefined); // undefined = cargando

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
  }, []);

  // Mientras verifica la sesión, no renderiza nada
  if (session === undefined) return null;

  // Si no hay sesión, redirige al login
  if (!session) return <Navigate to="/admin/login" replace />;

  // Si hay sesión, renderiza la ruta
  return children;
}