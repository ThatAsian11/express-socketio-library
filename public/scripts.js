var socket = io();

const hide = () => {
    document.getElementById('overlay').style.display = "none";
};
const data = e => {
    console.log(e);
    socket.emit('content', e);
};

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('form').onsubmit = () => {
        var query = document.querySelector('#s').value;
        
        socket.emit('search', query);
        // document.querySelector('#s').value = '';
        return false
    };
    document.querySelector('#clear').onclick = () => {
        var form = document.querySelector('#s');
        form.value = '';
        form.focus();

    };

    socket.on('load', () => {
        document.getElementById('loading').style.display = "block";
    });
    socket.on('loaded', () => {
        document.getElementById('loading').style.display = "none";
    });
    
    socket.on('book', results => {
        console.log(results);
        var img = results['volumeInfo']['imageLinks']['thumbnail'];
        var title = results['volumeInfo']['title'];
        var author = results['volumeInfo']['authors'];
        var desc = results['volumeInfo']['description'];
        var page = results['volumeInfo']['pageCount'];
        var rating = results['volumeInfo']['averageRating'];
        var release = results['volumeInfo']['publishedDate'];
        document.querySelector('#book-img').src = img;
        document.querySelector('#book-title').textContent = title;
        document.querySelector('#book-author').textContent = author;
        document.querySelector('#book-desc').innerHTML = desc;
        document.querySelector('#book-page').textContent = "Page count: " + page;
        document.querySelector('#book-rating').textContent = rating + "/5";
        document.querySelector('#book-release').textContent = release;
        document.getElementById('overlay').style.display = "block";        
    });

    socket.on('searched', results => {
        // console.log(results);
        if (!results) {
            document.getElementById('cards').innerHTML = '';
            var section = document.querySelector('#results');
            var message = document.createElement('h2');
            message.textContent = "No results found";
            section.appendChild(message);
        } else {
            var nores = document.querySelector('#results h2');
            if (nores) {
                nores.innerHTML = '';
            }
            var cards = document.querySelector('#cards');
            cards.innerHTML = "";
            for (i in results) {
                var pic = results[i]['volumeInfo']['imageLinks']['thumbnail'];
                var name = results[i]['volumeInfo']['title'];
                var details = results[i]['volumeInfo']['authors'] + ' | ' + results[i]['volumeInfo']['publishedDate'];
                var address = results[i]['id'];
                var text = results[i]['volumeInfo']['description'];
                var trimmedText = '';
                var length = 500;
                if (text) {
                    var textSize = text.length;
                    var trimmedText = textSize > length ? text.substring(0, length) + "..." : text;
                };
    
                var card = document.createElement('div');
                card.className = "card mb-3 book";
                cards.appendChild(card);
    
                var cont = document.createElement('div');
                cont.className = "row no-gutters";
                card.appendChild(cont);
                
                var col1 = document.createElement('div');
                col1.className = "col-md-4";
                cont.appendChild(col1);
    
                var img = document.createElement('img');
                img.src = pic;
                img.className = "card-img";
                col1.appendChild(img);
    
                var col2 = document.createElement('div');
                col2.className = "col-md-8";
                cont.appendChild(col2)
    
                var body = document.createElement('div');
                body.className = "card-body";
                col2.appendChild(body);
    
                var title = document.createElement('h5');
                title.className = "card-title";
                title.textContent = name;
                body.appendChild(title);
    
                var desc = document.createElement('p');
                desc.className = "card-title";
                desc.textContent = trimmedText;
                body.appendChild(desc);
    
                var det = document.createElement('p');
                det.className = "card-title";
                body.appendChild(det);
                
                var sm = document.createElement('small');
                sm.className = "text-muted"
                sm.textContent = details;
                det.appendChild(sm)
    
                var form = document.createElement('form');
                form.action = " ";
                form.id = "content"
                body.appendChild(form);
                // form.onsubmit = data(results[i]["id"]);
    
                var btn = document.createElement('button');
                btn.className = "btn btn-outline-dark btn-sm";
                btn.textContent = "More info";
                btn.id = address;
                btn.onclick = function() { data(this.id); };
                body.appendChild(btn);
            };
        };
    });
});
