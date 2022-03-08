{
    accessToken : <any>,
    profile:{
        name : <String>,
        email: <String>,
        phone: <Number>,
        password: <any>,
    },
    wallet:{
        balance: <Number>
    }
}

You cant import a default export as named export and vice-versa.

when making requests to local server from expo app, always consider that the app is running on your phone
which is a seperate device from your laptop. The request is actually made from your phone not laptop.
so making a request to localhost will make the request to the localhost of the phone not that of the laptop.
to make a request to the localhost of the laptop, youll have to make a request to the ip address of the laptop.
the reason it works is because the phone and laptop are connected on the same local network (wifi or usd).
so making request from the phone to the ip address of the laptop is possible.

When you run `expo start`, a server is spin up on the laptop's localhost.
Now when you connect your phone and laptop through usb or wifi, and open the Expo client, the Expo client
simply connects to the server on your laptop through the ip address of your laptop. thats why its showing 
as `192.168.43....`. Expo client has access to your laptop local server through the connection btw the phone
and laptop (wi-fi or usb). So in order to make request from your expo app to laptop server, youll have to make itsto the laptop's
ip address.

Axios will normally `throw` an error for any response status not 2xx and what it throws is an object
which when you log to console, would be a string.
Axios `returns` an object when the request satisfies without error.
Assuming `error` to be a placeholder for the error object thrown by axios,
`error.response` and `error.request` will be populated if the request reached the server but server responded with error status.
there is also data key in the response for data from server.
`error.request` will be populated if the request didnt reach the server for some reasons (internet connection, timeouts, etc).
there wont be data key in request, and `error.response` will be undefined.
`error.message` will be populated if the request wasnt properly created due to some config error or so.

export {...} is means of exporting multiple bindings, not exporting an object;

adding cancelToken to axios instance will make an adapter unable to make request more than once.
because when the adapter makes a request the first time, and cancels it; the axios instance would mark
that request as cancelled togethr with its token. so when the adapter tries to make subsequent requests,
the adapter wont generate a new cancelToken, therefore the axios instance will still take the request as
cancelled by of the old token, so that request wont go through.

A VM is a contextual environment that can be created to run your code with its own `globals` defined.
which means code executed in a VM will have those globals accessible. more like a mini Virtual Machine.

Jest runs your tests inside a node VM, with jests methods like `describe` put into the global object or
context of the VM, so its accessible to your tests.

`require` function returns an ID e.g 1; that can be passed to source of `Image`.
it doesn't return a blob.

`source.uri` of Image component is used for rendering network images.

onMoveShouldSetPanResponder returning true is just like saying, when you notice a touch move on your surface area,
take the responsibility of responding to the gesture.

onStartShouldSetPanResponder returning true is just like saying, when you notice a touch start on your surface area,
take the responsibility of responding to the gesture.

onMoveShouldSetPanResponderCapture returning true is like saying, make sure you're the responder of the gesture, even
tho, the event should bubble up to you (i.e the deepest component should first be asked if it wants to become the responder)

onPanResponderTerminationRequest returning true is just like saying, when the touch has entered another components
surface, and that component wants to handle the gesture, hand over the response responsibility to that component.

onPanResponderGrant will be called when the component has finally taken the responsibility to handle the gesture.

onPanResponderReject is called when the component requests to handle the gesture, but wasn't given the privilege.

onPanResponderTerminate will be called when the component has just lost its response responsibility to another component.

onPanResponderMove will be repetitvely called when the user is moving their finger on the component's surface area.

onPanResponderRelease will be called at the end of the touch/gesture.

For Text components,
[ReactNODE].props.children returns the main child of a component
[ReactNODE].children returns an array of child components.

For View components,
[ReactNODE].props.children returns an array of `REACTNODE` objects, while
[ReactNODE].children returns an array of `ReactTestInstance` objects.
[ReactNODE].props.children is more trasversible.

View component doesn't take onPress prop.

!!props.prop only checks if the prop was passed in and not if the value of the prop is truthy

When theres need to share logic between different components, HOC and render props are common techniques.
a HOC is a function that takes a component as argument.
It returns a new component that performs the shared logic and renders the passed component, usually passing
it some data.
signature: let newComponent = withHOC(Component,configArgs).
withHOC returns a new component which renders Component as child, but does some things first and can pas data
to the rendered Component through props.

render prop is just like a regular prop that has a function value.
the parent component that's implementing render prop is expecting a function value for the prop.
the parent invokes this function, optionally passing it some values, and the function returns a react 
component which will be rendered as child in the parent component.
signature: {props.render(somedata)}

Metro is to react native, what webpack is to react. It bundles and transpiles javascript, 
resolve imports and assets. It's what makes fast-refresh possible for react-native.
by default, expo provides pre-defined options to metro for bundling your project, but you can define
additional options by creating a metro.config.js file in the root folder, and exporting an object which defines
options for metro. Same is for babel, you can have a babel.config.js for transpilation options for metro.
Your custom config options will be merged with expo's and fed to metro.

### APP.JSON
app.json is used by react-native, but expo would use information in the "expo" key in that file.
When you eject from expo or are using expo bare-workflow, you'll have to make most of your configurations inside the android or ios folder. This is because you now have an android folder and changes made to app.json won't automatically apply to that folder; its no longer managed by expo when you eject. 

When you bundle or build with expo, expo will use the info in "expo" key of app.json, but when you use react-native, it will use info from your `android` or `ios` folder, and most of the info for androis is taken from `AndroidManifest.xml`.

React-native also uses `app.json` but it doesn't make use of the `expo` key. React-native introduced a command `react-native eject` which will re-generate `android` and `ios` folders; `app.json` is where this command will get config info e.g name of the app, for the native projects when ejecting. This command doesn't exist anymore.

So basically, app.json will be used by expo when ejecting or building for expo Go client.

What this means is that if you're building with react-native, it will totally ignore all config in `expo` key of app.json - all your config should go inside the native folder (android or ios).

### Adaptive Launcher Icon
Adaptive launcher icon was introduced for `Android 8.0 (Api level 26)` and above.
The device OEM will provide a mask of unknown shape and the mask will be used to render all launcher icons. The inner shape of the mask is where your icon will reside and the area outside the mask will be cut off. Different device OEMs provide different shapes for the mask.

For an adaptive icon, you define an icon image (foreground image) with a transparent background and a color for the background. The icon image will be centered inside the mask from the device OEM and the background area of the inner mask shape will have the defined background color.

The `ic_launcher_foreground` image in every `res/minmap-RESOLUTION` folder for android is used for the adaptive icon foreground image for devices with that `dpi`.

The `ic_launcher` (legacy icon) images are used as laucher icons for `Android 7.0 (Api level 25)` and earlier.
The `ic_launcher_round` images are used as laucher icons for `Android 7.0 (Api level 25)`