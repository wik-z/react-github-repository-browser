
/**
 * Trim the string and add ellipsis if it's too long
 * @param {string} content 
 * @param {number} length 
 * 
 * @returns {string}
 */
export default function ellipsis(content, length = 60) {
    if (!content) {
        return null;
    }

    if (typeof content !== 'string') {
        return content;
    }

    if (content.length <= length) {
        return content;
    }

    return content.substr(0, length) + '...';
}