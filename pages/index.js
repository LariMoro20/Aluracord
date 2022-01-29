import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import { parseCookies, setCookie } from "nookies";
import { useRouter } from 'next/router'
import appConfig from '../config.json'
import Titulo from '../components/Titulos';

// export default HomePage
export default function PaginaInicial() {
    const [username, setUsername] = React.useState('')
    const [location, setLocation] = React.useState('');
    const [followers, setFollowers] = React.useState('');
    const [bio, setBio] = React.useState('');
    const [error, setError] = React.useState('');
    const [cont, setCont] = React.useState(0);
    const router = useRouter();

    function getDataFromGithub() {
        if (username.length > 2) {
            fetch(`https://api.github.com/users/${username}`)
                .then((res) => {
                    return res.json()
                }).then((respComplete) => {
                    if (respComplete.message) {
                        if (cont === 0) { setError(`Houve algum erro, tente mais tarde..`); }
                        else { setError(`Houve algum erro, tente mais tarde.. (${cont})`) }
                        setCont(cont + 1)
                    } else {
                        setError('')
                        setFollowers(respComplete.followers)
                        setLocation(respComplete.location)
                        setBio(respComplete.bio)
                    }
                }).catch((error) => {
                    throw error
                });
        }
    }
    function doLogin() {
        fetch(`https://api.github.com/users/${username}`)
            .then((res) => {
                return res.json()
            }).then((respComplete) => {
                if (respComplete.message) {
                    setError('Usuario invalido')
                } else {
                     /*setCookie(null, "aluravis_user", username, {
                        maxAge: 86400 * 30,
                        path: "/",
                      });
                      router.push("/chat");*/
                   router.push({
                        pathname: '/chat',
                        query: { username: username }
                    })
                }
            })
    }

    return (
        <>
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: appConfig.theme.colors.primary[500],
                    backgroundImage: 'url(images/backgrounds/back-vis.jpg)',
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: {
                            xs: 'column',
                            sm: 'row',
                        },
                        width: '100%', maxWidth: '700px',
                        borderRadius: '5px', padding: '32px', margin: '16px',
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        backgroundColor: appConfig.theme.colors.neutrals[700],
                    }}
                >
                    {/* Formulário */}
                    <Box
                        as="form"
                        onSubmit={(e) => {
                            e.preventDefault()
                            doLogin()

                        }}
                        styleSheet={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
                        }}
                    >
                        <Titulo tag="h2">Boas vindas de volta!</Titulo>
                        <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
                            {appConfig.name}
                        </Text>
                        <TextField
                            value={username}
                            placeholder='larimoro20'
                            fullWidth
                            textFieldColors={{
                                neutral: {
                                    textColor: appConfig.theme.colors.neutrals[200],
                                    mainColor: appConfig.theme.colors.neutrals[900],
                                    mainColorHighlight: appConfig.theme.colors.primary[500],
                                    backgroundColor: appConfig.theme.colors.neutrals[800],
                                },
                            }}
                            onChange={(e) => {
                                setUsername(e.target.value)
                            }}
                        />
                        <Button
                            type='submit'
                            label='Entrar'
                            disabled={username.length <= 2 ? true : false}
                            fullWidth
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[200],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[600],
                            }}
                        />
                    </Box>
                    {/* Formulário */}


                    {/* Photo Area */}
                    <Box
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxWidth: '200px',
                            padding: '16px',
                            backgroundColor: appConfig.theme.colors.neutrals[800],
                            border: '1px solid',
                            borderColor: appConfig.theme.colors.neutrals[999],
                            borderRadius: '10px',
                            flex: 1,
                            minHeight: '240px',
                        }}
                    >
                        <Image
                            styleSheet={{
                                borderRadius: '50%',
                                marginBottom: '16px',
                            }}
                            src={`${username.length > 2 ? `https://github.com/${username}.png` : 'images/theme/zule.jpg'}`}
                        />
                        <Text
                            variant="body4"
                            styleSheet={{
                                color: appConfig.theme.colors.neutrals[200],

                                padding: '10px 10px',
                                borderRadius: '1000px',
                                textAlign: 'center'
                            }}
                        >
                            <h3 style={{ marginBottom: '5px' }}>{`${username.length > 2 ? `@${username}` : 'Digite seu usuario'}`}</h3>
                            {(followers && !error) &&
                                <div className='col-md-12'>
                                    <small style={{ marginBottom: '5px' }}> {bio} </small>
                                    <p style={{ marginBottom: '5px' }}>  <br /> Seguidores: {followers} <br /> {location}</p>
                                </div>
                            }

                            <div className='col-md-12'>
                                <p style={{ marginBottom: '5px' }}> {error} </p>
                            </div>


                            <Button label="Carregar dados"
                                buttonColors={{
                                    contrastColor: appConfig.theme.colors.neutrals["000"],
                                    mainColor: appConfig.theme.colors.primary[100],
                                }}
                                onClick={(e) => {
                                    e.preventDefault()
                                    getDataFromGithub()
                                }} />
                        </Text>
                    </Box>
                    {/* Photo Area */}
                </Box>
            </Box>
        </>
    );
}