import { Dimensions } from 'react-native';

// mailChimp info
const mailChimpInstance = ''
const mailChimpListId   = ''
const mailChimpApiKey   = ''

const {width: deviceWidth, height: deviceHeight} = Dimensions.get('window');

const settings = {


    mailChimp: {
        appSubscriber       : 'https://' + mailChimpInstance + '.api.mailchimp.com/3.0/lists/' + mailChimpListId +
        '/members',
        key                 : mailChimpApiKey,
        listId              : mailChimpListId,
        base64              : ''
    },

    videos: {

    },

    messages: {
        invalidPassword             : 'A senha precisa ter no mínimo 6 digitos',
        invalidEmail                : 'Email inválido',
        invalidInfo                 : 'Usuário ou senha invalidos',
        loginFailed                 : 'Tente logar novamente!',
        connectionError             : 'Erro de conexão',
        connectionErrorMessage      : 'Ocorreu algum erro de conexão. Verifique sua conexão com a internet!',
        faceConnectionError         : 'Error ao logar com facebook',
        faceConnectionErrorMessage  : 'Tente logar com o facebook novamente!',
        faceConnectionCancelMessage : 'Login Cancelado.',
        loginButton                 : 'Entrar',
        faceLoginButton             : 'Logar com facebook',
        registerButton              : 'Registrar',
        registerSuccess             : 'Conta Registrada com Sucesso! Aguarde o email de confirmação.',
        registerError               : 'Ocorreu algum erro ao registrar.',
        welcomeMessage              : 'Seja DenTop.',
    },

    dimensions: {
        deviceHeight : deviceHeight,
        deviceWidth  : deviceWidth,
        videoHeight  : Math.round((deviceWidth/16)*9)
    }

}

export default settings;