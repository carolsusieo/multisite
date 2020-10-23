import React, {Component} from "react";
import ReactDOM from "react-dom";
import "./App.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Auth0Provider } from "./src_auth0/react-auth0-spa";
import { DataProvider } from "./ctrl/DataController";
import config from "./src_auth0/auth_config.json";
import history from "./src_auth0/utils/history";


//import { StyleSheet, css } from 'aphrodite';

const onRedirectCallback = appState => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

ReactDOM.render(

  <Auth0Provider
    domain={config.domain}
    client_id={config.clientId}
    redirect_uri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
  >
  <DataProvider>
    <App />
  </DataProvider>
  </Auth0Provider>,
  document.getElementById("root")
);


/*
// test aphrodite
class AppA extends Component {
    render() {
        return <div>
            <span className={css(styles2.red)}>
                This is red.
            </span>
            <span className={css(styles2.hover)}>
                This turns red on hover.
            </span>
            <span className={css(styles2.small)}>
                This turns red when the browser is less than 600px width.
            </span>
            <span className={css(styles2.red, styles2.blue)}>
                This is blue.
            </span>
            <span className={css(styles2.blue, styles2.small)}>
                This is blue and turns red when the browser is less than
                600px width.
            </span>
        </div>;
    }
}

const styles2 = StyleSheet.create({
    red: {
        backgroundColor: 'red'
    },

    blue: {
        backgroundColor: 'blue'
    },

    hover: {
        ':hover': {
            backgroundColor: 'red'
        }
    },

    small: {
        '@media (max-width: 600px)': {
            backgroundColor: 'red',
        }
    }
});




class AppAphrodite extends Component {
    render() {
        return <Marker styles={[styles.large, styles.red]} />;
    }
}





class Marker extends Component {
    render() {
        // css() accepts styles, arrays of styles (including nested arrays),
        // and falsy values including undefined.
        return <div className={css(styles.marker, this.props.styles)} />;
    }
}

const styles = StyleSheet.create({
    red: {
        backgroundColor: 'red'
    },

    large: {
        height: 20,
        width: 20
    },

    marker: {
        backgroundColor: 'blue'
    }
});


ReactDOM.render(<AppAphrodite/>, document.getElementById('root'));
*/


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
