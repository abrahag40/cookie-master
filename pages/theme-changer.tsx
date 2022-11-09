import React, { ChangeEvent, FC, useState } from 'react'
import { Card, CardContent, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import { Layout } from '../components/layouts'
import Cookies from 'js-cookie'
import { GetServerSideProps } from 'next'
import axios from 'axios'

interface Props {
  theme: string;
}

const ThemeChangerPage: FC<Props> = ( { theme }: Props ) => {

  const [currentTheme, setCurrentTheme] = useState('light')

  const onThemeChange = ( event: ChangeEvent<HTMLInputElement> ) => {
    setCurrentTheme(event.target.value);
    Cookies.set('theme', event.target.value);
  }

  const onClick = async () => {
    const { data } = await axios.get('/api/hello');
  }

  return (
    <Layout>
      <Card>
        <CardContent>
          <FormControl>
            <FormLabel>Tema</FormLabel>
            <RadioGroup
              value={currentTheme}
              onChange={onThemeChange}
            >
              <FormControlLabel value='light' control={<Radio />} label='Light' />
              <FormControlLabel value='dark' control={<Radio />} label='Dark' />
              <FormControlLabel value='custom' control={<Radio />} label='Custom' />
            </RadioGroup>
          </FormControl>
        </CardContent>
      </Card>
    </Layout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  
  const { theme = 'light', name = 'No name' } = req.cookies;

  const validTheme = ['light', 'dark', 'custom'];

  return {
    props: {
      theme: validTheme.includes(theme) ? theme : 'dark',
    }
  }
}

export default ThemeChangerPage
