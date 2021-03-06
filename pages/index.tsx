import { useRef, useState, FormEvent } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Grid, RestInput, Paper, Result, Typography } from '@components/.';
import { PageLayout } from '@components/layouts';
import { CreateUser } from '@features/.';

type errorProps = {
  error: string;
  message: string;
};

const Home: NextPage = () => {
  const searchRef = useRef<HTMLInputElement | null>(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState<errorProps | null>(null);

  const onSearch = async (e: FormEvent) => {
    e.preventDefault();

    const call = searchRef?.current?.value;

    const response = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/v1${call ? `/${call}` : ''}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status > 300) {
      setError({
        error: `${response.status}`,
        message: response.statusText,
      });
      setResult(null);
    } else {
      const data = await response.json();
      setError(null);
      setResult(data);
    }
  };

  return (
    <>
      <Head>
        <title>Suske en Wiske API</title>
      </Head>

      <PageLayout>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <form onSubmit={onSearch}>
              <RestInput inputRef={searchRef} />
            </form>
            <Paper>
              <Result>
                {error && JSON.stringify(error, null, 2)}
                {result && JSON.stringify(result, null, 2)}
              </Result>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Typography variant='h4'>Aanpassen data</Typography>
            <Typography>
              Het is ook mogelijk om data te editten.
              <br />
              je kunt een authorisatie code krijgen waarmee je ook de POST, PUT en DELETE endpoints
              kunt gebruiken.
              <br />
              Er wordt dan een aparte dataset voor je aangemaakt, waarmee je kunt werken en
              experimenteren. Hierdoor wordt Anderen zullen deze veranderingen niet zien. Je kunt
              dus met een gerust hart er op los expermenteren.
              <CreateUser />
            </Typography>
          </Grid>
        </Grid>
      </PageLayout>
    </>
  );
};

export default Home;
