import { useEffect, useState } from 'react'
import type { AppProps } from 'next/app'
import { CssBaseline, Theme } from '@mui/material'
import { ThemeProvider } from '@emotion/react'
import Cookies from 'js-cookie';
import { customTheme, darkTheme, lightTheme } from '../themes'

interface Props extends AppProps {
  theme: string;
}

function App({ Component, pageProps, theme = 'dark' }: Props) {

  const [currentTheme, setCurrentTheme] = useState(lightTheme);

  useEffect(() => {
    const cookieTheme = Cookies.get('theme') || 'light';
    const selectedTheme: Theme = cookieTheme === 'light'
      ? lightTheme
      : (cookieTheme === 'darks')
        ? darkTheme
        : customTheme;
    setCurrentTheme(selectedTheme)
  }, [])
  
  return (
    <ThemeProvider theme={ currentTheme }>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

// App.getInitialProps = async( appContext: AppContext ) => {
  
//   const { theme } = appContext.ctx.req ? ( appContext.ctx.req as any ).cookies : { theme: 'light' };
//   const validTheme = ['light', 'dark', 'custom'];

//   return {
//     theme: validTheme.includes(theme) ? theme : 'dark',
//   }
// }

export default App
