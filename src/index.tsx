/* @refresh reload */
import { render } from 'solid-js/web'

import './normalize.css'
import './index.css'
import App from "./App.tsx";

const root = document.getElementById('root')

render(() => <App />, root!)
