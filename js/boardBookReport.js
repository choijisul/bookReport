document.addEventListener('DOMContentLoaded', () => {
    const bookReports = JSON.parse(localStorage.getItem('bookReports')) || [];
    const container = document.getElementById('book-report-container');
    const modal = document.getElementById('modal');
    const closeModal = document.getElementsByClassName('close')[0];

    if (bookReports.length === 0) {
        container.innerHTML = '<p class="no-reports-message">저장된 독후감이 없습니다.</p>';
        return;
    }

    bookReports.forEach((report, index) => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book-report');
        bookDiv.dataset.index = index;

        const thumbnail = document.createElement('img');
        thumbnail.src = report.thumbnail || 'default_thumbnail.png';
        thumbnail.alt = 'Book Thumbnail';
        thumbnail.classList.add('book-thumbnail');

        const bookInfo = document.createElement('div');
        bookInfo.classList.add('book-info');

        const title = document.createElement('h3');
        title.classList.add('book-title');
        title.textContent = report.title;

        const authors = document.createElement('p');
        authors.classList.add('book-authors');
        authors.textContent = `저자: ${report.authors.join(', ')}`;

        bookInfo.appendChild(title);
        bookInfo.appendChild(authors);

        bookDiv.appendChild(thumbnail);
        bookDiv.appendChild(bookInfo);

        container.appendChild(bookDiv);

        bookDiv.addEventListener('click', () => {
            showModal(report);
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    function showModal(report) {
        document.getElementById('modal-title').textContent = report.title;
        document.getElementById('modal-content').textContent = report.content;
        modal.style.display = 'block';
    }
});
