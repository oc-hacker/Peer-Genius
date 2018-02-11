import _ from 'lodash';

/**
 *  Encodes a remote or local image to Base64 encoded string or Buffer
 *  @param {string} url - URL of remote image or local path to image
 *  @param {Object} [options={}] - Options object for extra configuration
 *  @param {boolean} options.string - Returns a Base64 encoded string. Defaults to Buffer object
 *  @param {boolean} options.local - Encode a local image file instead of a remote image
 *  @param {fnCallback} callback - Callback function
 *  @todo Option to wrap string every 76 characters for strings larger than 76 characters
 *  @return {fnCallback} - Returns the callback
 */
export function encodeBase64(file, isString, callback) {
  if (_.isUndefined(file) || _.isNull(file)) {
    return callback(new Error('File error!'));
  }

  let reader = new FileReader();
  reader.readAsDataURL(file);
  
  reader.onload = () => {
    let imageMetadata = {
      name: file.name,
      type: file.type,
      size: Math.round(file.size / 1000) + ' kb',
      base64: reader.result,
      file: file
    };

    return imageMetadata.base64;
  };
};
