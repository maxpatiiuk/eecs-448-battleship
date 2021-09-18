'use strict';

/**
 * Base class for components
 * @class Component
 * @constructor
 * @public
 */
class Component extends View {
  constructor(renderOptions) {
    super({
      ...renderOptions,
      templateDirectory: 'components',
    });
  }
}
