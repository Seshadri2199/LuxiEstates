document.addEventListener('DOMContentLoaded', () => {
    // 1. Get Property ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const propId = parseInt(urlParams.get('id'));

    // 2. Find Property Data
    const property = properties.find(p => p.id === propId);

    if (!property) {
        window.location.href = 'listings.html'; // Redirect if not found
        return;
    }

    // 3. Update Page Content
    document.title = `${property.title} – Luxi Estates`;
    document.getElementById('prop-title-hero').textContent = property.title;
    document.getElementById('prop-type-hero').textContent = property.type;
    
    document.getElementById('prop-title').textContent = property.title;
    document.getElementById('prop-loc').textContent = `◎ ${property.location}`;
    document.getElementById('prop-price').textContent = property.price;
    const badgeEl = document.getElementById('prop-badge');
    badgeEl.textContent = property.badge;
    if (property.badge === 'For Rent') {
        badgeEl.style.background = 'var(--navy)';
        badgeEl.style.color = 'var(--white)';
    } else {
        badgeEl.style.background = 'var(--accent-light)';
        badgeEl.style.color = 'var(--accent)';
    }
    
    document.getElementById('prop-beds').textContent = property.beds;
    document.getElementById('prop-baths').textContent = property.baths;
    document.getElementById('prop-area').textContent = property.area;
    document.getElementById('prop-rating').textContent = property.rating;
    document.getElementById('prop-desc').textContent = property.desc;

    // 4. Handle Gallery
    const mainImg = document.getElementById('main-img');
    mainImg.src = property.img;
    mainImg.alt = property.title;

    const thumbContainer = document.getElementById('thumb-container');
    const allImgs = [property.img, ...property.imgs];
    
    allImgs.forEach((imgSrc, index) => {
        const img = document.createElement('img');
        img.src = imgSrc;
        img.className = `gallery-thumb ${index === 0 ? 'active' : ''}`;
        img.onclick = () => {
            mainImg.src = imgSrc;
            document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
            img.classList.add('active');
        };
        thumbContainer.appendChild(img);
    });

    // 5. Handle Amenities
    const amenitiesList = document.getElementById('amenities-list');
    property.amenities.forEach(amenity => {
        const li = document.createElement('li');
        li.textContent = amenity;
        amenitiesList.appendChild(li);
    });

    // 6. Render Related Properties (3 random ones)
    renderRelated(property.id);
    
    // Trigger Animations
    setTimeout(() => {
        document.querySelectorAll('.fade-up').forEach(el => el.classList.add('visible'));
    }, 100);
});

function renderRelated(currentId) {
    const relatedGrid = document.getElementById('related-grid');
    const related = properties
        .filter(p => p.id !== currentId)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

    related.forEach(prop => {
        const badgeClass = prop.badge === 'For Rent' ? 'badge--rent' : '';
        const card = `
            <article class="prop-card visible">
                <div class="prop-card__img-wrap">
                    <img src="${prop.img}" class="prop-card__img" alt="${prop.title}">
                    <span class="prop-card__badge ${badgeClass}">${prop.badge}</span>
                    <span class="prop-card__type">${prop.type}</span>
                </div>
                <div class="prop-card__body">
                    <p class="prop-card__sub-type">${prop.type}</p>
                    <h3 class="prop-card__title">${prop.title}</h3>
                    <p class="prop-card__loc">◎ ${prop.location}</p>
                    <p class="prop-card__price">${prop.price}</p>
                    <div class="prop-card__meta">
                        <span>🛏 ${prop.beds} Beds</span>
                        <span>🚿 ${prop.baths} Baths</span>
                        <span>⭐ ${prop.rating}</span>
                    </div>
                    <a href="property-detail.html?id=${prop.id}" class="btn btn--outline prop-card__btn">Read more</a>
                </div>
            </article>
        `;
        relatedGrid.innerHTML += card;
    });
}

function handleEnquiry(event) {
    event.preventDefault();
    document.querySelector('.enquiry-form').style.display = 'none';
    document.getElementById('enquiry-success').style.display = 'block';
}
