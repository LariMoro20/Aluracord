import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import { useRouter } from 'next/router'
import appConfig from '../config.json'

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

                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: {
                            xs: 'column',
                            sm: 'row',
                        },
                        width: '100%', maxWidth: '700px',
                        borderRadius: '5px', padding: '32px', margin: '16px',
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        backgroundColor: appConfig.theme.colors.transparents[700],
                        textAlign: 'center'
                    }}
                >
                    <h1 style={{ color: appConfig.theme.colors.neutrals[100], fontSize: '100px' }}>404</h1>
                    <h2 style={{ color: appConfig.theme.colors.neutrals[100] }}>É, parece que esta página não existe</h2>
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