import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import './sass/main.scss';
import PhotoApiService from './js/photo-service';
import markupPhoto from './js/markupPhoto';

const refs = {
    serchForm: document.querySelector('.search-form'),
    loadMoreBtn: document.querySelector('#load-more'),
    hitsContainer: document.querySelector('.gallery'),
}

const photoApiService = new PhotoApiService();

refs.loadMoreBtn.classList.add('display-none');
refs.hitsContainer.innerHTML = startPage();

refs.serchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLOadMore)

const lightboxOptions = {
    captions: true,
    captionDelay: 300,
    captionsData: "alt",
};

const galleryLightBox = new SimpleLightbox('.gallery a', lightboxOptions);

function onSearch(e) {
    e.preventDefault();

    photoApiService.query = e.currentTarget.elements.searchQuery.value;

    if (!photoApiService.query) {
        return onError();
    }

    photoApiService.resetPage()
    refs.hitsContainer.innerHTML = '';
    photoApiService.fetchArticles().then(data => {

        if (data.totalHits !== 0 && data.hits.length === 0) {
            return Notiflix.Notify.warning(`We're sorry, but you've reached the end of search results.`);
        }
        refs.hitsContainer.insertAdjacentHTML('beforeend', markupPhoto(data.hits));

        refs.loadMoreBtn.classList.remove('display-none');

        galleryLightBox.refresh();

        if (data.totalHits > 0 && photoApiService.page === 2) {
            Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
        }

        if (photoApiService.page > 2) {
            const { height: cardHeight } = document
            .querySelector('.gallery')
            .firstElementChild.getBoundingClientRect();

            window.scrollBy({
            top: cardHeight * 2,
            behavior: 'smooth',
            });
        }

        if (data.hits.length === 0) {
            return onError();
        }
            return console.log(data);
            return data;
    });
    
}

function onLOadMore() {
    photoApiService.fetchArticles().then(data => {
        if (data.totalHits !== 0 && data.hits.length === 0) {
            refs.loadMoreBtn.classList.add('display-none');
            return Notiflix.Notify.warning(`We're sorry, but you've reached the end of search results.`);
        }
        refs.hitsContainer.insertAdjacentHTML('beforeend', markupPhoto(data.hits));
        }
    );
}

function onError() {
    refs.loadMoreBtn.classList.add('display-none');
    return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again');
};

function startPage() {
    return '<h2 class="start"> please start searching</h2>'
}


