import type { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { Grid } from '@components/.';
import { PageLayout } from '@components/layouts';
import SwaggerUI from 'swagger-ui-react';
import { createSwaggerSpec } from 'next-swagger-doc';
import 'swagger-ui-react/swagger-ui.css';

const Docs: NextPage = ({ spec }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>Docs | Suske en Wiske API</title>
      </Head>

      <PageLayout>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <SwaggerUI url={`${process.env.NEXT_PUBLIC_APIURL}/v1/swagger`} />
          </Grid>
        </Grid>
      </PageLayout>
    </>
  );
};

export default Docs;
