import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import appConfig from '../config.json'
import { useRouter } from 'next/router'
import React from 'react';
import Messages from '../components/Messages/Messages';
export default function ChatPage() {
    const router = useRouter();
    const [messages, setMessage] = React.useState([]);
    let username = router.query.username || 'larimoro20';
    return (
        <>
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '16px',
                    backgroundImage: 'url(https://images6.alphacoders.com/118/thumb-1920-1185407.jpg)',
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: {
                            xs: 'column',
                            sm: 'row',
                        },
                        width: '100%',
                        borderRadius: '5px', padding: '32px',
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        backgroundColor: appConfig.theme.colors.neutrals[700],
                    }}
                >
                    <Button
                        onClick={(e) => {
                            e.preventDefault
                            router.push('/')
                        }}
                        label='Voltar'
                        buttonColors={{
                            contrastColor: appConfig.theme.colors.neutrals["000"],
                            mainColor: appConfig.theme.colors.primary[200],
                            mainColorLight: appConfig.theme.colors.primary[400],
                            mainColorStrong: appConfig.theme.colors.primary[600],
                        }}
                    />
                    <Text variant="heading1" styleSheet={{ color: appConfig.theme.colors.neutrals[100], marginLeft: '50px' }}>Chat messages</Text>
                </Box>


                <Box tag='div'
                    styleSheet={{
                        width: '100%', maxWidth: '100%',
                        borderRadius: '5px', padding: '32px', margin: '16px',
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        backgroundColor: appConfig.theme.colors.neutrals[700],
                    }}>

                   
                       
                                <Messages itens={messages}/>
                                    
                               
                            
                    

                    <Box
                        as="form"
                        onSubmit={function handlAddMessage(e) {
                            e.preventDefault();
                            const dadosform = new FormData(e.target);
                            const message = {
                                text: dadosform.get('text'),
                                username: username
                            }
                            const newmessages = [...messages, message]
                            setMessage(newmessages)
                            console.log(newmessages)
                        }}

                    >
                        <TextField
                            label="Digite sua mensagem"
                            placeholder=""
                            name="text"
                            type="textarea"
                            variant="basicBordered"
                        />
                        <Box tag='div' styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'end'
                        }}>
                            <Button
                                onClick={(e) => {
                                    e.preventDefault
                                }}
                                type='submit'
                                label='Enviar'
                                buttonColors={{
                                    contrastColor: appConfig.theme.colors.neutrals["000"],
                                    mainColor: appConfig.theme.colors.primary[200],
                                    mainColorLight: appConfig.theme.colors.primary[400],
                                    mainColorStrong: appConfig.theme.colors.primary[600],
                                }}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>

        </>
    )
}