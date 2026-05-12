import { Navigate} from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import { getUser } from '../api/SocTreeAPI';
import Soctree from '../components/Soctree';

export default function AppLayout() {
  const { data, isLoading, isError } = useQuery({
      queryFn: getUser,
      queryKey: ['user'],
      retry: 2,
      refetchOnWindowFocus: false
  });
  if (isLoading) return 'Cargando...';
  if(isError) {
    return <Navigate to={'/auth/login'}/>
  }

  if(data) return <Soctree data={data}/>
}