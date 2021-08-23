# screen-rootation.js
Cross browser screen rotation management in pure vanilla javascript

## Installation 

npm install screen-resolution.js

## Usage

Full example on 

### Initialization

```js
let so = screenorientation();
```

### Change listener
```js
// Event listener 
// On screen resolution changes
// Returns screen resolution instance.
so.change(callback);
```

You can trigger manually your event by calling with null argument. 
```js
// Trigger manually change orientation event
so.change(); 
```
### Values
```js
// Returns rotation angle : 0 or 90
so.angle()

// Landscape display mode ? 
so.isLandscape()

// Portrait display mode  ?
so.isPortrait()

```




### License

MIT License

