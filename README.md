# vue-svg-flexbox

[![Build Status](https://badgen.net/travis/jie123108/vue-svg-flexbox/master)](https://travis-ci.com/jie123108/vue-svg-flexbox)
[![NPM Download](https://badgen.net/npm/dm/@jie123108/vue-svg-flexbox)](https://www.npmjs.com/package/@jie123108/vue-svg-flexbox)
[![NPM Version](https://badgen.net/npm/v/@jie123108/vue-svg-flexbox)](https://www.npmjs.com/package/@jie123108/vue-svg-flexbox)
[![NPM License](https://badgen.net/npm/license/@jie123108/vue-svg-flexbox)](https://github.com/jie123108/vue-svg-flexbox/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/jie123108/vue-svg-flexbox/pulls)
[![Automated Release Notes by gren](https://img.shields.io/badge/%F0%9F%A4%96-release%20notes-00B2EE.svg)](https://github-tools.github.io/github-release-notes/)

A Vue-based Flexbox layout container for SVG elements.

## Table of Contents

- [vue-svg-flexbox](#vue-svg-flexbox)
  - [Table of Contents](#table-of-contents)
  - [What is this?](#what-is-this)
  - [What problem does it solve?](#what-problem-does-it-solve)
  - [Does it work just like Flexbox in HTML?](#does-it-work-just-like-flexbox-in-html)
  - [Demo and examples](#demo-and-examples)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Props](#props)
      - [className : String](#classname--string)
      - [onLayout : Function](#onlayout--function)
      - [style : Object](#style--object)
      - [x : Number](#x--number)
      - [y : Number](#y--number)
  - [License](#license)

## What is this?

A Vue-based [Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox) layout container for SVG elements.

## What problem does it solve?

SVG lacks the convenient layout features of CSS; all elements must be positioned absolutely. There are ways around this (with [foreignObject](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/foreignObject) for instance), but there are cases where you just end up having to write cumbersome layout calculations for absolute positions. This component attempts to free us from having to do that.

## Does it work just like Flexbox in HTML?

No. It computes positions using Facebook's [css-layout](https://www.npmjs.com/package/css-layout), which implements a subset of the Flexbox algorithm. [This table](https://www.npmjs.com/package/css-layout#supported-attributes) shows what is supported. These settings are not supported:


**On the container:**

- `align-content: space-between`
- `align-items: baseline`
- `align-items: stretch`
- `flex-wrap: wrap-reverse`
- `justify-content: space-evenly`

**On the children:**

- `align-self`
- `flex-basis`
- `flex-grow`
- `flex-shrink`
- `order`


Despite these omissions, [css-layout](https://www.npmjs.com/package/css-layout) implements enough of Flexbox to be useful.

## Demo and examples

Live demo: [jie123108.github.io/vue-svg-flexbox](http://jie123108.github.io/vue-svg-flexbox/)

Here is the [source](https://github.com/jie123108/vue-svg-flexbox/blob/master/src/stories/flexbox.js) for the examples. 
To run them locally:

* yarn: `yarn install && yarn start`.
* or npm: `npm install && npm run start`

## Installation

vue-svg-flexbox is intended to be installed from npm and bundled into your Vue app.
```
yarn add @jie123108/vue-svg-flexbox
```

## Usage

Add an instance of the `Flexbox` component to your app, and style it to taste. CSS-Tricks has a [great overview of Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox) if you need help on that score.


```vue
<template>
  <Flexbox :x="x">
    <rect :fill="bgcolor" :width="width" :height="height" stroke="blue" :style="{}" />
    <text :x="width/2" :y="height/2" :style="textStyle">
      <slot></slot>
    </text>
  </Flexbox>
</template>

<script>
import Flexbox from '@jie123108/vue-svg-flexbox';

export default {
  name: 'Textbox',
  components: {
    Flexbox,
  },
  props: {
    bgcolor: {type: String, default: '#c0ffc0'},
    x: {type: Number, default: 0},
    width: {type: Number, default: 100},
    height: {type: Number, default: 100},
    textStyle: {
      type: Object,
      default () {
        return {
          "dominant-baseline": "central",
          "font-family": "arial",
          "text-anchor": "middle",
        }
      },
    }
  }
}
</script>
```

For how to achieve specific layouts using this component, see the [examples](https://github.com/jie123108/vue-svg-flexbox/blob/master/src/stories/flexbox.js).


## Props

#### className : String

Arbitrary string to set as `className` on the root element of the `Flexbox` instance. By default, the component has no class name.

#### onLayout : Function

Callback that will receive the entire computed layout when the layout updates. This is useful if you need to inspect layout values from a `Flexbox` instance in order to make decisions elsewhere in your application.

#### style : Object

Object containing Flexbox settings, as well as optional width and/or height. You have to pass something in order for layout to occur.

#### x : Number

The horizontal position, in pixels, at which the `Flexbox` instance should appear within its parent element.

#### y : Number

The vertical position, in pixels, at which the `Flexbox` instance should appear within its parent element.


## License

[MIT](./LICENSE)

[⬆ Back to Top](#table-of-contents)
