import React from "react";
import Authentication from "../helpers/Authentication";

export default class App extends React.Component {
  state = {
    finishedLoading: false,
    theme: "light",
    isVisible: true
  };

  constructor(props) {
    super(props);
    this.Authentication = new Authentication();
  }

  contextUpdate(context, delta) {
    if (delta.includes("theme")) {
      this.setState(() => {
        return { theme: context.theme };
      });
    }
  }

  visibilityChanged(isVisible) {
    this.setState(() => {
      return {
        isVisible
      };
    });
  }

  componentDidMount() {
    this.twitch = window.Twitch ? window.Twitch.ext : null;

    if (this.twitch) {
      this.twitch.onAuthorized(async auth => {
        this.Authentication.setToken(auth.token, auth.userId);

        if (!this.state.finishedLoading) {
          // Do some init work...

          this.setState({
            finishedLoading: true
          });
        }
      });

      this.twitch.listen("broadcast", (target, contentType, body) => {
        console.debug(
          `Message received for ${target} (${contentType}): ${body}`
        );
        // Do some more work...
      });

      this.twitch.onVisibilityChanged((isVisible, _c) => {
        this.visibilityChanged(isVisible);
      });

      this.twitch.onContext((context, delta) => {
        this.contextUpdate(context, delta);
      });
    }
  }

  componentWillUnmount() {
    if (this.twitch) {
      this.twitch.unlisten("broadcast", () =>
        console.debug("Successfully unlistened")
      );
    }
  }

  render() {
    if (this.state.finishedLoading && this.state.isVisible) {
      return (
        <div className="App">
          <div
            className={this.state.theme === "light" ? "App-light" : "App-dark"}
          >
            <p>Hello world!</p>
            <p>My token is: {this.Authentication.state.token}</p>
            <p>My opaque ID is {this.Authentication.getOpaqueId()}.</p>
            <div>
              {this.Authentication.isModerator() ? (
                <p>
                  I am currently a mod, and here's a special mod button&nbsp;
                  <input value="mod button" type="button" />
                </p>
              ) : (
                "I am currently not a mod."
              )}
            </div>
            <p>
              I have&nbsp;
              {this.Authentication.hasSharedId()
                ? `shared my ID, and my user_id is ${this.Authentication.getUserId()}`
                : "not shared my ID"}
              .
            </p>
          </div>
        </div>
      );
    } else {
      return <div className="App"></div>;
    }
  }
}
