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

const Terms: NextPage = () => {
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
        <title>Terms of Service | Suske en Wiske API</title>
      </Head>

      <PageLayout>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            terms
          </Grid>
        </Grid>
      </PageLayout>
    </>
  );
};

export default Terms;
