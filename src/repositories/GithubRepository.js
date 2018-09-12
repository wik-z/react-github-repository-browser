import axios from 'axios';

/**
 * GithubRepository
 * This class's responsibility is to make API calls 
 * and return them as Promises to the application.
 */
class GithubRepository {
    baseUrl = "https://github.com";
    apiUrl = "https://api.github.com";
    rawUrl = "https://raw.githubusercontent.com";

    /**
     * Performs a search requests for the github repositories
     * @param {string} query - search query string
     * @param {number} page
     * @returns {Promise}
     */
    search(query, page = 1) {
        return axios.get(`${this.apiUrl}/search/repositories`, { params: { q: query, page } });
    }

    /**
     * Gets the details of the repository
     * @param {string} owner 
     * @param {string} repository 
     * @returns {Promise}
     */
    details(owner, repository) {

    }
    
    /**
     * Gets a raw file from the repository
     * @param {string} owner - repository owner
     * @param {string} repository - repository name
     * @param {string} branch - branch (default: master)
     * @param {string} file - path to a file or just the filename
     * @returns {Promise}
     */
    file(owner, repository, branch = "master", file = "README.md") {
        return axios.get(`${this.rawUrl}/${owner}/${repository}/${branch}/${file}`);
    }

    /**
     * Gets a raw readme file
     * @param {*} owner 
     * @param {*} repository 
     * @returns {Promise}
     */
    readme(owner, repository) {
        return this.file(owner, repository);
    }

    /**
     * Returns a url to a Github repository
     * @param {string} owner 
     * @param {string} repository 
     */
    repositoryUrl(owner, repository) {
        return `${this.baseUrl}/${owner}/${repository}`;
    }
}

export default new GithubRepository();