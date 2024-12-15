'use client'; // Habilita o uso de hooks no lado do cliente

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation'; // API do App Directory
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Apenas para redirecionamento
import Cookies from 'universal-cookie';

export default function AvaliacaoPage() {
    const cookies = new Cookies();
    const router = useRouter();
    const pathname = usePathname(); // Pega o pathname da URL

    const [loading, setLoading] = useState(true);
    const [uuid, setUuid] = useState(null); // Estado para armazenar o UUID

    // Extraímos o UUID da URL
    useEffect(() => {
        const currentUuid = pathname.split('/')[2]; // Supondo que o UUID está na URL como /avaliacao/[uuid]
        setUuid(currentUuid); // Atualiza o estado com o UUID extraído
    }, [pathname]); // Executa sempre que o pathname mudar

    // Quando o UUID for extraído, faz a requisição
    useEffect(() => {
        if (!uuid) return; // Se o UUID ainda não foi extraído, não faz nada

        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_URL_API}/validate/${uuid}`);

                console.log(response.data)

                if (response.status === 200 && response.data?.message === 'JWT válido') {
                    cookies.set('uuid', response.data.decoded.uuid);
                    router.push('/'); // Redireciona para a página inicial
                } else {
                    router.push('/error'); // Redireciona para a página de erro
                }
            } catch (error) {
                const status = error.response?.status;
                if (status === 401) {
                    router.push('/expirado');
                } else if (status === 404) {
                    router.push('/inexistente');
                } else {
                    router.push('/error');
                }
            } finally {
                setLoading(false); // Finaliza a requisição
            }
        };

        fetchData();
    }, [uuid, router]); // Executa a requisição sempre que o UUID mudar

    if (loading) {
        return (
            <div className='min-h-screen flex items-center justify-center flex-col gap-2 p-5'>
                <div className='border-2 border-transparent border-t-green-500 border-l-green-500 rounded-full min-h-8 min-w-8 animate-spin'></div>
                <span>Carregando avaliação...</span>
            </div>
        ); // Exibe a mensagem de carregamento
    }

    return null;
}
