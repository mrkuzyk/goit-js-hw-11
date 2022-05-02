import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import './sass/main.scss';
import PhotoApiService from './js/photo-service';

const refs = {
    serchForm: document.querySelector('.search-form'),
    loadMoreBtn: document.querySelector('#load-more'),
    hitsContainer: document.querySelector('.gallery'),
}

const photoApiService = new PhotoApiService();

refs.serchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLOadMore)

function markupPhoto(hits, hitsContainer) {
    const markup = hits.map(({ webformatURL, tags, likes, views, comments, downloads }) => {
        return '<div class="photo-card "><img src=`${webformatURL}` alt=`${tags}`loading="lazy" /><div class="info"><p class="info-item"><b>Likes</b>${ likes}</p><p class="info-item"><b>Views</b>${ views}</p><p class="info-item"><b>Comments</b>${ comments}</p><p class="info-item"><b>Downloads</b>${ downloads}</p></div></div>'
    }).join('');

    refs.hitsContainer.insertAdjacentElement('beforeend', markup);
};


function onSearch(e) {
    e.preventDefault();

    photoApiService.query = e.currentTarget.elements.searchQuery.value;
    photoApiService.resetPage()
    photoApiService.fetchArticles().then(markupPhoto(hits, refs.hitsContainer))
        // markupPhoto(data.hits, refs.hitsContainer)
    // })
}

function onLOadMore() {
    photoApiService.fetchArticles();
}



