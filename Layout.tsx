import type { FC } from "hono/jsx";

export const Layout: FC = () => {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <title>SSE Sample</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bulma@1.0.2/css/bulma.min.css"
        />

        <script
          type="module"
          src="https://cdn.jsdelivr.net/gh/starfederation/datastar@main/bundles/datastar.js"
        >
        </script>
      </head>

      <body>
        <section class="section">
          <div class="container">
            <h1 class="title">
              SSE Sample
            </h1>
            <div class="columns">
              <div class="column">
                <p class="subtitle">
                  Example from{" "}
                  <a href="https://data-star.dev/reference/actions#request-cancellation">
                    Data Star Docs
                  </a>
                </p>
                <div data-signals-controller="new AbortController()">
                  <button
                    type="button"
                    class="button"
                    data-on-click="@get('/endpoint', {requestCancellation: $controller});"
                  >
                    Start Request
                  </button>

                  <button
                    type="button"
                    class="button"
                    data-on-click="$controller.abort();"
                  >
                    Cancel Request
                  </button>
                </div>
              </div>
              <div class="column">
                <p class="subtitle">
                  Click safe version
                </p>
                <div data-signals-controller2="new AbortController()">
                  <button
                    type="button"
                    class="button"
                    data-on-click="
              $controller2.abort(); 
              $controller2 = new AbortController();
              @get('/endpoint', {requestCancellation: $controller2});"
                  >
                    Start Request
                  </button>

                  <button
                    type="button"
                    class="button"
                    data-on-click="$controller2.abort(); $controller2 = new AbortController();"
                  >
                    Cancel Request
                  </button>
                </div>
              </div>
            </div>
            <div class="box">
              <div id="messageDiv">Updates go here</div>
            </div>
          </div>
        </section>
      </body>
    </html>
  );
};
