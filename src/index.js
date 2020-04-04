
import path from 'path';

import loaderUtils from 'loader-utils';
import validateOptions from 'schema-utils';

import schema from './options.json';

export default function loader(content) {
  const options = loaderUtils.getOptions(this);

  validateOptions(schema, options, {
    name: 'Graphviz Loader',
    baseDataPath: 'options',
  });

  const context = options.context || this.rootContext;

  const url = loaderUtils.interpolateName(
    this,
    '[contenthash].[ext]',
    {
      context,
      content,
    }
  );

  let outputPath = url;

  let publicPath = `__webpack_public_path__ + ${JSON.stringify(outputPath)}`;

  if (typeof options.emitFile === 'undefined' || options.emitFile) {
    this.emitFile(outputPath, content);
  }

  const esModule =
    typeof options.esModule !== 'undefined' ? options.esModule : true;

  return `${esModule ? 'export default' : 'module.exports ='} ${publicPath};`;
}

export const raw = true;
