import "../styles/globals.css";
import { wrapper } from "../store.js";
// import {Provider} from 'react-redux'

function MyApp({ Component, pageProps }) {
	// return <Provider store={store}><Component {...pageProps} /></Provider>
	return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
