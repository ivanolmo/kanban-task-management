// src/pages/_app.tsx
import { httpBatchLink } from '@trpc/client/links/httpBatchLink';
import { loggerLink } from '@trpc/client/links/loggerLink';
import { withTRPC } from '@trpc/next';
import { AppProps } from 'next/app';
import superjson from 'superjson';

import { UserContextProvider } from 'src/context/UserContext';
import Header from '@/components/Header';
import type { AppRouter } from '../server/router/app.router';
import { getBaseUrl } from 'src/utils/getBaseUrl';
import '../styles/globals.scss';
import { trpc } from '@/utils/trpc';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { data, error, isLoading } = trpc.useQuery(['users.me']);
  console.table({ data, error, isLoading });
  return (
    <UserContextProvider value={data}>
      <Header />
      <Component {...pageProps} />
    </UserContextProvider>
  );
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = `${getBaseUrl()}/api/trpc`;

    return {
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === 'development' ||
            (opts.direction === 'down' && opts.result instanceof Error),
        }),
        httpBatchLink({ url }),
      ],
      url,
      transformer: superjson,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },

      // To use SSR properly you need to forward the client's headers to the server
      // headers: () => {
      //   if (ctx?.req) {
      //     const headers = ctx?.req?.headers;
      //     delete headers?.connection;
      //     return {
      //       ...headers,
      //       "x-ssr": "1",
      //     };
      //   }
      //   return {};
      // }
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp);
