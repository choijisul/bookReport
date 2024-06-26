document.addEventListener('DOMContentLoaded', () => {
    const selectedBook = JSON.parse(localStorage.getItem('selectedBook'));

    if (selectedBook) {
        document.getElementById('book-thumbnail').src = selectedBook.thumbnail || 'default_thumbnail.png';
        document.getElementById('book-title').textContent = selectedBook.title;
        document.getElementById('book-authors').textContent = `저자: ${selectedBook.authors.join(', ')}`;

        console.log('Book Title:', selectedBook.title);
        console.log('Book Authors:', selectedBook.authors);
        console.log('Book Thumbnail:', selectedBook.thumbnail);
    } else {
        alert('선택된 도서가 없습니다.');
    }
});

function submitReport() {
    const selectedBook = JSON.parse(localStorage.getItem('selectedBook'));
    const reportContent = document.getElementById('book-report').value;

    if (!reportContent.trim()) {
        alert('독후감 내용을 입력하세요.');
        return;
    }

    const bookReport = {
        title: selectedBook.title,
        authors: selectedBook.authors,
        thumbnail: selectedBook.thumbnail,
        content: reportContent,
        date: new Date().toLocaleDateString()
    };

    let bookReports = JSON.parse(localStorage.getItem('bookReports')) || [];
    bookReports.push(bookReport);
    localStorage.setItem('bookReports', JSON.stringify(bookReports));

    console.log('Book Report Saved:', bookReport);
    console.log('All Book Reports:', bookReports);

    // 페이지 이동
    location.href = 'boardBookReport.html';
}