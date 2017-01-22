# Example of Sass Blocks

Scaffolding by Jason Awbrey | Sass Blocks by Jan Willem Henckel

## Spin up the project
`npm install && gulp`

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
