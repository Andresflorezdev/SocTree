import { Link } from "react-router-dom";

export default function LoginView() {
  return (
    <>
        <div className='text-4xl text-white font-bold' >Incia Sesion</div>

        <nav className='mt-10'>
            <Link 
                className='text-center text-white text-lg block' 
                to="/auth/register"
            >¿No Tienes Cuenta? Crea una Aqui
            </Link>
        </nav>
    </>
  )
}
