import {useNonce, getShopAnalytics, Analytics} from '@shopify/hydrogen';
import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  useRouteError,
  useRouteLoaderData,
  ScrollRestoration,
  isRouteErrorResponse,
  type ShouldRevalidateFunction,
} from '@remix-run/react';
import favicon from '~/assets/favicon.svg';
// import resetStyles from '~/styles/reset.css?url';
// import appStyles from '~/styles/app.css?url';
import tailwindCss from './styles/tailwind.css?url';
import {IonHaL} from './components/ionhal';
import {FOOTER_QUERY, HEADER_QUERY} from '~/lib/fragments';
import deshea_pissing from '~/assets/deshea3.png';

export type RootLoader = typeof loader;

/**
 * This is important to avoid re-fetching root queries on sub-navigations
 */
export const shouldRevalidate: ShouldRevalidateFunction = ({
  formMethod,
  currentUrl,
  nextUrl,
  defaultShouldRevalidate,
}) => {
  // revalidate when a mutation is performed e.g add to cart, login...
  if (formMethod && formMethod !== 'GET') return true;

  // revalidate when manually revalidating via useRevalidator
  if (currentUrl.toString() === nextUrl.toString()) return true;

  return defaultShouldRevalidate;
};

export function links() {
  return [
    {rel: 'stylesheet', href: tailwindCss},
    //TODO: Milo: look at how they use these and bring them back... they're best practice
    // {rel: 'stylesheet', href: resetStyles},
    // {rel: 'stylesheet', href: appStyles},
    {
      rel: 'preconnect',
      href: 'https://cdn.shopify.com',
    },
    {
      rel: 'preconnect',
      href: 'https://shop.app',
    },
    {rel: 'icon', type: 'image/svg+xml', href: favicon},
  ];
}

export async function loader(args: LoaderFunctionArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  const {storefront, env} = args.context;

  return defer({
    ...deferredData,
    ...criticalData,
    publicStoreDomain: env.PUBLIC_STORE_DOMAIN,
    shop: getShopAnalytics({
      storefront,
      publicStorefrontId: env.PUBLIC_STOREFRONT_ID,
    }),
    consent: {
      checkoutDomain: env.PUBLIC_CHECKOUT_DOMAIN,
      storefrontAccessToken: env.PUBLIC_STOREFRONT_API_TOKEN,
      withPrivacyBanner: false,
      // localize the privacy banner
      country: args.context.storefront.i18n.country,
      language: args.context.storefront.i18n.language,
    },
  });
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context}: LoaderFunctionArgs) {
  const {storefront} = context;

  //TODO: change this to only query the brand logo and maybe the tunes
  // so ricky has more flexibility
  const [header] = await Promise.all([
    storefront.query(HEADER_QUERY, {
      cache: storefront.CacheLong(),
      variables: {
        headerMenuHandle: 'main-menu', // Adjust to your header menu handle
      },
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {header};
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: LoaderFunctionArgs) {
  // NOTE: We need to query the cart for analytics even though we don't use it
  const {cart} = context;

  return {
    cart: cart.get(),
  };
}

export function Layout({children}: {children?: React.ReactNode}) {
  const nonce = useNonce();
  const data = useRouteLoaderData<RootLoader>('root');

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {data ? (
          <Analytics.Provider
            cart={data.cart}
            shop={data.shop}
            consent={data.consent}
          >
            <IonHaL> {children} </IonHaL>
          </Analytics.Provider>
        ) : (
          children
        )}
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();
  let errorMessage = 'Unknown error';
  let errorStatus = 500;

  if (isRouteErrorResponse(error)) {
    errorMessage = error?.data?.message ?? error.data;
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div
      className="w-full h-[100vh] gap-[25px] flex flex-col justify-center items-center text-black pb-[50px] font-[Montserrat]"
      id="route-error"
    >
      <div
        className="w-full flex flex-col justify-center items-center"
        id="route-error-header"
      >
        {}
        <h1 className="text-[#ff4747] font-bold text-[30px]">Oopsie!</h1>
        <h2 className="font-normal">Deshea don&apos;t f*ck w u.</h2>
      </div>
      <div className="w-full h-[300px] box-border flex justify-center align-center">
        <img
          className="object-contain w-full h-full"
          src={deshea_pissing}
          alt="Desehea"
        />
      </div>
      <div
        className="w-full flex flex-col justify-center items-center"
        id="route-error-footer"
      >
        {errorMessage && (
          <fieldset className="w-[400px]">
            <pre className="flex justify-center items-center">
              <p
                className="w-[350px] text-center text-[#ff4747] text-xs"
                style={{whiteSpace: 'normal'}}
              >
                ERROR {errorStatus}: {errorMessage}
              </p>
            </pre>
          </fieldset>
        )}
      </div>
    </div>
  );
}
