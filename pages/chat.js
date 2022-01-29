import { Box, Button, Text, TextField } from '@skynexui/components';
import appConfig from '../config.json'
import { useRouter } from 'next/router'
import React from 'react';
import moment from 'moment';
import { destroyCookie, parseCookies } from "nookies";
import { IoMdSend } from "react-icons/io";
import { createClient } from '@supabase/supabase-js'
import Messages from '../components/Messages/Messages';
import { ButtonSendSticker } from '../components/ButtonSendSticker'



export default function ChatPage(props) {
    const supabaseUrl = props.SUPABASE_URL;//'https://egasluadiupoacklwswi.supabase.co'
    const supabaseKey = props.SUPABASE_KEY;//'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMyMDE0OCwiZXhwIjoxOTU4ODk2MTQ4fQ.AUND2te685ycqKXeuzDkrnhT92Wz-l-GCxAble6LCc0'
    const supabase = createClient(supabaseUrl, supabaseKey)
    const router = useRouter();
    const [message, setMessage] = React.useState('');
    const [error, setError] = React.useState('');
    const [messages, setMessages] = React.useState([]);
    let username = router.query.username || 'larimoro20';
    
    function escutaEmTempoReal(response) {
        supabase
            .from('messages')
            .on('INSERT', (resp) => {
                response(resp)
            }).on('DELETE', (resp) => {
                response(resp.old.id)
            }).subscribe();
    }
    

    React.useEffect(() => {
        supabase.from('messages')
            .select('*')
            //.order('id', {ascending: false})
            .then(({ data }) => {
                data.map((e) => {
                    e.created_at = moment(e.created_at).format("D/MM/Y H:mm")
                })
                setMessages(data)
            })

        const subscribe = escutaEmTempoReal((response) => {
            if (response.eventType === "INSERT") {
                response.new.created_at = moment(response.new.created_at).format("D/MM/Y H:mm")
                setMessages((valorAtual) => {
                    return [
                        ...valorAtual,
                        response.new
                    ]
                })
            } else {
                setMessages((valorAtualDaListaMensagens) =>
                    valorAtualDaListaMensagens.filter(
                        (mensagem) => mensagem.id !== response
                    )
                )
            }
        })
        setMessage('')

        return () => subscribe.unsubscribe();

    }, []);

    function logout() {
        destroyCookie(null, "aluravis_user");
        router.push("/");
    }

    function remove(id) {
        supabase
            .from('messages')
            .delete()
            .match({ id }).then(({ data }) => {
            })
    }

    function handleSaveMessage(message) {
        if (message !== '') {
            const newmessage = {
                text: message,
                from: username,
            }
            supabase.from('messages')
                .insert([newmessage])
                .then(({ data }) => {
                })
        } else {
            setError('Digite uma mensagem')
        }
    }

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
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: {
                            xs: 'column',
                            sm: 'row',
                        },
                        width: '100%',
                        borderRadius: '5px', padding: '22px',
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        backgroundColor: appConfig.theme.colors.neutrals[700],
                    }}
                >
                    <Text variant="heading3" styleSheet={{ color: appConfig.theme.colors.neutrals[100], marginLeft: '50px' }}>Chat messages [ {username} ]</Text>
                    <Button
                        onClick={(e) => {
                            e.preventDefault
                            logout()
                        }}
                        label='Logout'
                        buttonColors={{
                            contrastColor: appConfig.theme.colors.neutrals["000"],
                            mainColor: appConfig.theme.colors.primary[200],
                            mainColorLight: appConfig.theme.colors.primary[400],
                            mainColorStrong: appConfig.theme.colors.primary[600],
                        }}
                    />

                </Box>


                <Box tag='div'
                    styleSheet={{
                        width: '100%', maxWidth: '100%',
                        borderRadius: '5px', padding: '32px', margin: '16px',
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        backgroundColor: appConfig.theme.colors.neutrals[700],
                    }}>

                    <Messages itens={messages} userlogged={username} removeMessage={remove} />

                    <Box
                        styleSheet={{
                            display: 'flex', alignItems: 'center'
                        }}
                        as="form"
                        onSubmit={function handlAddMessage(e) {
                            e.preventDefault();
                            handleSaveMessage(message)
                        }}
                        className='chat_messageArea'
                    >

                        <input
                            className='chat_messageArea-input'
                            label="Digite sua mensagem"
                            value={message}
                            onChange={(e) => {
                                setMessage(e.target.value)
                            }}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault()
                                    handleSaveMessage(message)
                                }
                            }}
                            name="text"
                            type="textarea"
                            variant="basicBordered"
                        />
                        <ButtonSendSticker onStickerClick={(sticker) => {
                            handleSaveMessage(':sticker:' + sticker)
                        }} />

                        <Box tag='div' styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'end'
                        }}>
                            <button
                                onClick={(e) => {
                                    e.preventDefault
                                }}
                                type='submit'

                                className='chat_messageArea-btn'
                            > <IoMdSend size={`2.2rem`} color="#E2E8F0" /></button>
                        </Box>
                    </Box>
                    <Text styleSheet={{ color: appConfig.theme.colors.primary[700] }}>{error}</Text>
                </Box>
            </Box>

        </>
    )
}

export async function getServerSideProps() {
   const {SUPABASE_KEY, SUPABASE_URL  } = process.env;
   return { props: { SUPABASE_KEY, SUPABASE_URL } }
}