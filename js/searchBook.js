const apiKey = '5a8b2df98ef0526a9a80c3aaf88353af';

function searchBook() {
    const query = document.getElementById('search-input').value;
    if (query === '') {
        alert('검색어를 입력하세요.');
        return;
    }

    const url = `https://dapi.kakao.com/v3/search/book?target=title&query=${encodeURIComponent(query)}`;

    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `KakaoAK ${apiKey}`
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displayResults(data.documents);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('도서 검색 중 오류가 발생했습니다. 다시 시도해주세요.');
        });
}

function displayResults(books) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (books.length === 0) {
        resultsDiv.innerHTML = '<p>검색 결과가 없습니다.</p>';
        return;
    }

    books.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');

        const thumbnail = document.createElement('img');
        if (book.thumbnail) {
            thumbnail.src = book.thumbnail;
        } else {
            thumbnail.src = 'default_thumbnail.png';
            thumbnail.alt = 'No image';
            thumbnail.classList.add('no-image');
        }
        thumbnail.onerror = function () {
            this.style.display = 'none';
            const noImageText = document.createElement('div');
            noImageText.textContent = '';
            noImageText.classList.add('no-image-text');
            this.parentNode.appendChild(noImageText);
        };

        const bookInfo = document.createElement('div');
        bookInfo.classList.add('book-info');

        const title = document.createElement('div');
        title.classList.add('book-title');
        title.textContent = book.title;

        const authors = document.createElement('div');
        authors.classList.add('book-authors');
        authors.textContent = `저자: ${book.authors.join(', ')}`;

        const publisher = document.createElement('div');
        publisher.classList.add('book-publisher');
        publisher.textContent = `출판사: ${book.publisher}`;

        const datetime = document.createElement('div');
        datetime.classList.add('book-date');
        datetime.textContent = `출판일: ${new Date(book.datetime).toLocaleDateString()}`;

        bookInfo.appendChild(title);
        bookInfo.appendChild(authors);
        bookInfo.appendChild(publisher);
        bookInfo.appendChild(datetime);

        const button = document.createElement('button');
        button.textContent = '독후감 쓰러가기';
        button.classList.add('book-button');
        button.onclick = () => {
            localStorage.setItem('selectedBook', JSON.stringify({
                title: book.title,
                authors: book.authors,
                thumbnail: book.thumbnail,
                publisher: book.publisher,
                datetime: book.datetime
            }));
            location.href = 'writeBookReport.html';
        };

        bookDiv.appendChild(thumbnail);
        bookDiv.appendChild(bookInfo);
        bookDiv.appendChild(button);

        bookDiv.addEventListener('click', () => {
            bookDiv.classList.toggle('clicked');
        });

        resultsDiv.appendChild(bookDiv);
    });
}
