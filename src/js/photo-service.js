import axios from "axios";

export default class PhotoApiService{
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    async fetchArticles() {
        const options = {
            params: {
                key: '27124011-562ac77f1fd2864e5ddfeb16c',
                q: this.searchQuery,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                per_page: 10,
                page: this.page,
            },
        };

    
        const response = await axios.get('https://pixabay.com/api/', options);
        const data = await response.data;
        this.incrementPage();
        return data;
    };
        

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}