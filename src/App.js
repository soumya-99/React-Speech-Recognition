import { useState } from "react"
import { Route, Link, Redirect, Switch } from "react-router-dom"
import SpeechRecognition, {
	useSpeechRecognition,
} from "react-speech-recognition"
import Blog from "./components/Blog"
import Contact from "./components/Contact"
import Home from "./components/Home"
import NewBlogPost from "./components/NewBlogPost"

function App() {
	const commands = [
		{
			command: ["Go to *", "Open *"],
			callback: (redirectPage) => setRedirectUrl(redirectPage),
		},
	]

	const { transcript } = useSpeechRecognition({ commands })

	const [redirectUrl, setRedirectUrl] = useState("")

	const pages = ["home", "blog", "new blog", "contact"]
	const urls = {
		homw: "/",
		blog: "/blog",
		"new blog post": "/blog/new",
		contact: "/contact",
	}

	if (!SpeechRecognition.browserSupportsSpeechRecognition) return null

	let redirect = ""

	if (redirectUrl) {
		if (pages.includes(redirectUrl))
			redirect = <Redirect to={urls[redirectUrl]} />
		else {
			;<p>Couldn't Find Page: {redirectUrl}</p>
		}
	}

	return (
		<div className="App">
			<div id="links">
				<Link to="/">Home</Link>
				<Link to="/blog">Blog</Link>
				<Link to="/blog/new">New Blog</Link>
				<Link to="/contact">Contact</Link>
			</div>

			<Switch>
				<Route path="/" component={Home} exact />
				<Route path="/blog/new" component={NewBlogPost} />
				<Route path="/blog" component={Blog} />
				<Route path="/contact" component={Contact} />
				{redirect}
			</Switch>

			<p id="transcirpt">Transcript: {transcript}</p>
			<button onClick={SpeechRecognition.startListening}>Start</button>
		</div>
	)
}

export default App
