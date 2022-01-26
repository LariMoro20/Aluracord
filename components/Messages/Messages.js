import { Box, Text } from '@skynexui/components';
import appConfig from '../../config.json'
function MessageItem(props) {
    return (
        <Box tag='div'
            styleSheet={{
                width: '100%', maxWidth: '100%',
                borderRadius: '5px', padding: '10px', marginVertical: '10px',
                boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                backgroundColor: appConfig.theme.colors.neutrals[200],
            }}>
            <Text variant='body3'>@{props.username}</Text><br/>
            <Text variant='body4'>{props.text}</Text>
        </Box>
    )
}

export default function Messages(props) {
    return (
        <Box tag='div'
            styleSheet={{
                width: '100%', maxWidth: '100%', height: "250px", overflow: 'auto',
                borderRadius: '5px', padding: '10px', marginVertical: '10px',
                boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                backgroundColor: appConfig.theme.colors.transparents[500],
            }}>
            {props.itens.length >0 ? '' : 'Sem mensagens'}
            {props.itens.map((msg) => {
                return (
                    <MessageItem text={msg.text} username={msg.username}/>
                )
            })}
        </Box>
    )
}