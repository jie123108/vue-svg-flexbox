import { configure } from '@storybook/vue';

function loadStories() {
  require('../src/stories/flexbox');
}

configure(loadStories, module);

