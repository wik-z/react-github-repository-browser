import axios from 'axios';

/**
 * GithubRepository
 * This class's responsibility is to make API calls 
 * and return them as Promises to the application.
 */
class GithubRepository {
    baseUrl = "https://api.github.com";
    rawUrl = "https://raw.githubusercontent.com";

    /**
     * Performs a search requests for the github repositories
     * @param {string} query - search query string
     * @returns {Promise}
     */
    search(query) {
        return axios.get(`${this.baseUrl}/search/repositories`, { params: { q: query } });
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
}

export default new GithubRepository();