# Example of Sass Blocks

## Scaffolding by Jason Awbrey
## Sass Blocks by Jan Willem Henckel


1. run `npm install`
2. run `gulp` <-- compiles all files and loads BrowserSync


## The neat little code for working with Sass blocks:
```
$this: () !default;
@function this($key) {
 	@return map-get($this, $key);
}
```

## Important files to check out
1. src/styles/main.scss
2. src/styles/blocks/_myblock.scc

### Big shoutout to [Jan](http://farly.de/), I'm very excited to work with this on future projects!
