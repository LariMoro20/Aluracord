import Head from 'next/head';
function GlobalStyle() {
  return (
    <style global jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          list-style: none;
        }
        body {
          font-family: 'Open Sans', sans-serif;
        }
        /* App fit Height */ 
        html, body, #__next {
          min-height: 100vh;
          display: flex;
          flex: 1;
        }
        .chat_messageArea{
          background: #2d3748;
          border-radius: .4rem;
          display: flex;
          align-items: center;
        }
        .chat_messageArea-btn{
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 0;
          padding: 1rem;
          border-radius: 50%;
          background: none;
          transition: opacity .2s ease-in-out;
        }
        .chat_messageArea-input{
          width: 100%;
          resize: none;
          padding: 1.2rem 1.8rem;
          outline: none;
          border-radius: .4rem;
          border: none;
          background: #2d3748;
          color: #cbd5e0;
        }
        #__next {
          flex: 1;
        }
        #__next > * {
          flex: 1;
        }
        /* ./App fit Height */ 
      `}</style>
  );
}

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Aluracord - Larissa Santos</title>
        <link rel="shortcut icon" href="https://aluracord-larimoro20.vercel.app/favicon.ico" />
        <meta charset="utf-8" />
        <meta http-equiv="content-language" content="pt-br" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <meta name="description" content="Aplicação de chat, semelhante ao discord, desenvolvida em React" />
        <meta name="author" content="Larissa Moro S. Santos" />
        <meta name="keywords" content="imersao, react, alura, curso, resultado" />
        <meta name="copyright" content="© 2022 Larissa Santos" />

        <meta property="og:title" content="Aluracord - Larissa Santos" />
        <meta property="og:description" content="Aplicação de chat, semelhante ao discord, desenvolvida em React" />
        <meta property="og:url" content="https://aluracord-larimoro20.vercel.app/" />
        <meta property="og:image" content="https://aluracord-larimoro20.vercel.app/favicon.ico" />
      </Head>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  )
}