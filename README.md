# Example for Question

To run:

```
deno task start
```

The project has a single web page with two sets of buttons to start serving
Server-Sent Events every two seconds with the current time.

## First set of buttons

The first set of buttons is verbatim from the documentation at
[https://data-star.dev/reference/actions#request-cancellation](https://data-star.dev/reference/actions#request-cancellation)

Clicking the button will start the stream, and clicking the cancel button will
cancel the stream.

Clicking the button again will restart the stream, but clicking the cancel
button again will not stop  the stream, as the controller has already been
used. It will continue to update the UI.

Also, clicking the button repeatedly will not cancel the in progress stream, but
will keep creating more. This can be seen by the time updating more frequently
than every two seconds.

## Second set of buttons

The second set of buttons is a modified implementation, A new controller is
created each time, ensuring it can be cancelled more than once.

The controller is aborted and created before each click ensuring there are not
multiple streams by having the following on the click:

```
$controller2.abort(); 
$controller2 = new AbortController();
@get('/endpoint', {requestCancellation: $controller2});
```

The documentation states:

> By default, when a new fetch request is initiated on an element, any existing
> request on that same element is automatically cancelled. This prevents
> multiple concurrent requests from conflicting with each other and ensures
> clean state

Is this not true for an SSE request, or am I doing something wrong?
