export default class PhotoApiService{
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
    

    fetchArticles(){
        return fetch(`https://pixabay.com/api/?key=27124011-562ac77f1fd2864e5ddfeb16c&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=9`)
            .then(r => r.json())
            .then(data => {
                this.incrementPage();
                return data;
            })
    }

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