const path = require('path')
const resolveFrom = require('resolve-from')
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

const fixLinkedDependencies = config => {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.resolve.alias,
      react$: resolveFrom(path.resolve('node_modules'), 'react'),
      'react-dom$': resolveFrom(path.resolve('node_modules'), 'react-dom'),
    },
  }
  config.resolve.plugins = config.resolve.plugins.filter(plugin => !(plugin instanceof ModuleScopePlugin));
  return config
}

module.exports = [
  fixLinkedDependencies,
]
