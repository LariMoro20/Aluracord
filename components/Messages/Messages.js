import { Box, Button, Text, Icon, Image } from '@skynexui/components';
import appConfig from '../../config.json'
import { IoMdSend, IoMdTrash } from "react-icons/io";

function MessageItem(props) {
   // const [src, setSrc] = React.useState(props.src);
    return (
        
        <Box tag='div'
            styleSheet={{
                width: '100%', maxWidth: '100%',
                borderRadius: '5px', padding: '5px 10px 5px 10px', marginVertical: '10px',
                boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                backgroundColor: appConfig.theme.colors.transparents[200],
            }}>
            <Box tag='div'
                styleSheet={{
                    width: '100%', maxWidth: '100%',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                <Box tag='div'
                    styleSheet={{
                        width: '100%', maxWidth: '100%',
                        display: 'flex', alignItems: 'center',

                    }}>
                    <Image
                        styleSheet={{
                            borderRadius: '50%',
                            width: '30px',
                            marginRight: '10px'
                        }}
                        src={ `https://github.com/${props.from.replace(' ', '')}.png` || 'images/theme/zule.jpg'}
                        onError={()=>{
                            //setImgSrc('images/theme/zule.jpg');
                            
                        }}
                    />

                    <Text variant='body3' styleSheet={{ color: appConfig.theme.colors.primary[600] }}>@{props.from} - {props.data} </Text>
                </Box>
                {props.userlogged == props.from && <button
                    onClick={() => { props.removeMessage(props.id) }}

                    className='chat_messageArea-btn'
                > <IoMdTrash size={`1.2rem`} color={ appConfig.theme.colors.primary[100] } /></button>}

            </Box>
            <Text variant='body4'>
                {props.text.startsWith(':sticker:') ? (
                    <Image styleSheet={{ maxWidth: '200px', padding: '10px' }} src={props.text.replace(':sticker:', '')} />
                ) : (
                    props.text
                )}

            </Text>
        </Box>
    )
}

export default function Messages(props) {

    return (
        <Box tag='div'
            styleSheet={{
                width: '100%', maxWidth: '100%', height: "60vh", overflow: 'auto',
                borderRadius: '5px', padding: '10px', marginVertical: '10px',
                boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                backgroundColor: appConfig.theme.colors.transparents[500],
            }}>
            {props.itens.length > 0 ? '' : 'Sem mensagens'}
            {props.itens.map((msg) => {
                return (
                    <MessageItem text={msg.text} from={msg.from} key={msg.id} id={msg.id} data={msg.created_at} userlogged={props.userlogged} removeMessage={props.removeMessage} />
                )
            })}
        </Box>
    )
}