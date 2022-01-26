import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import { useRouter } from 'next/router'
import appConfig from '../config.json'
import Titulo from '../components/Titulos';

// export default HomePage
export default function Pagina404() {
    const router = useRouter();

    return (
        <>
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: appConfig.theme.colors.primary[500],
                    backgroundImage: 'url(images/backgrounds/back-vis404.jpg)',
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                }}
            >
                <Box

                    styleSheet={{
                        width: '100%', maxWidth: '700px',
                        borderRadius: '5px', padding: '32px', margin: '16px',
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        backgroundColor: appConfig.theme.colors.transparents[700],
                        textAlign: 'center'
                    }}
                >
                    <Text variant="heading1" styleSheet={{ color: appConfig.theme.colors.neutrals[100] }}>404</Text><br/> 
                    <Text variant='body1' styleSheet={{ color: appConfig.theme.colors.neutrals[100] }}>É, parece que esta página não existe</Text><br/> 
                    <Button label="Voltar para o início"
                        styleSheet={{ marginTop: '10px' }}
                        buttonColors={{
                            contrastColor: appConfig.theme.colors.neutrals["000"],
                            mainColor: appConfig.theme.colors.primary[200],
                        }}
                        onClick={(e) => {
                            e.preventDefault
                            router.push('/')
                        }} />
                </Box>
            </Box>
        </>
    );
}